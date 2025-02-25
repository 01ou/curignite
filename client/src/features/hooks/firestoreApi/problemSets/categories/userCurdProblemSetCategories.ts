import { DocumentData, DocumentReference } from "firebase/firestore";
import { ServiceFactory } from "../../../../firebase/firestore/factory";
import { useAppSelector } from "../../../../redux/hooks";
import useMultipleAsyncHandler from "../../../form/useMultipleAsyncHandler";
import { useCallback } from "react";
import { ProblemSetCategoryRead, ProblemSetCategoryWrite } from "../../../../../types/firebase/firestore/structure/users/problemSets/categories/categoryStructure";

interface AsyncStates {
  "create": DocumentReference<ProblemSetCategoryWrite, DocumentData>,
  "readAll": ProblemSetCategoryRead[]
}

const userCurdProblemSetCategories = () => {
  const user = useAppSelector(state => state.user.authUser);
  const { asyncStates, callAsyncFunction } = useMultipleAsyncHandler<AsyncStates>(["create", "readAll"]);

  const categoryService = ServiceFactory.getInstance().createProblemSetCategoryService();

  const createCategory = useCallback((data: ProblemSetCategoryWrite, problemSetId: string) => {
    if (user) {
      callAsyncFunction("create", categoryService.create.bind(categoryService), [data, [user.uid, problemSetId]]);
    }
  }, [user, callAsyncFunction, categoryService]);

  const readAllCategories = useCallback((problemSetId: string) => {
    if (user) {
      callAsyncFunction("readAll", categoryService.getAll.bind(categoryService), [[user.uid, problemSetId]]);
    }
  }, [user, callAsyncFunction, categoryService]);

  return { asyncStates, createCategory, readAllCategories };
}

export default userCurdProblemSetCategories;
