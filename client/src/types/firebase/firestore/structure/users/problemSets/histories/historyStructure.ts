import { Timestamp } from "firebase/firestore";
import { BaseDocumentRead, BaseDocumentWrite } from "../../../../baseTypes";

interface ProblemSetHistoryData {
  categoryId: string;
  problemId: number;
  startTime: Timestamp;
  durationMs: number; // ミリ秒単位の所要時間
  status: "in-progress" | "completed";
  answerHistory: Record<number, "wrong" | "hinted-correct" | "correct">;
  memo: string;
}


export type ProblemSetHistoryRead = BaseDocumentRead & ProblemSetHistoryData;
export type ProblemSetHistoryWrite = BaseDocumentWrite & ProblemSetHistoryData;