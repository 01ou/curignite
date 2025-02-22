import { BaseDocumentRead, BaseDocumentWrite } from "../../../baseTypes";

export interface ProblemSetData {
  name: string;
  subject: string;
  recentAccess: Record<string, number>; // { "YYYY-MM-DD": studyTime }
}

export type ProblemSetRead = BaseDocumentRead & ProblemSetData;
export type ProblemSetWrite = BaseDocumentWrite & ProblemSetData;