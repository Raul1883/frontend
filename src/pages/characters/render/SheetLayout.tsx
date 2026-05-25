import { useMemo, useRef, useState } from "react";

import {
  ReactGridLayout,
  useContainerWidth,
  type Layout,
  type LayoutItem,
} from "react-grid-layout";

import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";

import type { CharacterSchema } from "../types/CharacterSheet";
import React from "react";

import spinner from "/src/assets/spinner-refresh-svgrepo-com.svg";

const STORAGE_KEY = "character-layout";

const colsCount = 16;
const rowHeight = 15;

export default function CharacterGrid({
  children,
  schema,
}: {
  children: React.ReactNode;
  schema: CharacterSchema;
}) {
  // разметка

  // функциональность
  const childrenArray = useMemo(
    () => React.Children.toArray(children),
    [children],
  );

  const refs = useRef<Record<string, HTMLDivElement | null>>({});

  const { width, containerRef } = useContainerWidth();

  const [layout, setLayout] = useState<Layout>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);

    if (saved) {
      return JSON.parse(saved);
    }

    return calcLayout(schema);
  });

  const saveLayout = (next: Layout) => {
    setLayout(next);

    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  };

  const onLayoutChange = (newLayout: Layout) => {
    saveLayout(newLayout);
  };

  // console.log(JSON.stringify(layout))

  return (
    <div ref={containerRef}>
      <ReactGridLayout
        width={width}
        className=""
        layout={layout}
        gridConfig={{ cols: colsCount, rowHeight: rowHeight, margin: [12, 12] }}
        dragConfig={{ handle: ".dragable" }}
        onLayoutChange={onLayoutChange}
      >
        {childrenArray.map((child, index) => {
          const section = schema.sections[index];

          return (
            <div key={section.title} className="border-2 overflow-hidden">
              <div
                ref={(el) => {
                  refs.current[section.title] = el;
                }}
                className="relative "
              >
                {child}
              </div>
            </div>
          );
        })}
      </ReactGridLayout>

      <div className="flex gap-x-2 mb-2 ">
        <button
          type="button"
          onClick={() => {
            localStorage.removeItem(STORAGE_KEY);

            setLayout(calcLayout(schema));
          }}
          className=""
        >
          <img className="w-8" src={spinner} />
        </button>
        <button
          type="button"
          onClick={() => {
            navigator.clipboard.writeText(JSON.stringify(layout));
            alert("Layout copied to clipboard");
          }}
          className=""
        >
          json
        </button>
      </div>
    </div>
  );
}

const calcLayout = (schema: CharacterSchema): Layout => {
  let x = 0;
  let y = Infinity;

  if (schema.layout) return schema.layout;

  // Работает не идеально
  return schema.sections.map((section): LayoutItem => {
    const w = 2;

    const item: LayoutItem = {
      i: section.title,
      x,
      y,
      w,
      h: 8,
      minH: 2,
    };

    x = (x + w) % colsCount;

    return item;
  });
};
