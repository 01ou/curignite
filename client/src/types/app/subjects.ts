export type ScienceSubject = "physics" | "biology" | "chemistry" | "geology";

export type SocialStudiesSubject = "geography" | "history" | "publicAffairs" | "politics" | "economics";

export type PracticalSubject = "technology" | "homeEconomics" | "music" | "art" | "information" | "PE" | "ethics";

// Subject.ts
export const Subject = {
  LanguageArts: "languageArts",
  Mathematics: "mathematics",
  Science: "science",
  ForeignLanguage: "foreignLanguage",
  SocialStudies: "socialStudies",
  Practical: "practical",
  Other: "other",
  NotSelected: "notSelected"
} as const;

export type Subject = typeof Subject[keyof typeof Subject];
