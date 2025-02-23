import { BaseDocument, BaseDocumentRead, BaseDocumentWrite } from "../../../baseTypes";

export interface ProblemSetData {
  name: string;
  subject: string;
}

export interface ProblemSetDocument extends BaseDocument {
  name: string;
  subject: string;
  recentAccess: Record<string, number>;
}

export type ProblemSetRead = BaseDocumentRead & ProblemSetData;
export type ProblemSetWrite = BaseDocumentWrite & ProblemSetData;