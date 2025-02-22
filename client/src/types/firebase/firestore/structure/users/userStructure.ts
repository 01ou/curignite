import { BaseDocumentRead, BaseDocumentWrite } from "../../baseTypes";

interface UserData {
  displayName: string; // 表示名
  email: string; // メールアドレス (認証方法による)
  photoURL: string | null; // プロフィール画像URL (省略可能)
  settings: UserSettings; // ユーザー設定
}

interface UserSettings {
  language: "ja" | "en" | "other"; // 言語設定
}

// interface UserStats {
//   totalStudyTime: number; // 総学習時間 (ミリ秒)
//   completedProblems: number; // 完了した問題数
//   recentAccess: Record<string, number>; // 日ごとの学習時間 { "YYYY-MM-DD": timeSpent }
// }


export type UserRead = BaseDocumentRead & UserData;
export type UserWrite = BaseDocumentWrite & UserData;