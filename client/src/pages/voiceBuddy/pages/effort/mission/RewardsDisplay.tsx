import { Stack, Typography } from '@mui/material'
import { purple } from '@mui/material/colors'
import React, { ReactNode } from 'react'

interface RewardsDisplayProps {
  RewardIcon: ReactNode
  earnNumber: number
  size?: number
}

const RewardsDisplay: React.FC<RewardsDisplayProps> = ({
  RewardIcon,
  earnNumber,
}) => {
  return (
    <Stack
      direction="column"
      justifyContent="center"
      alignItems="center"
      sx={{
        borderRadius: 1,
        bgcolor: purple.A100,
        boxShadow: 2,
        padding: 0.5,
      }}
    >
      <Typography variant="subtitle1">報酬</Typography>
      <Stack direction="row" alignItems="center">
        {RewardIcon}×<Typography variant="caption">{earnNumber}</Typography>
      </Stack>
    </Stack>
  )
}

export default RewardsDisplay
