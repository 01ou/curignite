import { DocumentData, DocumentReference } from "firebase/firestore";
import { ProblemSetDocument, ProblemSetRead, ProblemSetWrite } from "../../../../types/firebase/firestore/structure/users/problemSets/problemSetStructure";
import { ServiceFactory } from "../../../firebase/firestore/factory";
import { useAppSelector } from "../../../redux/hooks";
import useMultipleAsyncHandler from "../../form/useMultipleAsyncHandler";
import { useCallback } from "react";

interface AsyncStates {
  "create": DocumentReference<ProblemSetDocument, DocumentData>,
  "readAll": ProblemSetRead[]
}

const useCrudProblemSets = () => {
  const user = useAppSelector(state => state.user.authUser);
  const { asyncStates, callAsyncFunction } = useMultipleAsyncHandler<AsyncStates>(["create", "readAll"]);

  const problemSetService = ServiceFactory.getInstance().createUserProblemSetService();

  const createProblemSet = useCallback((data: ProblemSetWrite) => {
    if (user) {
      callAsyncFunction("create", problemSetService.create.bind(problemSetService), [data, [user.uid]]);
    }
  }, [user, callAsyncFunction, problemSetService]);

  const readAllProblemSets = useCallback(() => {
    if (user) {
      callAsyncFunction("readAll", problemSetService.getAll.bind(problemSetService), [[user.uid]]);
    }
  }, [user, callAsyncFunction, problemSetService]);

  return { asyncStates, createProblemSet, readAllProblemSets };
}

export default useCrudProblemSets;
