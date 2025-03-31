import React from 'react';
import CharacterImage from "../../../assets/characters/character-cat.png";
import CharacterSpeechBubble from './CharacterSpeechBubble';

interface HomeCharacterProps { }

const HomeCharacter: React.FC<HomeCharacterProps> = () => {
  return (
    <div>
      <CharacterSpeechBubble
        characterIconUrl={CharacterImage}
        contents='こんにちは'
        avatarSize={120}
        bubbleWidth={200}
        bubbleColor='#D3FFC7'
        variant="h6"
      />
    </div>
  );
};

export default HomeCharacter;