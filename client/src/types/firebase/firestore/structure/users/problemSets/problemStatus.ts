export type ProblemStatus =
  | "inProgress" // 進行中
  | "incorrect" // 不正解
  | "partiallyCorrect" // 部分的に正解
  | "hesitant" // 迷いながら正解
  | "hintUsed" // ヒントを使って解答
  | "correct" // 正解
  | "mastered"; // 完全に理解
