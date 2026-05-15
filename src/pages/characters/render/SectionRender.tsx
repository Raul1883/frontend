import { useState } from "react";
import type { Control, FieldValues, UseFormRegister } from "react-hook-form";
import type { Section } from "../types/CharacterSheet";
import { FieldRenderer } from "./FieldRender";

interface SectionProps {
  section: Section;
  register: UseFormRegister<FieldValues>;
  control: Control<FieldValues>;
}

export default function SectionRenderer(props: SectionProps) {
  const getColsCount = () => {
    const saved = localStorage.getItem(
      `section_${props.section.title}_columns`,
    );
    return saved ? parseInt(saved, 10) : props.section.columns || 1;
  };

  const [columns, setColumns] = useState(getColsCount());

  const getGridStyle = () => {
    return {
      display: "grid",
      gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
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
      newCount = Math.min(1, columns - 1);
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

  return (
    <div className="w-full">
      {/* Header */}
      <div className="flex items-center justify-between mx-2 my-2">
        <div className="flex items-center gap-x-2 dragable cursor-grab active:cursor-grabbing">
          <img src="/src/assets/hand-svgrepo-com.svg" className="w-4 h-4" />

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
              register={props.register}
              control={props.control}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
