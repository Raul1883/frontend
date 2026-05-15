import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";

import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import useSWR, { mutate } from "swr";
import { useNavigate, useParams } from "react-router-dom";

import { FieldRenderer } from "./FieldRender";
import SheetLayout from "./SheetLayout";

import { create, getById, updateByPath } from "../../../API/Fetcher";

import type { CharacterSchema, Section } from "../types/CharacterSheet";
import type { CharacterGet, CharacterPost } from "../../../types/Character";
import Modal from "../../../components/Modal";
import HelpChar from "./HelpChar";
import { getSchema } from "./SchemaSelector";

function canBeNumber(str: string): boolean {
  const num = Number(str);
  return !isNaN(num) && str.trim() !== "";
}

export function CharacterForm() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [isModal, setIsModal] = useState<boolean>(false);

  const isNew = !canBeNumber(id ? id : "1");
  const numericId = !isNew && id ? Number(id) : null;

  const creationStarted = useRef(false);

  const [saved, setSaved] = useState(false);

  const methods = useForm({
    mode: "onBlur",
  });

  const { reset, handleSubmit, getValues, register, control } = methods;

  /*
   * CREATE NEW CHARACTER
   */
  useEffect(() => {
    if (!isNew) return;
    if (creationStarted.current) return;

    creationStarted.current = true;

    const createCharacter = async () => {
      try {
        const payload: CharacterPost = {
          name: "Новый персонаж",
          description: "",
          data_fields: {
            system_name: id,
          },
        };

        const newCharacter = await create<CharacterPost, CharacterGet>(
          "/characters",
          payload,
        );

        if (!newCharacter?.id) {
          throw new Error("Character ID not returned");
        }

        navigate(`/characters/${newCharacter.id}`, {
          replace: true,
        });
      } catch (error) {
        console.error("Ошибка создания персонажа:", error);
        creationStarted.current = false;
      }
    };

    void createCharacter();
  }, [isNew, navigate]);

  /*
   * LOAD CHARACTER
   */
  const {
    data: character,
    error,
    isLoading,
  } = useSWR<CharacterGet>(
    numericId ? `/characters/${numericId}` : null,
    async () => {
      return await getById<CharacterGet>("/characters", numericId!);
    },
    {
      revalidateOnFocus: false,
      onSuccess: (char) => {
        reset({
          name: char.name,
          ...char.data_fields,
        });
      },
    },
  );
  /*
   * SAVE
   */
  const onSubmit = async () => {
    if (!numericId) {
      console.warn("Нет ID персонажа");
      return;
    }

    try {
      const values = getValues();

      const payload: CharacterPost = {
        name: values.name,
        description: values.story ?? "",
        data_fields: values,
      };

      await updateByPath<CharacterPost, CharacterGet>(
        "/characters",
        numericId,
        payload,
      );

      await mutate(`/characters/${numericId}`);
      saveOk();
    } catch (error) {
      console.error("Ошибка сохранения:", error);
    }
  };

  const saveOk = async () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  /*
   * STATES
   */
  if (isNew) {
    return <div className="p-6">Создание персонажа...</div>;
  }

  if (isLoading) {
    return <div className="p-6">Загрузка...</div>;
  }

  if (error) {
    return (
      <div className="p-6 text-red-500">Ошибка загрузки: {error.message}</div>
    );
  }

  if (!character) {
    return <div className="p-6">Персонаж не найден</div>;
  }

  const schema: CharacterSchema | null = getSchema(
    character?.data_fields.system_name,
  );

  if (!schema) return <div>Не найдена схема персонажа</div>;

  /*
   * buttons
   */

  /*
   * RENDER
   */

  const getVerticalGridStyle = (section: Section) => {
    const fieldsCount = section.fields.length;
    const columns = section.columns || 1;
    const rows = Math.ceil(fieldsCount / columns);

    
    return {
      display: "grid",
      gridAutoFlow: "column",
      gridTemplateColumns: `repeat(${columns}, minmax(200px, auto))`,
      gridTemplateRows: `repeat(${rows}, auto)`,
      gap: "0.5rem", // соответствует gap-2
    };
  };
  return (
    <div className="">
      <form onSubmit={handleSubmit(onSubmit)} className="">
        <div className="flex gap-4 pl-4 mt-2">
          <button type="submit" className="relative inline-flex items-center">
            <img
              className="w-7"
              src="/src/assets/save-floppy-svgrepo-com.svg"
            />
            {saved && (
              <div className="absolute -top-1 -right-1 w-4 h-4 flex items-center justify-center text-xs bg-green-500 text-white rounded-full">
                ✓
              </div>
            )}
          </button>
          <button type="button" onClick={() => setIsModal(true)} className="">
            <img
              className="w-8"
              src="/src/assets/info-circle-svgrepo-com.svg"
            />
          </button>
          <button onClick={() => {downloadJSON(getValues())}}>JSON</button>
          <button
            onClick={() => {
              navigate("/characters");
            }}
            className="ml-auto mr-10"
          >
            <img
              className="w-8"
              src="/src/assets/house-water-svgrepo-com.svg"
            />
          </button>
        </div>
        <SheetLayout schema={schema}>
          {schema.sections.map((section) => (
            <div key={section.title} className=" p-2 h-full">
              <div className="flex items-center gap-x-2 dragable cursor-grab active:cursor-grabbing">
                <img
                  src="/src/assets/hand-svgrepo-com.svg"
                  className="w-4 h-4"
                />

                <h3 className="text-lg font-semibold">{section.title}</h3>
              </div>

              <div
              
                style={getVerticalGridStyle(section)}
                className="gap-2" // gap можно оставить отдельно
              >
                {section.fields.map((field) => (
                  <FieldRenderer
                    key={field.key}
                    field={field}
                    register={register}
                    control={control}
                  />
                ))}
              </div>
            </div>
          ))}
        </SheetLayout>
      </form>

      <Modal
        isOpen={isModal}
        onClose={() => {
          setIsModal(false);
        }}
        className="w-[50%]"
      >
        <HelpChar />
      </Modal>
    </div>
  );
}

function downloadJSON(data: any) {
  const jsonStr = JSON.stringify(data, null, 2);
  const blob = new Blob([jsonStr], { type: "application/json" });
  const link = document.createElement("a");
  const url = URL.createObjectURL(blob);

  link.href = url;
  link.download = `export_${new Date().toISOString().slice(0, 19)}.json`;
  document.body.appendChild(link);
  link.click();

  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
