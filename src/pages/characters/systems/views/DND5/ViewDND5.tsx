// CharacterSheetEditor.tsx
import React, { useState } from "react";
import type { CharacterSheet, Tabs as Tab } from "../../types/TypesDND5";

import { FormProvider, useForm } from "react-hook-form";
import { emptyCharacter } from "./EmptySheet";
import TabSelector from "./TabSelector";

export default () => {
  const methods = useForm<CharacterSheet>({ defaultValues: emptyCharacter });

  const [currentTab, setCurrentTab] = useState<Tab>("stats");

  const onSubmit = (data: CharacterSheet) => console.log(data);

  const setTab = (tab: Tab) => {
    setCurrentTab(tab);
  };

  return (
    <div className="">
      <div className="px-8 py-2 flex justify-between">
        <button onClick={() => {setTab("stats")}}>Характеристики</button>
        <button onClick={() => {setTab("equipment")}}>Снаряжение</button>
        <button onClick={() => {setTab("notes" )}}>Заметки</button>
      </div>

      <div className="px-4">
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <TabSelector tab={currentTab} />
          {/* 
          <FormTextArea name="некит"/>
          */}
        </form>
      </FormProvider>
      </div>
    </div>
  );
};
