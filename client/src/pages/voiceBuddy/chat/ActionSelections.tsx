import React from 'react'
import { Card, Stack, SxProps, Typography } from '@mui/material'
import ActionSelectionButton from './ActionSelectionButton'
import { ActionChoices } from '../features/types/actionInChatTypes'

interface ActionSelectionsProps {
  actions: ActionChoices[]
  sx?: SxProps
  onClickAction: (action: ActionChoices) => void
}

const ActionSelections: React.FC<ActionSelectionsProps> = ({
  actions,
  sx,
  onClickAction,
}) => {
  return (
    <Card sx={{ width: '80%', bgcolor: '#EFF1FF', padding: 2, ...sx }}>
      <Stack
        direction="column"
        justifyContent="center"
        alignItems="center"
        spacing={1}
      >
        <Typography variant="h6">返信</Typography>
        {actions.map((action, index) => (
          <ActionSelectionButton
            key={index}
            text={action.text}
            color={action.color ?? ''}
            onClick={() => onClickAction(action)}
          />
        ))}
      </Stack>
    </Card>
  )
}

export default ActionSelections
