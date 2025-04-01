import { useCallback } from "react";
import { getFromStorage, incrementNumberStorage, pushToArrayStorage } from "../../../../functions/webStorageUtils/useLocalStorageUtils";
import { Chat } from "../types/chatTypes";

enum STORAGE_KEYS {
  CHAT_ID = "chatId",
  HISTORY = "chatHistory",
}

const useChatStorage = () => {
  const getChatId = useCallback(() => {
    const id = getFromStorage<number>(STORAGE_KEYS.CHAT_ID) ?? 0;
    incrementNumberStorage(STORAGE_KEYS.CHAT_ID);
    return id;
  }, []);

  const addChat = useCallback((chats: Chat[] | Chat) => {
    if (Array.isArray(chats)) {
      chats.forEach(chat => {
        pushToArrayStorage(STORAGE_KEYS.HISTORY, { ...chat, messageId: getChatId() });
      });
    } else {
      pushToArrayStorage(STORAGE_KEYS.HISTORY, { ...chats, messageId: getChatId() });
    }
  }, [getChatId]);

  const getChats = useCallback(() => {
    return getFromStorage<Chat[]>(STORAGE_KEYS.HISTORY) ?? [];
  }, []);

  return { addChat, getChats };
};

export default useChatStorage;