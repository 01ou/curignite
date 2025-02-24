import languageArtsImage from "../../../assets/subjects/japanese.png";
import mathematicsImage from "../../../assets/subjects/math.png";
import scienceImage from "../../../assets/subjects/science.png";
import socialStudiesImage from "../../../assets/subjects/social-studies.png";
import foreignLanguageImage from "../../../assets/subjects/english.png";
import practicalImage from "../../../assets/subjects/practical.png";
import { Subject } from "../../../types/app/subjects";

interface SubjectSetting {
  color: string;
  image: string;
}

export const problemSetSubjectSetting: Record<Subject, SubjectSetting> = {
  languageArts: { color: "#8B1602", image: languageArtsImage },
  mathematics: { color: "#0047AB", image: mathematicsImage },
  science: { color: "#008000", image: scienceImage },
  socialStudies: { color: "#FFA500", image: socialStudiesImage },
  foreignLanguage: { color: "#800080", image: foreignLanguageImage },
  practical: { color: "#A52A2A", image: practicalImage },
  other: { color: "#555", image: "" },
  notSelected: { color: "#555", image: "" }
} as const;

export const getSubjectSetting = (subject: Subject) => {
  if (subject in problemSetSubjectSetting) {
    return problemSetSubjectSetting[subject];
  }
  return { color: "#555", image: "" };
}