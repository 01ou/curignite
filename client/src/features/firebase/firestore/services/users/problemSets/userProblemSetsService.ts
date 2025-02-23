import { Firestore } from "firebase/firestore";
import FirestoreService from "../../../handler/firestoreService";
import { ProblemSetDocument, ProblemSetRead, ProblemSetWrite } from "../../../../../../types/firebase/firestore/structure/users/problemSets/problemSetStructure";

export class UserProblemSetService extends FirestoreService<ProblemSetRead, ProblemSetWrite, ProblemSetDocument> {
  constructor(firestore: Firestore) {
    super(firestore, ["users", "problemSets"]);
  }

  protected async formatWriteData(data: ProblemSetWrite): Promise<ProblemSetDocument> {
    const { name, subject } = data;
    this.checkRequiredProperties([name, subject]);
    return { createdById: await this.getUid(), name, subject, recentAccess: {} }
  }

  protected async formatPartialWriteData(data: Partial<ProblemSetWrite>): Promise<Partial<ProblemSetDocument>> {
    const { name, subject } = data;
    return { createdById: await this.getUid(), name, subject, recentAccess: {} };
  }
}