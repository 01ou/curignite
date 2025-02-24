import { Timestamp } from "firebase/firestore";
import { BaseDocumentRead, BaseDocumentWrite } from "../../../../baseTypes";
import { ProblemStatus } from "../problemStatus";

interface ProblemSetHistoryData {
  categoryId: string;
  problemId: number;
  startTime: Timestamp;
  durationMs: number; // ミリ秒単位の所要時間
  shortQuestionStatus: Record<string, ProblemStatus> | null;
}

export type ProblemSetHistoryRead = BaseDocumentRead & ProblemSetHistoryData;
export type ProblemSetHistoryWrite = BaseDocumentWrite & ProblemSetHistoryData;