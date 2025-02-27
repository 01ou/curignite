import React, { useEffect } from 'react';
import BackgroundContainer from '../../components/display/BackgroundContainer';
import background from '../../assets/backgrounds/factory.jpg';
import { Bodies } from "matter-js";
import { Box, Button } from '@mui/material';
import useMatterPhysics from './useMatterPhysics';

interface LearningRootProps { }

type Point = { x: number; y: number };

/**
 * 初期の中心座標を基準に、片側（左端または右端）を延長した場合の新しい中心座標と総長さを計算します。
 *
 * @param center - 初期の中心座標
 * @param baseLength - 基本の長さ
 * @param extraLength - 延長する長さ
 * @param angle - ボディの回転角（ラジアン）。この角度に沿った向きが「右方向」となります。
 * @param extendSide - "left" なら左端、"right" なら右端を延長
 * @returns 新しい中心座標と総長さ
 */
function calculateExtendedBowlPropsFromCenter(
  center: Point,
  baseLength: number,
  extraLength: number,
  angle: number,
  extendSide: "left" | "right"
): { center: Point; totalLength: number } {
  const totalLength = baseLength + extraLength;
  // 単位ベクトル（angle方向が右端）
  const unitX = Math.cos(angle);
  const unitY = Math.sin(angle);

  // 右端を延長する場合、中心は右方向にextraLength/2ずれる
  // 左端を延長する場合は、反対方向にずれる
  const shift = (extraLength / 2);
  const newCenter: Point =
    extendSide === "right"
      ? { x: center.x + shift * unitX, y: center.y + shift * unitY }
      : { x: center.x - shift * unitX, y: center.y - shift * unitY };

  return { center: newCenter, totalLength };
}

const LearningRoot: React.FC<LearningRootProps> = ({}) => {
  const get = () => {
    const center = 400 / 2;
    // お椀のパーツ
    const baseLength = 125;
    const length = Math.floor(2 / 1) * 75;
    const rad = Math.PI * 0.15;
    const { center: leftCenter, totalLength } = calculateExtendedBowlPropsFromCenter({ x: center - 50, y: 500 }, baseLength, length, rad, "left");
    const { center: rightCenter } = calculateExtendedBowlPropsFromCenter({ x: center + 50, y: 500 }, baseLength, length, -rad, "right");

    const bowlLeft = Bodies.rectangle(leftCenter.x, leftCenter.y, totalLength, 20, { angle: rad, isStatic: true });
    const bowlRight = Bodies.rectangle(rightCenter.x, rightCenter.y, totalLength, 20, { angle: -rad, isStatic: true });
    const bowlBottom = Bodies.rectangle(center, 520, 200, 20, { isStatic: true });

    const c = Bodies.circle(200, 500, 50);
    return [bowlBottom, bowlLeft, bowlRight, c];
  }
  const { sceneRef, createBody, serializeBodies, restoreBodies } = useMatterPhysics({ width: 800, gravityY: 0.2, initialBodies: get() });


  useEffect(() => {
    // ボール生成のインターバル
    const ballInterval = setInterval(() => {
      createBody("polygon", 200, 100, { sides: 5, radius: 50 }, { color: "#555" }, () => console.log("ボールが落ちた"), "onDrop");

      
    }, 5000);

    return () => {
      clearInterval(ballInterval);
    };
  }, []);

  return (
    <BackgroundContainer backgroundImage={background} >
      <Box sx={{ position: "absolute" }} ref={sceneRef}  />
      LearningRootContent
      <Button onClick={() => {
        const jsonString = serializeBodies()
        const jsonSizeInBytes = new Blob([jsonString]).size;
        // console.log(jsonString);
        
        console.log(`JSON Size: ${jsonSizeInBytes} bytes. ${jsonSizeInBytes / 5242880}%`);

        localStorage.setItem("test", jsonString);
      }}>保存</Button>
      <Button onClick={() => restoreBodies(localStorage.getItem("test") ?? "", { "onDrop": () => console.log("ボールが落ちた") })}>復元</Button>
    </BackgroundContainer>
  );
};

export default LearningRoot;