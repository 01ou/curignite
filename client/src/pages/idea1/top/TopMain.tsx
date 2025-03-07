import React, { useState, useRef, useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { getCenteredPosition } from '../../../functions/style/sxUtils';

const LongPressCountdown: React.FC = () => {
  const navigate = useNavigate();

  // 状態管理
  const [isPressing, setIsPressing] = useState(false);
  const [countdown, setCountdown] = useState(5);
  const [elapsed, setElapsed] = useState(0);
  const [complete, setComplete] = useState(false);
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  const totalDuration = 5000;         // 総時間 5秒（ミリ秒）
  const phaseOneDuration = totalDuration - 1000; // 最初のフェーズ：4秒間（0～4000ms）
  const partialFillScale = 0.5;         // フェーズ1終了時の円のサイズ（画面の対角線長の50%）※変数で指定可能
  const startDiameter = 1.1;             // 初期の円の直径（px）

  const startTimeRef = useRef<number | null>(null);
  const animationFrameIdRef = useRef<number>(5);

  // ウィンドウサイズ変更に対応
  useEffect(() => {
    const handleResize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // 画面全体を覆うための最大円サイズ（画面の対角線長）
  const maxDiameter = Math.sqrt(windowSize.width ** 2 + windowSize.height ** 2);
  // フェーズ1終了時の円の直径
  const intermediateDiameter = maxDiameter * partialFillScale;

  // リセット処理（途中で指を離した場合）
  const reset = () => {
    setIsPressing(false);
    setCountdown(5);
    setElapsed(0);
    setComplete(false);
    startTimeRef.current = null;
    if (animationFrameIdRef.current) {
      cancelAnimationFrame(animationFrameIdRef.current);
    }
  };

  // 長押し開始
  const startPress = () => {
    if (isPressing) return;
    setIsPressing(true);
    startTimeRef.current = Date.now();
    animationFrameIdRef.current = requestAnimationFrame(updateProgress);
  };

  // プログレス更新ループ
  const updateProgress = () => {
    if (!startTimeRef.current) return;
    const now = Date.now();
    const newElapsed = now - startTimeRef.current;
    setElapsed(newElapsed);
    setCountdown(Math.ceil((totalDuration - newElapsed) / 1000));

    if (newElapsed < totalDuration) {
      animationFrameIdRef.current = requestAnimationFrame(updateProgress);
    } else {
      // 完了：GO! を表示し、円を一気に画面全体へ拡大
      setComplete(true);
      setCountdown(0);
      // 少し待ってから React Router を用いてページ遷移
      setTimeout(() => {
        navigate('/idea1/home'); // 遷移先のパスを適宜変更
      }, 500);
    }
  };

  // 長押し解除（途中キャンセル）
  const endPress = () => {
    if (!complete) {
      reset();
    }
  };

  // 円の直径計算
  let circleDiameter = startDiameter;
  if (complete) {
    // GO! 時：一気に最大サイズへ（トランジションあり）
    circleDiameter = maxDiameter;
  } else if (elapsed < phaseOneDuration) {
    // フェーズ1：0～4秒で、startDiameter から intermediateDiameter へ線形に拡大
    const phaseProgress = elapsed / phaseOneDuration;
    circleDiameter = startDiameter + (intermediateDiameter - startDiameter) * phaseProgress;
  } else {
    // 残り1秒は intermediateDiameter のまま維持
    circleDiameter = intermediateDiameter;
  }

  return (
    <Box
      onMouseDown={startPress}
      onTouchStart={startPress}
      onMouseUp={endPress}
      onTouchEnd={endPress}
      onMouseLeave={endPress}
      sx={{
        position: 'relative',
        width: '100vw',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
        backgroundColor: 'lightblue', // 背景を水色に設定
        userSelect: 'none',
      }}
    >
        <Typography
          variant='h4'
          sx={{
          position: "absolute",
          ...getCenteredPosition({ y: 15 }),
          textAlign: "center"
        }}>
          勉強モードに<br />切り替え
        </Typography>
      {/* 赤い円（アニメーション付き） */}
      <Box
        sx={{
          position: 'absolute',
          width: circleDiameter,
          height: circleDiameter,
          backgroundColor: 'red',
          borderRadius: '50%',
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -50%)',
          // GO! 時は速いトランジションで最大サイズへ拡大
          transition: complete ? 'width 0.2s, height 0.2s' : 'none',
          pointerEvents: 'none',
        }}
      />

      {/* 中央テキスト */}
      <Typography
        variant="h3"
        sx={{
          position: 'relative',
          zIndex: 1,
          color: 'white',
          transition: 'transform 0.2s, opacity 0.2s',
          // フェーズ1中は徐々に拡大するアニメーション（GO! 時は通常サイズに戻す）
          transform: complete ? 'scale(1)' : `scale(${1 + (elapsed / phaseOneDuration) * 0.5})`,
        }}
      >
        {complete ? 'GO!' : isPressing ? countdown : '長押し'}
      </Typography>
    </Box>
  );
};

export default LongPressCountdown;
