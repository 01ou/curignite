import Matter, { Engine, World, Render, Bodies, Events, Runner, Body } from "matter-js";
import { useCallback, useEffect, useRef, useState } from "react";
import { bodyToJSON, restoreBodyFromJSON } from "../../features/functions/matter-js/conversionJson";

interface MatterPhysicsOptions {
  width?: number;
  height?: number;
  background?: string;
  gravityY?: number;
  initialBodies?: Body[]
}

interface CreateBodyOptions extends Matter.IBodyDefinition {
  color?: string;
}

type Shape = "circle" | "rectangle" | "polygon" | "trapezoid" | "fromVertices";

const useMatterPhysics = (initialOptions?: MatterPhysicsOptions) => {
  const sceneRef = useRef<HTMLDivElement>(null);
  const engineRef = useRef(Engine.create());
  const renderRef = useRef<Render | null>(null);
  const runnerRef = useRef<Runner | null>(null);
  const activeBodiesRef = useRef<Body[]>([]);
  const onDropCallbacksRef = useRef<Map<number, (body: Body) => void>>(new Map());

  // canvas サイズは state で管理
  const [canvasSize, setCanvasSize] = useState({
    width: initialOptions?.width ?? 400,
    height: initialOptions?.height ?? 600,
  });
  const canvasSizeRef = useRef(canvasSize);

  // updateCount を ref に変更（再レンダーはしない）
  const updateCountRef = useRef(0);

  // canvasSize の更新があったら最新値を参照に反映
  useEffect(() => {
    canvasSizeRef.current = canvasSize;
  }, [canvasSize]);

  const initialize = useCallback((options?: MatterPhysicsOptions) => {
    // canvas サイズの更新（オプションがあれば上書き）
    setCanvasSize((prev) => ({
      width: options?.width ?? prev.width,
      height: options?.height ?? prev.height,
    }));

    const engine = engineRef.current;
    engine.gravity.y = options?.gravityY ?? 1;
    const world = engine.world;

    removeAllBodies();
    if (options?.initialBodies) {
      World.add(world, options.initialBodies);
      activeBodiesRef.current = options.initialBodies;
    }

    if (sceneRef.current) {
      renderRef.current = Render.create({
        element: sceneRef.current,
        engine,
        options: {
          width: canvasSizeRef.current.width,
          height: canvasSizeRef.current.height,
          wireframes: false,
          background: options?.background ?? "transparent",
        },
      });
      Render.run(renderRef.current);
    }

    runnerRef.current = Runner.create();
    Runner.run(runnerRef.current, engine);

    // グローバルな afterUpdate リスナー：updateCount の更新と activeBodies の処理
    const updateListener = () => {
      updateCountRef.current += 1;
      const currentHeight = canvasSizeRef.current.height;

      activeBodiesRef.current = activeBodiesRef.current.filter((body) => {
        if (body.position.y > currentHeight) {
          const callback = onDropCallbacksRef.current.get(body.id);
          if (callback) callback(body);
          World.remove(engine.world, body);
          onDropCallbacksRef.current.delete(body.id);
          return false;
        }
        return true;
      });
    };

    Events.on(engine, "afterUpdate", updateListener);

    return {
      engine,
      world,
      cleanup: () => {
        Events.off(engine, "afterUpdate", updateListener);
      },
    };
  }, []);

  useEffect(() => {
    const { world, cleanup } = initialize(initialOptions);
    return () => {
      if (renderRef.current) {
        Render.stop(renderRef.current);
        renderRef.current.canvas.remove();
        renderRef.current = null;
      }
      if (runnerRef.current) {
        Runner.stop(runnerRef.current);
      }
      World.clear(world, true);
      Engine.clear(engineRef.current);
      cleanup();
    };
  }, [initialize]);

  const setSize = useCallback((width: number, height: number) => {
    setCanvasSize({ width, height });
    if (renderRef.current) {
      renderRef.current.options.width = width;
      renderRef.current.options.height = height;
      renderRef.current.canvas.width = width;
      renderRef.current.canvas.height = height;
    }
  }, []);

  const createShape = (
    shape: "circle" | "rectangle" | "polygon" | "trapezoid" | "fromVertices",
    x: number,
    y: number,
    size: number | { width: number; height: number } | { sides: number; radius: number } | { vertices: Matter.Vector[] },
    options?: Matter.IBodyDefinition
  ): Body => {
    switch (shape) {
      case "circle":
        if (typeof size !== "number") {
          throw new Error(`Invalid size for circle. Expected a number, but got ${JSON.stringify(size)}`);
        }
        return Bodies.circle(x, y, size, options);
  
      case "rectangle":
        if (typeof size !== "object" || !("width" in size) || !("height" in size)) {
          throw new Error(`Invalid size for rectangle. Expected { width: number, height: number }, but got ${JSON.stringify(size)}`);
        }
        return Bodies.rectangle(x, y, size.width, size.height, options);
  
      case "polygon":
        if (typeof size !== "object" || !("sides" in size) || !("radius" in size)) {
          throw new Error(`Invalid size for polygon. Expected { sides: number, radius: number }, but got ${JSON.stringify(size)}`);
        }
        return Bodies.polygon(x, y, size.sides, size.radius, options);
  
      case "trapezoid":
        if (typeof size !== "object" || !("width" in size) || !("height" in size)) {
          throw new Error(`Invalid size for trapezoid. Expected { width: number, height: number }, but got ${JSON.stringify(size)}`);
        }
        return Bodies.trapezoid(x, y, size.width, size.height, 0.5, options);
  
      case "fromVertices":
        if (typeof size !== "object" || !("vertices" in size) || !Array.isArray(size.vertices)) {
          throw new Error(`Invalid size for fromVertices. Expected { vertices: Matter.Vector[] }, but got ${JSON.stringify(size)}`);
        }
        return Bodies.fromVertices(x, y, [size.vertices], options);
  
      default:
        throw new Error(`Unsupported shape: ${shape}`);
    }
  };  

  const createBody = useCallback(
    (
      shape: Shape,
      x: number,
      y: number,
      size: number | { width: number; height: number } | { sides: number; radius: number } | { vertices: Matter.Vector[] },
      options?: CreateBodyOptions,
      onDropCallback?: (body: Body) => void,
      functionName?: string,
    ) => {
      const renderOpts = options?.render || {};
      const fillStyle = options?.color ?? "blue";
      const bodyOptions: Matter.IBodyDefinition = {
        restitution: 0.4,
        ...options,
        render: { ...renderOpts, fillStyle },
      };

      const body = createShape(shape, x, y, size, bodyOptions);

      activeBodiesRef.current.push(body);
      if (onDropCallback) {
        const createNamedFunction = (fn: any, name: string) => Object.defineProperty(fn, "name", { value: name });
        const newCallback = functionName ? createNamedFunction(onDropCallback, functionName) : onDropCallback;
        onDropCallbacksRef.current.set(body.id, newCallback);
      }
      World.add(engineRef.current.world, body);
      return body;
    },
    []
  );

  const removeAllBodies = useCallback(() => {
    const world = engineRef.current.world;
    
    // 現在のすべてのボディをワールドから削除
    World.clear(world, false); // falseは、ボディがまだ削除されないようにします（ただし、全体をリセットする場合はtrueを指定）
    
    // activeBodiesRefをリセット
    activeBodiesRef.current = [];
    
    // onDropCallbacksもリセット
    onDropCallbacksRef.current.clear();
  }, []);

  const serializeBodies = useCallback(() => {
    return JSON.stringify(activeBodiesRef.current.map(body => ({
      ...bodyToJSON(body),
      callbackId: [...onDropCallbacksRef.current.entries()]
        .find(([id]) => id === body.id)?.[1]?.name ?? null,
    })));
  }, []);
  
  const restoreBodies = useCallback((json: string, onDropCallbackMap: { [key: string]: (body: Body) => void } = {}) => {
    removeAllBodies();

    const world = engineRef.current.world;
    const bodiesData = JSON.parse(json);
    const restoredBodies = bodiesData.map((data: any) => {
      const body = restoreBodyFromJSON(data);
      if (data.callbackId && onDropCallbackMap[data.callbackId]) {
        onDropCallbacksRef.current.set(body.id, onDropCallbackMap[data.callbackId]);
      }
      return body;
    });

    World.add(world, restoredBodies);
    activeBodiesRef.current = restoredBodies;
  }, []);  

  return { sceneRef, updateCountRef, createBody, removeAllBodies, initialize, setSize, serializeBodies, restoreBodies };
};

export default useMatterPhysics;
