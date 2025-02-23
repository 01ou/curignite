import { ProblemSetWrite } from "../../../../types/firebase/firestore/structure/users/problemSets/problemSetStructure";
import serviceFactory from "../../../firebase/firestore/factory";
import { useAppSelector } from "../../../redux/hooks";
import useMultipleAsyncHandler from "../../form/useMultipleAsyncHandler"

interface AsyncStates {
  "create": any,
}

const useCrudProblemSets = () => {
  const user = useAppSelector(state => state.user.authUser);
  const { asyncStates, callAsyncFunction } = useMultipleAsyncHandler<AsyncStates>(["create"]);

  const createProblemSet = (data: ProblemSetWrite) => {
    console.log(user, data);
    
    if (user) {
      const problemSetService = serviceFactory.createUserProblemSetService();
      callAsyncFunction("create", problemSetService.create.bind(problemSetService), [data, [user.uid]]);
    }
  }

  return { asyncStates, createProblemSet }
}

export default useCrudProblemSets