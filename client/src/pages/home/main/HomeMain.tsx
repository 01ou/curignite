// HomeMain.tsx
import React from "react";
import { useNavigate } from "react-router-dom";
import BackgroundContainer from "../../../components/display/BackgroundContainer";
import background from "../../../assets/room.png"
import { MenuBook, Task } from "@mui/icons-material";
import FloatingButton from "../../../components/inputs/FloatingButton";
import { getTextOutline } from "../../../functions/style/sxUtils";
import CharacterDisplay from "../../auth/main/CharacterDisplay";
import ItemCountDisplay from "./ItemCountDisplay";
import StartButton from "./StartButton";
import HomeBottomNavigation from "../navigation/HomeBottomNavigation";
import itemImage from "../../../assets/item.png";

const HomeMain: React.FC = () => {
  const navigate = useNavigate();

  return (
    <BackgroundContainer backgroundImage={background}>
      <CharacterDisplay />
      <FloatingButton
        text="問題集"
        top={10}
        left={10}
        children={<MenuBook sx={{ width: 60, height: 60, color: "#5FC4F3" }} />}
        size={80}
        shiftText={-10}
        contentsMb={0.5}
        bgcolor="#fff"
        textVariant="h6"
        buttonSx={{
          border: 2,
          borderColor: "#301C1C",
        }}
        labelSx={{
          color: "#FCFCFC",
          ...getTextOutline("#301C1C", 1),
        }}
        onClick={() => navigate("/problemSets")}
      />
      <FloatingButton
        text="課題"
        top={105}
        left={10}
        children={<Task sx={{ width: 60, height: 60, color: "#5FC4F3" }} />}
        size={80}
        shiftText={-10}
        contentsMb={0.5}
        bgcolor="#fff"
        textVariant="h6"
        buttonSx={{
          border: 2,
          borderColor: "#301C1C",
        }}
        labelSx={{
          color: "#FCFCFC",
          ...getTextOutline("#301C1C", 1),
        }}
      />
      <StartButton />
      <HomeBottomNavigation />
      <ItemCountDisplay
        itemSrc={itemImage}
        count={99}
        top={10}
        right={10}
        fontSize={24}
        containerSx={{
          bgcolor: "#FCFCFC",
          px: 1.5,
          py: 0.5,
          borderRadius: 8,
          border: 2,
          borderColor: "#301C1C",
        }}
      />
    </BackgroundContainer>
  );
};

export default HomeMain;
