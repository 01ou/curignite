import { BaseDocumentRead, BaseDocumentWrite } from "../../../../../baseTypes";
import { ProblemStatus } from "../../problemStatus";

interface CategoryProblemData {
  problemId: number;
  status: ProblemStatus;
  shortQuestionsStatus: Record<string, ProblemStatus> | null;
  attempts: number;
  totalTimeSpent: number;
}

export type CategoryProblemRead = BaseDocumentRead & CategoryProblemData;
export type CategoryProblemWrite = BaseDocumentWrite & CategoryProblemData;