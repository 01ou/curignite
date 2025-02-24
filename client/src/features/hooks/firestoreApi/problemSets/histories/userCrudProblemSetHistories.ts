import { DocumentData, DocumentReference } from "firebase/firestore";
import { ProblemSetHistoryRead, ProblemSetHistoryWrite } from "../../../../../types/firebase/firestore/structure/users/problemSets/histories/historyStructure";
import { ServiceFactory } from "../../../../firebase/firestore/factory";
import { useAppSelector } from "../../../../redux/hooks";
import useMultipleAsyncHandler from "../../../form/useMultipleAsyncHandler";
import { useCallback } from "react";

interface AsyncStates {
  "create": DocumentReference<ProblemSetHistoryWrite, DocumentData>,
  "readAll": ProblemSetHistoryRead[],
  "getRecent": ProblemSetHistoryRead[],
}

const useCrudProblemSetHistories = () => {
  const user = useAppSelector(state => state.user.authUser);
  const { asyncStates, callAsyncFunction } = useMultipleAsyncHandler<AsyncStates>(["create", "readAll", "getRecent"]);

  const historyService = ServiceFactory.getInstance().createProblemSetHistoryService();

  const createHistory = useCallback((data: ProblemSetHistoryWrite, problemSetId: string) => {
    if (user) {
      callAsyncFunction("create", historyService.create.bind(historyService), [data, [user.uid, problemSetId]]);
    }
  }, [user, callAsyncFunction, historyService]);

  const readAllHistories = useCallback((problemSetId: string) => {
    if (user) {
      callAsyncFunction("readAll", historyService.getAll.bind(historyService), [[user.uid, problemSetId]]);
    }
  }, [user, callAsyncFunction, historyService]);

  const getRecentHistories = useCallback((problemSetId: string, borderDay = 14) => {
    if (user) {
      callAsyncFunction("getRecent", historyService.getRecentHistories.bind(historyService), [user.uid, problemSetId, borderDay]);
    }
  }, [user, callAsyncFunction, historyService])

  return { asyncStates, createHistory, readAllHistories, getRecentHistories };
}

export default useCrudProblemSetHistories;
