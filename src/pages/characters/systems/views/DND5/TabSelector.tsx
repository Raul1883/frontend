import type { Tabs as Tab } from "../../types/TypesDND5";
import CombatInfo from "./CombatInfo";
import Equipment from "./Equipment";
import MainInfo from "./MainInfo";
import Notes from "./Notes";
import StatsInfo from "./StatsInfo";

export default ({ tab }: { tab: Tab }) => {
  if (tab == "stats") {
    return (
      <div className="flex flex-wrap gap-2 justify-between">
        <MainInfo />
        <CombatInfo />
        <StatsInfo />
      </div>
    );
  }

  if (tab == "equipment") {
    return <Equipment />;
  }

  if (tab == "notes") {
    return <Notes />;
  }

  return (
    <div className="flex flex-wrap gap-2 justify-between">
      <MainInfo />
      <CombatInfo />
      <StatsInfo />
    </div>
  );
};
