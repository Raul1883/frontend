import React, { useRef } from "react";
import type { CharacterGet, CharacterPost } from "../../types/Character";
import { create } from "../../API/Fetcher";
import { Button } from "antd";
import { pb } from "../../API/PocketBase";
import { useAuth } from "../../contexts/AuthContext";

export default ({ mutate }: { mutate: any }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { user } = useAuth();

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

  const uploadCharacter = async (data: any, mutate: any) => {
    if (!user) {
      return;
    }
    const body = {
      name: data.name,
      owner: user.id,
      data_fiels: {
        ...data,
      },
      list_schema: data.list_schema,
    };

    console.log(body);

    await pb.collection("characters").create(body);
    mutate();
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
