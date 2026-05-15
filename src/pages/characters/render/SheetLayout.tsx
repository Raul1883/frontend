import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import GridLayout, { type Layout, type LayoutItem } from "react-grid-layout";

import { WidthProvider } from "react-grid-layout/legacy";

import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";

import type { CharacterSchema, Section } from "../types/CharacterSheet";
import React from "react";

const STORAGE_KEY = "character-layout";

const colsCount = 8;

const ROW_HEIGHT = 15;
const MARGIN_Y = 12;

const AutoWidthGrid = WidthProvider(GridLayout);

export default function CharacterGrid({
  children,
  schema,
}: {
  children: React.ReactNode;
  schema: CharacterSchema;
}) {
  const childrenArray = useMemo(
    () => React.Children.toArray(children),
    [children],
  );

  const refs = useRef<Record<string, HTMLDivElement | null>>({});

  const [layout, setLayout] = useState<Layout>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);

    if (saved) {
      return JSON.parse(saved);
    }

    return calcLayout(schema);
  });

  // Минимальная высота по контенту
  const [contentHeights, setContentHeights] = useState<Record<string, number>>(
    {},
  );

  const saveLayout = (next: Layout) => {
    setLayout(next);

    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  };

  const updateContentHeight = useCallback((id: string, pxHeight: number) => {
    const contentH = pxToGridHeight(pxHeight);

    setContentHeights((prev) => {
      if (prev[id] === contentH) {
        return prev;
      }

      return {
        ...prev,
        [id]: contentH,
      };
    });

    setLayout((prev) => {
      let changed = false;

      const next = prev.map((item) => {
        if (item.i !== id) {
          return item;
        }

        const nextMinH = contentH;
        const nextH = Math.max(item.h, contentH);

        if (item.h === nextH && item.minH === nextMinH) {
          return item;
        }

        changed = true;

        return {
          ...item,
          minH: nextMinH,
          h: nextH,
        };
      });

      if (changed) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      }

      return next;
    });
  }, []);

  useEffect(() => {
    const observers: ResizeObserver[] = [];

    layout.forEach((item) => {
      const el = refs.current[item.i];

      if (!el) return;

      const observer = new ResizeObserver(([entry]) => {
        updateContentHeight(item.i, entry.contentRect.height);
      });

      observer.observe(el);

      observers.push(observer);
    });

    return () => {
      observers.forEach((o) => o.disconnect());
    };
  }, [layout, updateContentHeight]);

  const onLayoutChange = (newLayout: Layout) => {
    const normalized = newLayout.map((item) => {
      const contentH = contentHeights[item.i] ?? 1;

      return {
        ...item,
        minH: contentH,
        h: Math.max(item.h, contentH),
      };
    });

    saveLayout(normalized);
  };

  const resetLayout = () => {
    localStorage.removeItem(STORAGE_KEY);

    setLayout(calcLayout(schema));
  };

  // console.log(JSON.stringify(layout))

  return (
    <div>
      <AutoWidthGrid 
        className=""
        layout={layout}
        gridConfig={{ cols: colsCount, rowHeight: 15, margin: [12, 12] }}
        dragConfig={{ handle: ".dragable",  }}
        autoSize
        
        onLayoutChange={onLayoutChange}
        
      >
        {childrenArray.map((child, index) => {
          const section = schema.sections[index];

          return (
            <div key={section.title} className="border-2 ">
              <div
                className=""
                ref={(el) => {
                  refs.current[section.title] = el;
                }}
              >
                {child}
              </div>
            </div>
          );
        })}
      </AutoWidthGrid>

      <div className="flex gap-x-2 mb-2">
        <button onClick={resetLayout}>
          <img
            className="w-8"
            src="/src/assets/spinner-refresh-svgrepo-com.svg"
          />
        </button>
      </div>
    </div>
  );
}

function pxToGridHeight(pxHeight: number) {
  return Math.ceil((pxHeight + MARGIN_Y) / (ROW_HEIGHT + MARGIN_Y));
}

const calcLayout = (schema: CharacterSchema): Layout => {
  let x = 0;
  let y = Infinity;

  if (schema.layout) return schema.layout;

  return schema.sections.map((section): LayoutItem => {
    const w = Math.ceil(getSectionColsCount(section) / 2);

    const item: LayoutItem = {
      i: section.title,
      x,
      y,
      w,
      h: 8,
      minH: 1,
    };

    x = (x + w) % colsCount;

    

    return item;
  });
};

const getSectionColsCount = (section: Section) => {
  if (section.fields.length <= 6) return 2;

  if (section.fields.length <= 12) return 4;

  return 6;
};
