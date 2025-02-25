import { Firestore } from "firebase/firestore";
import FirestoreService from "../../../../../handler/firestoreService";
import { CategoryProblemRead, CategoryProblemWrite } from "../../../../../../../../types/firebase/firestore/structure/users/problemSets/categories/problems/problemStructure";

export class CategoryProblemService extends FirestoreService<CategoryProblemRead, CategoryProblemWrite> {
  constructor(firestore: Firestore) {
    super(firestore, ["users", "problemSets", "categories", "problems"]);
  }

  protected filterWriteData(data: CategoryProblemWrite): CategoryProblemWrite {
    const { problemId, status, shortQuestionsStatus, attempts, totalTimeSpent } = data;
    return { problemId, status, shortQuestionsStatus: shortQuestionsStatus, attempts, totalTimeSpent };
  }

  protected filterPartialWriteData(data: Partial<CategoryProblemWrite>): Partial<CategoryProblemWrite> {
    const { problemId, status, shortQuestionsStatus, attempts, totalTimeSpent } = data;
    return { problemId, status, shortQuestionsStatus, attempts, totalTimeSpent };
  }
}