import { BaseDocumentRead, BaseDocumentWrite } from "../../../../baseTypes";

interface ProblemSetCategoryData {
  categoryName: string;
  lastProblemNumber: number;
  problemAttempts: Record<number, number>; // { 問題番号: 取り組み回数 }
  completedProblems: number[]; // 完了した問題のリスト
  totalTimeSpent: number; // 合計取り組み時間 (ミリ秒)
  totalAttempts: number; // 総挑戦回数
}

export type ProblemSetCategoryRead = BaseDocumentRead & ProblemSetCategoryData;
export type ProblemSetCategoryWrite = BaseDocumentWrite & ProblemSetCategoryData;