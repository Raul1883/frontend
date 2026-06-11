import { useState } from "react";
import type { SectionProps } from "../types/CharacterSheet";
import { FieldRenderer } from "./FieldRender";

import hand from "/src/assets/hand-svgrepo-com.svg";
import SelectCustomSection from "./SelectCustomSection";

export default function SectionRenderer(props: SectionProps) {
  const { register, control } = props.methods;

  const getColsCount = () => {
    const saved = localStorage.getItem(
      `section_${props.section.title}_columns`,
    );
    return saved ? parseInt(saved, 10) : props.section.columns || 1;
  };

  const [columns, setColumns] = useState<number>(getColsCount());

  const rows = Math.ceil(props.section.fields.length / columns);

  const getGridStyle = () => {
    return {
      display: "grid",
      gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
      gridTemplateRows: `repeat(${rows}, auto)`,
      gridAutoFlow: "column",
      gap: "0.75rem",
      width: "100%",
    } as const;
  };

  const btn_style = "border w-6 h-6 flex items-center justify-center";
  const onClick = (increase: boolean) => {
    let newCount = 1;
    if (increase) {
      newCount = Math.min(6, columns + 1);
    } else {
      newCount = Math.max(1, columns - 1);
    }
    setColumns(newCount);
    setColsCount(newCount);
  };

  const setColsCount = (newCount: number) => {
    localStorage.setItem(
      `section_${props.section.title}_columns`,
      newCount.toString(),
    );
  };

  if (props.section.title.startsWith("SF:"))
    return (
      <div>
        <div className="flex items-center gap-x-2 dragable cursor-grab active:cursor-grabbing">
          <img src={hand} className="w-4 h-4" />
          <SelectCustomSection {...props} />
        </div>
      </div>
    );

  return (
    <div className="w-full">
      {/* Header */}
      <div className="flex items-center justify-between mx-2 my-2">
        <div className="flex items-center gap-x-2 dragable cursor-grab active:cursor-grabbing">
          <img src={hand} className="w-4 h-4" />

          <h3 className="text-lg font-semibold">{props.section.title}</h3>
        </div>

        {/* Column editor */}
        <div className="flex">
          <button
            type="button"
            onClick={() => onClick(false)}
            className={btn_style}
          >
            ←
          </button>
          <button
            type="button"
            onClick={() => onClick(true)}
            className={btn_style}
          >
            →
          </button>
        </div>
      </div>

      {/* Fields */}
      <div style={getGridStyle()} className="px-3">
        {props.section.fields.map((field) => (
          <div key={field.key} className="min-w-0">
            <FieldRenderer
              field={field}
              register={register}
              control={control}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
