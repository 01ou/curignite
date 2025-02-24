import { Firestore, Timestamp, where } from "firebase/firestore";
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

  async getRecentHistories(userId: string, problemSetId: string, borderDay: number): Promise<ProblemSetHistoryRead[]> {
    const now = Timestamp.now();
    const fourteenDaysAgo = new Timestamp(now.seconds - borderDay * 24 * 60 * 60, now.nanoseconds);
    return this.getAll([userId, problemSetId], [where("startTime", ">=", fourteenDaysAgo)]);
  }
}