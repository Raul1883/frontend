import { useEffect, useRef } from "react";
import { EditorState } from "@codemirror/state";
import { EditorView, basicSetup } from "codemirror";
import { json } from "@codemirror/lang-json";
import { useNavigate, useParams } from "react-router-dom";
import useSWR from "swr";
import { getById } from "../../API/Fetcher";
import axiosInstance from "../../API/AxiosInstance";
import { validateCharacterUpdate } from "../characters/schemas/Validator";
import type { SystemSchemaRead } from "../../types/CharacterSchemasTypes";

export default () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const containerRef = useRef<HTMLDivElement>(null);
  const editorRef = useRef<EditorView | null>(null);

  const { data, isLoading, error, mutate } = useSWR<SystemSchemaRead>(
    ["systems-schemas", id],
    ([path, id]) => {
      return getById(path, Number(id));
    },
  );

  useEffect(() => {
    if (!containerRef.current) return;

    const state = EditorState.create({
      doc: JSON.stringify(data, null, 2),
      extensions: [basicSetup, json()],
    });

    const view = new EditorView({
      state,
      parent: containerRef.current,
    });

    editorRef.current = view;

    return () => {
      view.destroy();
    };
  }, [data]);

  if (isLoading) return "Загрузка";
  if (error) return "Ошибка";

  const handleSave = async () => {
    if (!editorRef.current) return;

    const text = editorRef.current.state.doc.toString();

    try {
      const parsed = JSON.parse(text);

      await axiosInstance.put(`systems-schemas/${id}`, parsed);
      mutate();
    } catch (err) {
      console.error("Invalid JSON", err);
    }
  };

  const handleValidate = () => {
    const text = editorRef.current?.state.doc.toString() || "";

    const { valid, errors } = validateCharacterUpdate(text);
    if (!valid) {
      alert(`Ошибка валидации:\n${errors.join("\n")}`);
    } else {
      alert("Схема валидна!");
    }
  };

  return (
    <div>
      <div className="h-12 fixed top-0 left-0 right-0 bg-white shadow-md z-10">
        <div className="text-xl px-4 py-2 flex justify-between">
          <button onClick={() => navigate(-1)} className="px-2 ">
            Редактор схем
          </button>
          <button onClick={handleValidate}>Проверить</button>
          <button onClick={handleSave}>Сохранить</button>
          <button onClick={() => navigate(-1)} className="px-2 ">
            Выйти
          </button>
        </div>
      </div>

      <div ref={containerRef} className="pt-12">
        {" "}
      </div>
    </div>
  );
};
