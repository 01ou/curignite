// Relationship types
export type Relationship = 
  | "girlfriend"
  | "boyfriend"
  | "femaleFriend"
  | "maleFriend";

// Personality types
export type Personality = 
  | "tsundere"
  | "childhoodFriend"
  | "energetic";

export type Intimacy = 1 | 2 | 3 | 4 | 5 | 6 | 7;

export type Situation =  "firstLogin" | "loggingIn" | "countingAccess" | "startingEffort" | "finishingEffort" | "reportingEffortTime";

export interface Character {
  relationship: Relationship;
  personality: Personality;
  intimacy: Intimacy;
}

export interface CharacterMessages {
  intimacy: Intimacy[]; // 対応する親密度
  messages: string[];
}
