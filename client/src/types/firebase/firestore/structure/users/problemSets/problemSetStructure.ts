import { Subject } from "../../../../../app/subjects";
import { BaseDocument, BaseDocumentRead, BaseDocumentWrite } from "../../../baseTypes";

export interface ProblemSetData extends BaseDocument {
  name: string;
  subject: Subject;
  detailedSubject: string | null;
}

export interface ProblemSetDocument extends ProblemSetData {
  recentAccess: Record<string, number>;
}

export type ProblemSetRead = BaseDocumentRead & ProblemSetData;
export type ProblemSetWrite = BaseDocumentWrite & ProblemSetData;