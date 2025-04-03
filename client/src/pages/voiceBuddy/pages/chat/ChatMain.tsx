import { Stack, Typography } from '@mui/material'
import React, { useEffect, useMemo } from 'react'
import { format } from 'date-fns'
import MessageBubble from '../../components/MessageBubble'
import { getDayOffsetFromBase } from '../../../../functions/dateTimeUtils/dateTimeUtils'
import useChatManager from '../../features/hooks/useChatManager'
import { Situation } from '../../features/types/characterTypes'
import ActionsInChatData from '../../features/json/mvpActionsInChat.json'
import {
  ActionChoices,
  ActionType,
} from '../../features/types/actionInChatTypes'
import ActionSelections from './ActionSelections'
import useDelayCallback from '../../features/hooks/useDelayCallback'
import TypingIndicator from '../../components/TypingIndicator'
import { useAccessStore } from '../../../../stores/user/use-access-store'
import { useSituationStore } from '../../../../stores/user/use-situation-store'
import { useEffortSessionStore } from '../../../../stores/effort/use-effort-session-store'
import { useEffortStore } from '../../../../stores/effort/use-effort-store'
import useChatStore from '../../../../stores/chat/use-chat-store'
import { purple } from '@mui/material/colors'
import RippleButton from './RippleButton'
import { useNavigate } from 'react-router-dom'

interface ChatMainProps {}

const getSelectAction = (situation: Situation): ActionChoices[] => {
  return (ActionsInChatData[situation] ?? []).map((data) => ({
    id: (data.id as ActionType) ?? 'startingEffort',
    text: data.text,
  }))
}

const ChatMain: React.FC<ChatMainProps> = ({}) => {
  const navigate = useNavigate()
  const { callbackStatus, callDelayCallbacks } = useDelayCallback()

  const { accessState, consecutiveDays, markAsMultipleTimes } = useAccessStore()
  const { countUp } = useEffortStore()
  const { isProgressEffort, onStartEffort } = useEffortSessionStore()
  const { situationState, setSituationState } = useSituationStore()
  const { chats } = useChatStore()

  const { handleSendText, handleSendPartnerMessage, sendFirstAccessMessages } =
    useChatManager({
      intimacy: 3,
    })

  useEffect(() => {
    if (
      accessState &&
      (accessState === 'firstLogin' || accessState === 'firstTimes')
    ) {
      if (accessState === 'firstLogin') {
        handleSendPartnerMessage('firstLogin')
      } else {
        sendFirstAccessMessages(consecutiveDays)
      }
      countUp()
      markAsMultipleTimes()
    }
  }, [
    accessState,
    handleSendPartnerMessage,
    sendFirstAccessMessages,
    countUp,
    markAsMultipleTimes,
  ])

  const todayChats = useMemo(() => {
    // 今日のAM4時以降のチャットを表示する。
    return chats.filter((chat) => getDayOffsetFromBase(chat.sentAt, 4) === 0)
  }, [chats])

  const onSelectAction = (action: ActionChoices) => {
    handleSendText(action.text)
    switch (action.id) {
      case 'startingEffort':
        setSituationState('startingEffort')
        setSituationState('startingEffort')
        callDelayCallbacks({
          tasks: [
            {
              id: 'typing',
              callback: () => {
                handleSendPartnerMessage('startingEffort')
                onStartEffort()
              },
            },
          ],
          min: 1000,
          max: 1500,
        })
        break
    }
  }

  const todayLabel = format(new Date(), 'M/d')

  return (
    <>
      <Stack
        direction="column"
        alignItems="center"
        sx={{ overflow: 'auto', pb: 20 }}
      >
        <Typography variant="h6">{todayLabel}</Typography>
        {todayChats.map((chat, index) => (
          <MessageBubble
            key={index}
            chat={chat}
            sx={chat.senderId === 'self' ? { ml: 'auto' } : { mr: 'auto' }}
          />
        ))}
        {callbackStatus['typing'] && callbackStatus['typing'] === 'waiting' && (
          <TypingIndicator username="恋人" sx={{ mr: 'auto' }} />
        )}
        {isProgressEffort && (
          <RippleButton
            variant="contained"
            sx={{
              width: '80%',
              height: '7vh',
              fontSize: '1.1rem',
              bgcolor: purple[300],
              margin: 5,
            }}
            rippleDuration={1000}
            rippleColor={purple[100]}
            opacity={{ start: 1, end: 1 }}
            onFinishCallback={() => navigate('/voice-buddy/effort')}
          >
            学習空間へ移動
          </RippleButton>
        )}
        {!isProgressEffort && (
          <ActionSelections
            actions={getSelectAction(situationState)}
            onClickAction={(action) => onSelectAction(action)}
          />
        )}
      </Stack>
    </>
  )
}

export default ChatMain
