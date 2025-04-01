import { Intimacy, CharacterMessages, Situation } from "../types/characterTypes";
import messagesData from "../json/mvpCharacterMessages.json";
import { getRandomElement } from "../../../../functions/arrayUtils/arrayUtils";

export function getMessageForSituation(
  intimacy: Intimacy,
  situation: Situation,
  variables?: Record<string, string | number>,
  messageIndex: number | null = null,
  messageMapBySituation: Record<Situation, CharacterMessages[]> = messagesData as Record<Situation, CharacterMessages[]>
): string {
  const messagesWithIntimacy = messageMapBySituation[situation];
  if (!messagesWithIntimacy) return "メッセージが見つかりません。";

  // キャラクターの親密度に適したメッセージを探す
  const messageEntry = messagesWithIntimacy.find(entry => entry.intimacy.includes(intimacy));
  if (!messageEntry) return "適切なメッセージが見つかりません。";

  const messages = messageEntry.messages;
  let message = (messageIndex === null ? getRandomElement(messages) : messages[messageIndex]) ?? "";
  
  // 変数をメッセージに埋め込む
  if (variables) {
    Object.keys(variables).forEach(key => {
      message = message.replace(`{{${key}}}`, String(variables[key]));
    });
  }

  return message;
}
