import Footer from "../components/Footer";
import Header from "../components/Header";
import SessionInfo from "./Session";
import { authAPI } from "../API/auth";
import CharacterSheetEditor from "./characters/systems/views/DND5/ViewDND5";
import { CharacterForm } from "./characters/schemas/SchemaRender";
import DiceBoxComponent from "./characters/DiceRoller";
import Fight from "./characters/systems/views/Witcher/Fight";
import ReactGridLayout, { useContainerWidth } from "react-grid-layout";

export default () => {
  const { width, containerRef, mounted } = useContainerWidth();

  const layout = [
    { i: "a", x: 0, y: 0, w: 1, h: 2, static: true },
    { i: "b", x: 0, y: 0, w: 3, h: 2, minW: 2, maxW: 4 },
    { i: "c", x: 4, y: 0, w: 1, h: 2 },
  ];

  return (
    <div className="">
      <Header />
      {/* <Fight/> */}
      {/* <DiceBoxComponent/> */}
      <div ref={containerRef}>
        {mounted && (
          <ReactGridLayout
            layout={layout}
            width={width}
            gridConfig={{ cols: 12, rowHeight: 30 }}
          >
            <div key="a" className="border">a</div>
            <div key="b" className="border">b</div>
            <div key="c" className="border">c</div>
          </ReactGridLayout>
        )}
      </div>
      <CharacterForm />
    </div>
  );
};
