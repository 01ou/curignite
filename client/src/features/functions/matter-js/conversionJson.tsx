import { Bodies, Body } from "matter-js";

export const bodyToJSON = (body: Body) => {
  return {
    position: body.position,
    angle: body.angle,
    velocity: body.velocity,
    angularVelocity: body.angularVelocity,
    force: body.force,
    torque: body.torque,
    mass: body.mass,
    inertia: isFinite(body.inertia) ? body.inertia : null, // Infinity を null に変換
    friction: body.friction,
    restitution: body.restitution,
    isStatic: body.isStatic,
    vertices: body.vertices.map((v) => ({ x: v.x, y: v.y })),
    render: body.render
  };
};

export const restoreBodyFromJSON = (data: any): Body => {
  const body = Bodies.fromVertices(data.position.x, data.position.y, [data.vertices], {
    isStatic: data.isStatic,
    friction: data.friction,
    restitution: data.restitution,
    mass: data.mass,
    inertia: data.inertia ?? Infinity, // null の場合は Infinity に戻す,
    render: data.render,
  });

  // 角度・速度・力を復元
  Body.setVelocity(body, data.velocity);
  Body.setAngularVelocity(body, data.angularVelocity);
  Body.applyForce(body, body.position, data.force);
  body.torque = data.torque;

  return body;
};
