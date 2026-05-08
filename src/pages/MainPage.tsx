import Header from "../components/Header";
import { CharacterForm } from "./characters/render/SchemaRender";
import DiceBoxComponent from "./characters/DiceRoller";
import Fight from "./characters/systems/views/Witcher/Fight";
import ReactGridLayout, { useContainerWidth } from "react-grid-layout";

export default () => {




  return (
    <div className="">
      <Header />
      {/* <Fight/> */}
      <DiceBoxComponent />
    </div>
  );
};
