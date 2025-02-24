import { Firestore } from "firebase/firestore";
import { ProblemSetCategoryDocument, ProblemSetCategoryRead, ProblemSetCategoryWrite } from "../../../../../../../types/firebase/firestore/structure/users/problemSets/categories/categoryStructure";
import FirestoreService from "../../../../handler/firestoreService";

export class ProblemSetCategoryService extends FirestoreService<ProblemSetCategoryRead, ProblemSetCategoryWrite, ProblemSetCategoryDocument> {
  constructor(firestore: Firestore) {
    super(firestore, ["users", "problemSets", "categories"]);
  }

  protected async formatWriteData(data: ProblemSetCategoryWrite): Promise<ProblemSetCategoryDocument> {
    const { categoryName, lastProblemNumber } = data;
    return { categoryName, lastProblemNumber, totalAttempts: 0, totalTimeSpent: 0 };
  }

  protected async formatPartialWriteData(data: Partial<ProblemSetCategoryWrite>): Promise<Partial<ProblemSetCategoryWrite>> {
    const { categoryName, lastProblemNumber } = data;
    return { categoryName, lastProblemNumber };
  }
}