import React from 'react'
import { Mission } from '../../../../../stores/mission/mission-utils'
import { Stack, Typography } from '@mui/material'
import { purple } from '@mui/material/colors'
import AnimatedLinearProgress from './AnimatedLinearProgress'

interface MissionProgressDisplayProps {
  mission: Mission
}

const MissionProgressDisplay: React.FC<MissionProgressDisplayProps> = ({
  mission,
}) => {
  return (
    <Stack
      direction="row"
      spacing={2}
      sx={{
        bgcolor: purple.A100,
        padding: 1,
        borderRadius: 1,
        boxShadow: 2,
        width: '100%',
      }}
    >
      <Stack direction="column" sx={{ width: '100%' }}>
        <Stack direction="row" justifyContent="space-between">
          <Typography variant="subtitle1">{'mission.name'}</Typography>
          <Typography variant="caption" sx={{ alignSelf: 'end' }}>
            {mission.progress}/{mission.requiredCount} {`(分)`}
          </Typography>
        </Stack>

        <AnimatedLinearProgress
          variant="determinate"
          value={(mission.progress / mission.requiredCount) * 100}
          baseColor={purple[600]}
          flowColor={purple[400]}
          sx={{
            height: 12,
            borderRadius: 999,
            boxShadow: 1,
          }}
        />
      </Stack>
      <Typography variant="h6">Lv.{mission.currentLevel}</Typography>
    </Stack>
  )
}

export default MissionProgressDisplay
