import { Box, Stack } from '@mui/material'
import React from 'react'
import MissionProgressDisplay from './MissionProgressDisplay'
import RewardsDisplay from './RewardsDisplay'
import { FavoriteBorder } from '@mui/icons-material'
import { Mission } from '../../../../../stores/mission/mission-utils'
import { purple } from '@mui/material/colors'

interface MissionDisplayProps {
  mission: Mission
  earnNumber: number
}

const MissionDisplay: React.FC<MissionDisplayProps> = ({
  mission,
  earnNumber,
}) => {
  return (
    <Stack
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      width="100%"
    >
      <MissionProgressDisplay mission={mission} />
      <Box sx={{ width: 10, height: 10, bgcolor: purple.A100 }} />
      <RewardsDisplay
        RewardIcon={<FavoriteBorder sx={{ width: 15, height: 15 }} />}
        earnNumber={earnNumber}
      />
    </Stack>
  )
}

export default MissionDisplay
