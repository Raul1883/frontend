import GridLayout, { type Layout, type LayoutItem } from "react-grid-layout";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";

import type { CharacterSchema, Section } from "../types/CharacterSheet";
import { WidthProvider } from "react-grid-layout/legacy";
import { useState } from "react";

const STORAGE_KEY = "character-layout";
const colsCount = 4;

export default ({
  children,
  schema,
}: {
  children: React.ReactNode;
  schema: CharacterSchema;
}) => {
  const AutoWidthGrid = WidthProvider(GridLayout);

  const [layout, setLayout] = useState<Layout>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);

    if (saved) {
      return JSON.parse(saved);
    }

    return calcLayout(schema);
  });

  // Доп параметр, чтобы ключ уникальный по персонажу
  const onLayoutChange = (newLayout: Layout) => {
    setLayout(newLayout);

    localStorage.setItem(STORAGE_KEY, JSON.stringify(newLayout));
  };

  const resetLayout = () => {
    localStorage.removeItem(STORAGE_KEY);
    setLayout(calcLayout(schema));
  };

  return (
    <div className="">
      <AutoWidthGrid
        className=""
        layout={layout}
        onLayoutChange={onLayoutChange}
        gridConfig={{
          cols: colsCount,
          rowHeight: 15,
          margin: [12, 12],
        }}
        dragConfig={{
          handle: ".dragable",
        }}
      >
        {children}
      </AutoWidthGrid>

      <div className="flex gap-x-2  ">
        <button onClick={resetLayout}>
          <img
            className="w-8"
            src="/src/assets/spinner-refresh-svgrepo-com.svg"
          />
        </button>
      </div>
    </div>
  );
};

const calcLayout = (schema: CharacterSchema): Layout => {
  let x = 0;
  let y = Infinity;
  return schema.sections.map((section): LayoutItem => {
    console.log("SECTION", section.title, section.fields.length);
    const w = getSectionColsCount(section);
    console.log("COL COUNT", w, section.title);
    const h = Math.ceil(section.fields.length / w) + 4;
    console.log(section.title, w, h);

    const item: LayoutItem = {
      i: section.title,
      x: x,
      y: y,
      w: w,
      h: h,
    };

    x = (x + w) % colsCount;

    return item;
  });
};

const getSectionColsCount = (section: Section) => {
  if (section.fields.length <= 6) return 1;
  if (section.fields.length <= 12) return 2;
  return 3;
};
