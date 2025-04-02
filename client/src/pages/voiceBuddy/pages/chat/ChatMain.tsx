import { Stack, Typography } from '@mui/material'
import React, { useEffect, useMemo, useState } from 'react'
import { format } from 'date-fns'
import MessageBubble from '../../components/MessageBubble'
import { setHourToDate } from '../../../../functions/dateTimeUtils/dateTimeUtils'
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
import AnimatedPageTransition from '../../components/AnimatedPageTransition'
import Countdown from '../../components/Countdown'
import { useAccessStore } from '../../../../stores/user/use-access-store'
import { useEffortStore } from '../../../../stores/user/use-effort-store'
import { useSituationStore } from '../../../../stores/user/use-situation-store'

interface ChatMainProps {}

const getSelectAction = (situation: Situation): ActionChoices[] => {
  return (ActionsInChatData[situation] ?? []).map((data) => ({
    id: (data.id as ActionType) ?? 'startingEffort',
    text: data.text,
  }))
}

const ChatMain: React.FC<ChatMainProps> = ({}) => {
  const { callbackStatus, callDelayCallbacks } = useDelayCallback()

  const { accessState, consecutiveDays, markAsMultipleTimes } = useAccessStore()
  const { isProgressEffort, handleStartEffort } = useEffortStore()
  const { situationState, setSituationState } = useSituationStore()

  const {} = useAccessStore()
  const { chats, handleSendText, handleSendPartnerMessage } = useChatManager({
    intimacy: 3,
    accessState,
    consecutiveDays,
    markAsMultipleTimes,
  })

  const [countDown, setCountDown] = useState<number | null>(null)
  const [effortStartTime, setEffortStartTime] = useState<Date | null>(null)

  useEffect(() => {
    if (isProgressEffort()) {
      // TODO 強制的にナビゲーションするのではなく、ポップアップを表示する。
      setEffortStartTime(new Date())
    }
  }, [])

  const todayChats = useMemo(() => {
    // 今日のAM5時以降のチャットを表示する。
    const todayStart = setHourToDate(new Date(), 5).getTime()
    return chats.filter((chat) => chat.sentAt >= todayStart)
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
              callback: () => handleSendPartnerMessage('startingEffort'),
            },
            {
              callback: () => setCountDown(3),
              min: 1000,
            },
            {
              id: 'toWorkOnEffortsPage',
              callback: () => {
                setEffortStartTime(new Date())
                handleStartEffort()
              },
              min: 3000,
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
        {countDown !== null && (
          <Stack>
            <Typography>勉強開始まで</Typography>
            <Countdown start={countDown} />
          </Stack>
        )}
        <ActionSelections
          actions={getSelectAction(situationState)}
          onClickAction={(action) => onSelectAction(action)}
        />
      </Stack>
      <AnimatedPageTransition
        startTime={effortStartTime}
        path="/voice-buddy/effort"
      />
    </>
  )
}

export default ChatMain
