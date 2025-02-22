// src/i18n.ts
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import dialogueJa from "./locales/auth/dialogueJa.json"
import dialogueEn from "./locales/auth/dialogueEn.json"
import authErrorJa from "./locales/auth/authErrorJa.json";

// 翻訳リソースをまとめる
const resources = {
  en: {
    translation: {
      ...dialogueEn
    }
  },
  ja: {
    translation: {
      ...dialogueJa,
      ...authErrorJa
    }
  },
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'ja', // デフォルト言語
    fallbackLng: 'ja', // 言語が見つからない場合に使用する言語
    interpolation: {
      escapeValue: false, // ReactではXSS対策を自動で行うのでfalse
    },
  });

export default i18n;
