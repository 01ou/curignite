import React from 'react'
import { Card, CardContent, Typography, Stack, IconButton } from '@mui/material'
import { purple } from '@mui/material/colors'
import MissionDisplay from './MissionDisplay'
import { FullscreenExit } from '@mui/icons-material'

interface Mission {
  name: string
  progress: number
  requiredCount: number
  currentLevel: number
}

interface MissionListProps {
  missions: Mission[]
}

const MissionList: React.FC<MissionListProps> = ({ missions }) => {
  return (
    <Card
      sx={{
        width: '90%',
        bgcolor: purple.A400,
        borderRadius: 2,
        position: 'relative',
      }}
    >
      <IconButton
        sx={{ position: 'absolute', top: 5, right: 5, color: 'white' }}
      >
        <FullscreenExit />
      </IconButton>
      <CardContent>
        <Typography variant="h6" gutterBottom sx={{ color: 'white' }}>
          Missions
        </Typography>
        <Stack direction="column" spacing={2}>
          {missions.map((mission) => (
            <MissionDisplay
              key={mission.name}
              mission={mission}
              earnNumber={150}
            />
          ))}
        </Stack>
      </CardContent>
    </Card>
  )
}

export default MissionList
