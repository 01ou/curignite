import { Firestore } from "firebase/firestore";
import FirestoreService from "../../../handler/firestoreService";
import { ProblemSetDocument, ProblemSetRead, ProblemSetWrite } from "../../../../../../types/firebase/firestore/structure/users/problemSets/problemSetStructure";

export class UserProblemSetService extends FirestoreService<ProblemSetRead, ProblemSetWrite, ProblemSetDocument> {
  constructor(firestore: Firestore) {
    super(firestore, ["users", "problemSets"]);
  }

  protected filterWriteData(data: ProblemSetWrite): ProblemSetDocument {
    const { setName, subject, detailedSubject } = data;
    return { setName, subject, detailedSubject, recentAccess: {} }
  }

  protected filterPartialWriteData(data: Partial<ProblemSetWrite>): Partial<ProblemSetDocument> {
    const { setName, subject } = data;
    return { setName, subject };
  }
}