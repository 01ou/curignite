export interface CharacterSpeechSetting {
  contents: string;
  choices: CharacterSpeechChoice[];
}

export interface CharacterSpeechChoice {
  text: string;
  onClick: () => void;
  color: string;
};