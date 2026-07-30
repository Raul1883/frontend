import { useState } from "react";
import type { Section } from "../types/CharacterSheet";
import FieldRender from "./FieldRender";
import { Button, Card, Flex } from "antd";
import hand from "/src/assets/hand-svgrepo-com.svg";

export default ({ section }: { section: Section }) => {
  const getColsCount = () => {
    const saved = localStorage.getItem(`section_${section.title}_columns`);
    return saved ? parseInt(saved, 10) : section.columns || 1;
  };

  const [columns, setColumns] = useState<number>(getColsCount());

  const rows = Math.ceil(section.fields.length / columns);

  const getGridStyle = () => {
    return {
      display: "grid",
      gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
      gridTemplateRows: `repeat(${rows}, auto)`,
      gridAutoFlow: "column",
      width: "100%",
      columnGap: "16px",
    } as const;
  };

  const resizeGrid = (increase: boolean) => {
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
      `section_${section.title}_columns`,
      newCount.toString(),
    );
  };

  return (
    <Card
      title={section.title}
      extra={
        <Flex>
          <div>
            <Button onClick={() => resizeGrid(true)}>+</Button>
            <Button onClick={() => resizeGrid(false)}>-</Button>
          </div>
          <Button className="dragable cursor-grab active:cursor-grabbing">
            <img src={hand} className="w-4 h-4 " />
          </Button>
        </Flex>
      }
      style={{ overflow: "hidden", height: "100%" }}
    >
      <div className={`${section.title}`} style={getGridStyle()}>
        {section.fields.map((x) => (
          <FieldRender field={x} prefix={section.title} key={x.label} />
        ))}
      </div>
    </Card>
  );
};
