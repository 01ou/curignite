import { Box } from '@mui/material'
import { blue } from '@mui/material/colors'
import React from 'react'
import { getCenteredPosition } from '../../../../functions/styleUtils/sxUtils'

interface EffortMainProps {}

const EffortMain: React.FC<EffortMainProps> = ({}) => {
  return (
    <Box
      sx={{
        position: 'fixed',
        ...getCenteredPosition({ x: 50, y: 50 }),
        height: '100vh',
        width: '100vw',
        bgcolor: blue[100],
      }}
    >
      <p>a</p>
    </Box>
  )
}

export default EffortMain
