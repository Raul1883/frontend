import { ReactGridLayout, useContainerWidth } from "react-grid-layout";
import Header from "../components/Header";

export default () => {
  const { width, containerRef, mounted } = useContainerWidth();

  const layout = [
    { i: "a", x: 0, y: 0, w: 1, h: 2, },
    { i: "b", x: 1, y: 0, w: 3, h: 2,},
    { i: "c", x: 4, y: 0, w: 1, h: 2 },
  ];

  return (
    <div className="">
      <div ref={containerRef} className="">
        {mounted && (
          <ReactGridLayout
            layout={layout}
            width={width}
            className=""
            gridConfig={{ cols: 12, rowHeight: 10 }}
          >
            <div key="a"><div className="bg-yellow-200  overflow-hidden">ddd</div></div>
            <div key="b"><div className="bg-yellow-200  overflow-hidden">ddd</div></div>
            <div key="c"><div className="bg-yellow-200  overflow-hidden">ddd</div></div>
          </ReactGridLayout>
        )}
        <div className=""></div>
      </div>
      <Header />
      {/* <Fight/> */}
    </div>
  );
};
