import Footer from "../components/Footer";
import Header from "../components/Header";
import SessionInfo from "./Session";
import { authAPI } from "../API/auth";
import CharacterSheetEditor from "./characters/systems/views/DND5/ViewDND5";

export default () => {
  return (
    <div className="">
      <CharacterSheetEditor/>
    </div>
  );
};
