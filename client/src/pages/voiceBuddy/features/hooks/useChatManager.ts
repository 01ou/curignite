import { useEffect, useMemo, useState, useCallback } from 'react'
import { Message } from '../types/chatTypes'
import { getMessageForSituation } from '../functions/characterMessageUtils'
import { blobToBase64 } from '../../../../functions/audioUtils/blobConversion'
import { Intimacy, Situation } from '../types/characterTypes'
import useChatStore from '../../../../stores/chat/use-chat-store'

interface UseMessageManagerArgs {
  intimacy: Intimacy
  accessState: 'firstLogin' | 'firstTimes' | 'multipleTimes' | null
  consecutiveDays: number
  markAsMultipleTimes: () => void
}

const useChatManager = ({
  intimacy,
  accessState,
  consecutiveDays,
  markAsMultipleTimes,
}: UseMessageManagerArgs) => {
  const [update, setUpdate] = useState(0)
  const { addChat, getChats } = useChatStore()

  const handleSendMessage = useCallback(
    (message: Message, senderId: string | 'self' = 'self') => {
      if (message.type === 'text') {
        handleSendText(message.message, senderId)
      }
    },
    []
  )

  const handleSendText = useCallback(
    (message: string, senderId: string | 'self' = 'self') => {
      addChat({
        senderId,
        sentAt: Date.now(),
        type: 'text',
        message,
        status: 'sent',
      })
      setUpdate((prev) => prev + 1)
    },
    [addChat]
  )

  const handleSendVoice = useCallback(
    async (voiceBlob: Blob, senderId: string | 'self' = 'self') => {
      addChat({
        senderId,
        sentAt: Date.now(),
        type: 'voice',
        voiceBase64: await blobToBase64(voiceBlob),
        status: 'sent',
      })
      setUpdate((prev) => prev + 1)
    },
    [addChat]
  )

  const handleSendPartnerMessage = useCallback(
    (situation: Situation, variables?: Record<string, string | number>) => {
      handleSendText(
        getMessageForSituation(intimacy, situation, variables),
        'partner'
      )
    },
    [handleSendText]
  )

  useEffect(() => {
    console.log(accessState)
    if (accessState === 'firstLogin') {
      handleSendPartnerMessage('firstLogin')
    } else if (accessState === 'firstTimes') {
      sendFirstAccessMessages(consecutiveDays)
    }
    if (accessState && accessState !== 'multipleTimes') {
      markAsMultipleTimes()
    }
  }, [accessState, handleSendPartnerMessage])

  const sendFirstAccessMessages = useCallback(
    (consecutiveDays: number) => {
      handleSendPartnerMessage('loggingIn')
      if (consecutiveDays >= 2) {
        handleSendPartnerMessage('countingAccess', { consecutiveDays })
      }
    },
    [intimacy, handleSendText]
  )

  const chats = useMemo(() => getChats(), [update, getChats])

  return {
    chats,
    handleSendMessage,
    handleSendText,
    handleSendVoice,
    handleSendPartnerMessage,
  }
}

export default useChatManager
