import React, { useState, useEffect } from 'react'
import CircularTimerDisplay from './CircularTimerDisplay'
import { purple } from '@mui/material/colors'
import { formatTime } from '../../../../functions/dateTimeUtils/timeFormatUtils'
import { useEffortTimerStore } from '../../../../stores/effort/use-effort-timer-store'

type TimerMode = 'up' | 'down'

interface EffortTimerProps {
  durationMs: number // タイマーの最大時間（秒）
  mode?: TimerMode // 'up' (カウントアップ) or 'down' (カウントダウン)
  onComplete?: () => void // 終了時の処理
}

const EffortTimer: React.FC<EffortTimerProps> = ({
  durationMs,
  mode = 'down',
  onComplete,
}) => {
  const { elapsedTime, updateTimer, stopTimer } = useEffortTimerStore()
  const [time, setTime] = useState(mode === 'down' ? 0 : durationMs)

  useEffect(() => {
    const id = setInterval(() => {
      updateTimer()
    }, 1000)
    return () => clearInterval(id)
  }, [])

  useEffect(() => {
    setTime(mode === 'down' ? durationMs - elapsedTime : elapsedTime)
    if (durationMs - elapsedTime <= 0) {
      stopTimer()
      setTime(mode === 'down' ? 0 : durationMs)
    }
  }, [elapsedTime, time, mode, durationMs, onComplete])

  return (
    <CircularTimerDisplay
      text={`${formatTime(time)}`}
      progress={mode === 'down' ? time / durationMs : time / durationMs}
      size={200}
      fontSize={36}
      color={purple[300]}
    />
  )
}

export default EffortTimer
