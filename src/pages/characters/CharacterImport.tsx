import React, { useRef } from "react";
import type { CharacterGet, CharacterPost } from "../../types/Character";
import { create } from "../../API/Fetcher";
import { Button } from "antd";

export default ({ mutate }: { mutate: any }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onload = (e) => {
      try {
        const jsonData = JSON.parse(e.target?.result as string);
        uploadCharacter(jsonData, mutate);
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
      } catch (err) {
        console.error("Ошибка парсинга JSON: " + (err as Error).message);
      }
    };

    reader.readAsText(file, "UTF-8");
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div>
      <input
        ref={fileInputRef}
        type="file"
        accept=".json,application/json"
        onChange={handleFileUpload}
        className="hidden"
      />

      <Button onClick={handleButtonClick}>Загрузить из JSON</Button>
    </div>
  );
};
const uploadCharacter = async (data: any, mutate: any) => {
  const payload: CharacterPost = {
    name: data.name,
    description: "",
    data_fields: data,
  };

  await create<CharacterPost, CharacterGet>("/characters", payload);
  mutate();
};
