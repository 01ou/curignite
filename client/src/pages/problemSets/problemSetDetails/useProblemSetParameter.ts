import { HOURS_IN_MILLISECOND } from "../../../constants/dateTimeConstants";
import { toISODate } from "../../../functions/dateTimeUtils/timeConversion"
import { ProblemSetCategoryRead } from "../../../types/firebase/firestore/structure/users/problemSets/categories/categoryStructure";
import { CategoryProblemRead } from "../../../types/firebase/firestore/structure/users/problemSets/categories/problems/problemStructure";
import { ProblemSetHistoryRead } from "../../../types/firebase/firestore/structure/users/problemSets/histories/historyStructure"
import { ProblemSetSubCollectionData, ProblemStatus } from "../../../types/firebase/firestore/structure/users/problemSets/problemStatus";

const useProblemSetParameter = () => {
  const getUsageParameters = (recentHistories: ProblemSetHistoryRead[], borderDay: number, maxSpentTime: number) => {
    const totalSpendTime = recentHistories.reduce((acc, history) => acc + history.durationMs, 0);
    const usedDateSet = new Set(recentHistories.map(history => toISODate(history.startTime)));
  
    const usageFrequency = borderDay > 0 ? usedDateSet.size / borderDay : 0;
    const usageTime = maxSpentTime > 0 ? Math.min(1, totalSpendTime / maxSpentTime) : 0;
  
    return { usageFrequency, usageTime };
  };

  const getProblemStatusCount = (categories: ProblemSetCategoryRead[], problems: Record<string, CategoryProblemRead[]>) => {
    return categories.reduce((acc, category) => {
      const problemStatuses = problems[category.docId]?.map(problem => problem.status) ?? [];
    
      problemStatuses.forEach(status => {
        acc.total = (acc.total || 0) + 1;
        acc[status] = (acc[status] || 0) + 1;
      });
    
      return acc;
    }, {
      total: 0,
      inProgress: 0,
      incorrect: 0,
      partiallyCorrect: 0,
      hesitant: 0,
      hintUsed: 0,
      correct: 0,
      mastered: 0
    } as Record<ProblemStatus | "total", number>);
  }

  const getDetails = (subCollections: ProblemSetSubCollectionData, borderDay: number = 14) => {
    if (!subCollections) return null;
  
      const maxSpentTime = 2 * HOURS_IN_MILLISECOND * borderDay;
  
      const { usageFrequency, usageTime } = getUsageParameters(subCollections.histories, borderDay, maxSpentTime);
  
      const counts = getProblemStatusCount(subCollections.categories, subCollections.categoryProblems);
  
      const completionRate = counts.total > 0 ? (counts.correct + counts.mastered) / counts.total : 0;
  
      const intimacy = (usageFrequency + usageTime) / 2;
  
      return {
        ...subCollections,
        usageFrequency: usageFrequency * 100,
        usageTime: usageTime * 100,
        intimacy: intimacy * 100,
        completionRate
      }
  }

  return { getUsageParameters, getProblemStatusCount, getDetails };
}

export default useProblemSetParameter