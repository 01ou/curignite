import { DocumentReference, DocumentData } from "firebase/firestore";
import { useCallback } from "react";
import { CategoryProblemRead, CategoryProblemWrite } from "../../../../../../types/firebase/firestore/structure/users/problemSets/categories/problems/problemStructure";
import { ServiceFactory } from "../../../../../firebase/firestore/factory";
import { useAppSelector } from "../../../../../redux/hooks";
import useMultipleAsyncHandler from "../../../../form/useMultipleAsyncHandler";

interface AsyncStates {
  "create": DocumentReference<CategoryProblemWrite, DocumentData>,
  "readAll": CategoryProblemRead[]
}

const useCurdCategoryProblems = () => {
  const user = useAppSelector(state => state.user.authUser);
  const { asyncStates, callAsyncFunction } = useMultipleAsyncHandler<AsyncStates>(["create", "readAll"]);

  const categoryService = ServiceFactory.getInstance().createCategoryProblemService();

  const createProblem = useCallback((data: CategoryProblemWrite, problemSetId: string, categoryId: string) => {
    if (user) {
      callAsyncFunction("create", categoryService.create.bind(categoryService), [data, [user.uid, problemSetId, categoryId]]);
    }
  }, [user, callAsyncFunction, categoryService]);

  const readAllProblems = useCallback((problemSetId: string, categoryId: string) => {
    if (user) {
      callAsyncFunction("readAll", categoryService.getAll.bind(categoryService), [[user.uid, problemSetId, categoryId]]);
    }
  }, [user, callAsyncFunction, categoryService]);

  return { asyncStates, createProblem, readAllProblems };
}

export default useCurdCategoryProblems;
