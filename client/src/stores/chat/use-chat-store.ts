import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { Chat } from '../../pages/voiceBuddy/features/types/chatTypes'

type ChatState = {
  chats: Chat[]
  chatId: number
  addChat: (chats: Chat | Chat[]) => void
  getChats: () => Chat[]
}

const useChatStore = create<ChatState>()(
  persist(
    (set, get) => ({
      chats: [],
      chatId: 0,

      addChat: (chats) => {
        set((state) => {
          const newChats = Array.isArray(chats)
            ? chats.map((chat) => ({ ...chat, messageId: state.chatId + 1 }))
            : [{ ...chats, messageId: state.chatId + 1 }]

          return {
            chats: [...state.chats, ...newChats],
            chatId: state.chatId + newChats.length,
          }
        })
      },

      getChats: () => get().chats,
    }),
    { name: 'chat-store' }
  )
)

export default useChatStore
