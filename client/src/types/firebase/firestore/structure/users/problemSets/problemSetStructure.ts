import { Subject } from "../../../../../app/subjects";
import { BaseDocument, BaseDocumentRead, BaseDocumentWrite } from "../../../baseTypes";

export interface BaseProblemSet {
  setName: string;
  subject: Subject;
  detailedSubject: string | null;
}

export interface ProblemSetData extends BaseProblemSet {
  recentAccess: Record<string, number>;
}

export type ProblemSetRead = BaseDocumentRead & ProblemSetData;
export type ProblemSetWrite = BaseDocumentWrite & BaseProblemSet;
export type ProblemSetDocument = BaseDocument & ProblemSetData;