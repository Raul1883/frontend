import React, { useRef, useState } from "react";
import type { CharacterGet, CharacterPost } from "../../types/Character";
import { create } from "../../API/Fetcher";

export default ({ mutate }: { mutate: any }) => {
  const [error, setError] = useState<string>("");
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
        setError("Ошибка парсинга JSON: " + (err as Error).message);
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

      <button
        onClick={handleButtonClick}
        className="px-5 py-2 bg-gray-800 text-white rounded-md shadow-sm 
                       hover:bg-gray-700 transition-colors duration-200 
                       focus:outline-none focus:ring-2 focus:ring-gray-500"
      >
        Загрузить из JSON
      </button>
    </div>
  );
};
const uploadCharacter = async (data: any, mutate: any) => {
  const payload: CharacterPost = {
    name: data.name,
    description: "",
    data_fields: data,
  };

  const newCharacter = await create<CharacterPost, CharacterGet>(
    "/characters",
    payload,
  );
  mutate();
};
