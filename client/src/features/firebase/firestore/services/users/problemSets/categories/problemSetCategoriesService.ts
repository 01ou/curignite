import { Firestore } from "firebase/firestore";
import { ProblemSetCategoryDocument, ProblemSetCategoryRead, ProblemSetCategoryWrite } from "../../../../../../../types/firebase/firestore/structure/users/problemSets/categories/categoryStructure";
import FirestoreService from "../../../../handler/firestoreService";

export class ProblemSetCategoryService extends FirestoreService<ProblemSetCategoryRead, ProblemSetCategoryWrite, ProblemSetCategoryDocument> {
  constructor(firestore: Firestore) {
    super(firestore, ["users", "problemSets", "categories"]);
  }

  protected filterWriteData(data: ProblemSetCategoryWrite): ProblemSetCategoryDocument {
    const { categoryName, lastProblemNumber } = data;
    return { categoryName, lastProblemNumber, totalAttempts: 0, totalTimeSpent: 0 };
  }

  protected filterPartialWriteData(data: Partial<ProblemSetCategoryWrite>): Partial<ProblemSetCategoryWrite> {
    const { categoryName, lastProblemNumber } = data;
    return { categoryName, lastProblemNumber };
  }
}