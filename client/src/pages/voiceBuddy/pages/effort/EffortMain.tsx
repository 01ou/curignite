import { Box, Button } from '@mui/material'
import { purple } from '@mui/material/colors'
import React, { useEffect, useState } from 'react'
import { getCenteredPosition } from '../../../../functions/styleUtils/sxUtils'
import EffortTimer from './EffortTimer'
import { useEffortStore } from '../../../../stores/effort/use-effort-store'
import { useEffortTimerStore } from '../../../../stores/effort/use-effort-timer-store'
import {
  Mission,
  updateMissions,
} from '../../../../stores/mission/mission-utils'
import MissionList from './mission/MissionList'

interface EffortMainProps {}

const EffortMain: React.FC<EffortMainProps> = ({}) => {
  const effortStore = useEffortStore()
  const { timeDiff, startTimer, stopTimer, resetTimer, clearTimer } =
    useEffortTimerStore()

  const [missions, setMissions] = useState<Mission[]>([])

  useEffect(() => {
    setMissions(updateMissions(effortStore))
    effortStore.addEffortTime(timeDiff)
  }, [timeDiff])

  return (
    <Box
      sx={{
        position: 'fixed',
        ...getCenteredPosition({ x: 50, y: 50 }),
        height: '100vh',
        width: '100vw',
        bgcolor: purple[50],
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Button onClick={() => startTimer()}>Start</Button>
      <Button onClick={() => stopTimer()}>Stop</Button>
      <Button onClick={() => resetTimer()}>Reset</Button>
      <Button onClick={() => clearTimer()}>Clear</Button>
      <EffortTimer durationMs={70 * 1000} mode="down" />
      <MissionList missions={missions} />
    </Box>
  )
}

export default EffortMain
