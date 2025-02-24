import { Firestore } from "firebase/firestore";
import { ProblemSetHistoryRead, ProblemSetHistoryWrite } from "../../../../../../../types/firebase/firestore/structure/users/problemSets/histories/historyStructure";
import FirestoreService from "../../../../handler/firestoreService";

export class ProblemSetHistoryService extends FirestoreService<ProblemSetHistoryRead, ProblemSetHistoryWrite> {
  constructor(firestore: Firestore) {
    super(firestore, ["users", "problemSets", "histories"]);
  }

  protected async formatWriteData(data: ProblemSetHistoryWrite): Promise<ProblemSetHistoryWrite> {
    const { categoryId, problemId, startTime, durationMs, shortQuestionStatus } = data;
    return { categoryId, problemId, startTime, durationMs, shortQuestionStatus };
  }

  protected async formatPartialWriteData(data: Partial<ProblemSetHistoryWrite>): Promise<Partial<ProblemSetHistoryWrite>> {
    const { categoryId, problemId, startTime, durationMs, shortQuestionStatus } = data;
    return { categoryId, problemId, startTime, durationMs, shortQuestionStatus };
  }
}