import { useCallback } from "react";
import { ServiceFactory } from "../../../firebase/firestore/factory";
import { useAppSelector } from "../../../redux/hooks";
import useMultipleAsyncHandler from "../../form/useMultipleAsyncHandler";
import { ProblemSetSubCollectionData } from "../../../../types/firebase/firestore/structure/users/problemSets/problemStatus";
import { ProblemSetCategoryWrite } from "../../../../types/firebase/firestore/structure/users/problemSets/categories/categoryStructure";

interface AsyncStates {
  getAllSubCollections: ProblemSetSubCollectionData;
  updateMultipleCategories: void;
}

const useCurdProblemSetSubCollection = () => {
  const user = useAppSelector(state => state.user.authUser);
  const { asyncStates, callAsyncFunction } = useMultipleAsyncHandler<AsyncStates>(["getAllSubCollections", "updateMultipleCategories"]);

  const historyService = ServiceFactory.getInstance().createProblemSetHistoryService();
  const categoryService = ServiceFactory.getInstance().createProblemSetCategoryService();
  const problemService = ServiceFactory.getInstance().createCategoryProblemService();

  const getAllSubCollections = useCallback((problemSetId: string) => {
    const get = async () => {
      if (!user) return {
        problemSetId: "",
        categories: [],
        categoryProblems: {},
        histories: []
      };

      const uid = user.uid;

      // カテゴリを取得
      const categories = await categoryService.getAll([uid, problemSetId]);

      // 各カテゴリの問題を並列取得
      const categoryProblemsEntries = await Promise.all(
        categories.map(async category => {
          const problems = await problemService.getAll([uid, problemSetId, category.docId]);
          return [category.docId, problems] as const;
        })
      );

      // 配列をオブジェクトに変換
      const categoryProblems = Object.fromEntries(categoryProblemsEntries);

      // 履歴を取得
      const histories = await historyService.getAll([uid, problemSetId]);

      return {
        problemSetId,
        categories,
        categoryProblems,
        histories,
      };
    };

    callAsyncFunction("getAllSubCollections", get, []);
  }, [user, callAsyncFunction, categoryService, problemService, historyService]);

  const updateMultipleCategories = (
    categories: ProblemSetCategoryWrite[],
    problemSetId: string,
    existingCategoryIds: string[],
    fixedCategoryIds: string[] = []
  ) => {
    const batch = async (
      categories: ProblemSetCategoryWrite[],
      uid: string,
      problemSetId: string,
      existingCategoryIds: string[],
      fixedCategoryIds: string[]
    ) => {
      // 固定されているカテゴリーIDを除外して、更新・追加・削除の対象となるIDリストを作成
      const useableIds = existingCategoryIds.filter(
        id => !fixedCategoryIds.includes(id)
      );

      // 更新可能な数は、既存と新規のうち小さい方
      const updateCount = Math.min(useableIds.length, categories.length);
      // diff > 0: 新規カテゴリーが多い → 追加が必要
      // diff < 0: 既存カテゴリーが多い → 削除が必要
      const diff = categories.length - useableIds.length;

      categoryService.startBatch([uid, problemSetId]);

      // 共通部分：更新処理
      for (let i = 0; i < updateCount; i++) {
        categoryService.updateInBatch(categories[i], useableIds[i], [uid, problemSetId]);
      }

      if (diff > 0) {
        // 新しいカテゴリーが余っている場合は追加
        for (let i = updateCount; i < categories.length; i++) {
          await categoryService.setInBatch(categories[i], null, [uid, problemSetId]);
        }
      } else if (diff < 0) {
        // 既存カテゴリーが余っている場合は削除
        for (let i = updateCount; i < useableIds.length; i++) {
          categoryService.deleteInBatch(useableIds[i], [uid, problemSetId]);
        }
      }

      await categoryService.commitBatch([uid, problemSetId]);
    }

    if (!user) return;

    callAsyncFunction("updateMultipleCategories", batch, [categories, user.uid, problemSetId, existingCategoryIds, fixedCategoryIds]);    
  }
    
  return { asyncStates, getAllSubCollections, updateMultipleCategories };
};

export default useCurdProblemSetSubCollection;
