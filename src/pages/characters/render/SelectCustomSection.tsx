import Fight from "../systems/views/Witcher/Fight";
import type { SectionProps } from "../types/CharacterSheet";

export default (props: SectionProps) => {
  switch (props.section.title) {
    case "SF:WitcherFight":
      return <Fight {...props} />;
  }

  return <div className="text-red-500">Ошибка рендера системной секции</div>;
};
