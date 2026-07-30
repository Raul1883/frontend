import {
  ReactGridLayout,
  useContainerWidth,
  type Layout,
} from "react-grid-layout";

import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";

import type { Section } from "../types/CharacterSheet";

import SectionRender from "./SectionRender";

const colsCount = 16;
const rowHeight = 15;

export default function CharacterGrid({
  schema,
  systemId,
  layout,
  setLayout,
}: {
  schema: Section[];
  systemId: string;
  layout: Layout;
  setLayout: any;
}) {
  const { width, containerRef } = useContainerWidth();

  const onLayoutChange = (newLayout: any) => {
    setLayout(newLayout);
    localStorage.setItem(
      `character-layout-${systemId}`,
      JSON.stringify(layout),
    );
  };

  return (
    <div ref={containerRef}>
      <ReactGridLayout
        width={width}
        layout={layout}
        gridConfig={{ cols: colsCount, rowHeight: rowHeight, margin: [12, 12] }}
        dragConfig={{ handle: ".dragable" }}
        onLayoutChange={onLayoutChange}
      >
        {schema.map((x) => (
          <div key={x.title} style={{ overflow: "hidden" }}>
            <SectionRender section={x} />
          </div>
        ))}
      </ReactGridLayout>
    </div>
  );
}
