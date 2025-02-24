import { BaseDocument, BaseDocumentRead, BaseDocumentWrite } from "../../../../baseTypes";

interface BaseProblemSetCategory {
  categoryName: string;
  lastProblemNumber: number;
}

interface ProblemSetCategoryData extends BaseProblemSetCategory {
  totalTimeSpent: number; // 合計取り組み時間 (ミリ秒)
  totalAttempts: number; // 総挑戦回数
}

export type ProblemSetCategoryRead = BaseDocumentRead & ProblemSetCategoryData;
export type ProblemSetCategoryWrite = BaseDocumentWrite & BaseProblemSetCategory;
export type ProblemSetCategoryDocument = BaseDocument & ProblemSetCategoryData;
