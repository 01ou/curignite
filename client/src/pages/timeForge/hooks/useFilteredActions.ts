import { useMemo } from "react";
import { ActionCategory, actionCategoryColorMap } from "../types/actionTypes";
import { useTranslation } from "react-i18next";
import { TFunction } from "i18next";

// アクションをフィルタリングする関数
const filterActions = (
  actions: Record<string, { category: ActionCategory; time: number }>,
  selectedCategory: ActionCategory | "all",
  includeSleepTime: boolean
) => {
  return selectedCategory === "all"
    ? Object.entries(actions).filter(([_, { category }]) => includeSleepTime || category !== "sleep")
    : Object.entries(actions).filter(([_, { category }]) => category === selectedCategory
  );
};

// アクションをソートする関数
const sortActions = (
  actions: [string, { category: ActionCategory; time: number }][],
  sortByCategory: boolean,
  sortCategoryOrder: ActionCategory[] = ["training", "rest", "creative", "sleep"]
) => {
  if (sortByCategory) {
    return actions.sort(([, a], [, b]) => {
      const indexA = sortCategoryOrder.indexOf(a.category);
      const indexB = sortCategoryOrder.indexOf(b.category);
      if (indexA !== indexB) {
        return indexA - indexB;
      }
      return b.time - a.time;
    });
  }
  return actions.sort(([, a], [, b]) => b.time - a.time);
};

// ラベル・データ・カラーを生成する関数
const generateChartData = (
  actions: [string, { category: ActionCategory; time: number }][],
  t: TFunction<"translation", undefined>,
  includeRemainingTime: boolean
) => {
  const labels: string[] = [];
  const data: number[] = [];
  const color: string[] = [];
  const borderColor: string[] = [];

  let totalTime = 0;

  actions.forEach(([key, action]) => {
    const baseColor = actionCategoryColorMap[action.category];
    labels.push(t(key));
    data.push(action.time);
    color.push(baseColor);
    borderColor.push("#444");
    totalTime += action.time;
  });

  // 24時間 (ミリ秒換算) - 合計時間
  const remainingTime = 86400000 - totalTime;

  if (includeRemainingTime && remainingTime > 0) {
    labels.push(t("otherTime"));
    data.push(remainingTime);
    color.push("#cccccc"); // その他はグレー
    borderColor.push("#444");
  }

  return { labels, data, color, borderColor };
};

interface FilterActionsArgs {
  actions: Record<string, { category: ActionCategory; time: number }>,
  selectedCategory: ActionCategory | "all",
  sortByCategory?: boolean,
  includeSleepTime?: boolean,
  includeRemainingTime?: boolean
}

// メインフック
const useFilteredActions = (
{
  actions,
  selectedCategory,
  sortByCategory = false,
  includeSleepTime = false,
  includeRemainingTime = false,
}: FilterActionsArgs
) => {
  const { t } = useTranslation();

  // フィルタリングとソート
  const filteredActions = useMemo(() => {
    const filtered = filterActions(actions, selectedCategory, includeSleepTime);
    return Object.fromEntries(sortActions(filtered, sortByCategory));
  }, [actions, selectedCategory, sortByCategory]);

  // チャートデータ生成
  const { labels, data, color, borderColor } = useMemo(() => {
    return generateChartData(Object.entries(filteredActions), t, includeRemainingTime && selectedCategory === "all");
  }, [filteredActions, includeRemainingTime, selectedCategory]);

  // チャート用データセット
  const dataset = useMemo(
    () => [
      {
        data,
        backgroundColor: color,
        borderColor: borderColor,
        borderWidth: 1
      },
    ],
    [data, color, borderColor]
  );

  // 最終チャートデータ
  const chartData = useMemo(
    () => ({
      labels,
      datasets: dataset,
    }),
    [labels, dataset]
  );

  return {
    filteredActions,
    labels,
    dataset,
    data: chartData,
  };
};

export default useFilteredActions;
