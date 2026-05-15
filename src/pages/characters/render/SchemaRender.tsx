import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";

import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import useSWR, { mutate } from "swr";
import { useNavigate, useParams } from "react-router-dom";

import { FieldRenderer } from "./FieldRender";
import SheetLayout from "./SheetLayout";

import { create, getById, updateByPath } from "../../../API/Fetcher";

import type { CharacterSchema } from "../types/CharacterSheet";
import type { CharacterGet, CharacterPost } from "../../../types/Character";
import { getSchema } from "./SchemaSelector";
import SchemaHeader from "./SchemaHeader";
import SectionRender from "./SectionRender";

function canBeNumber(str: string): boolean {
  const num = Number(str);
  return !isNaN(num) && str.trim() !== "";
}

export function CharacterForm() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const isNew = !canBeNumber(id ? id : "1");
  const numericId = !isNew && id ? Number(id) : null;

  const creationStarted = useRef(false);

  const [saved, setSaved] = useState(false);

  const methods = useForm({
    mode: "onBlur",
  });

  const { reset, handleSubmit, getValues, register, control } = methods;

  // CREATE NEW CHARACTER
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

  //LOAD CHARACTER

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

  return (
    <div className="">
      <form onSubmit={handleSubmit(onSubmit)} className="">
        <SchemaHeader saved={saved} getValues={getValues} />

        <SheetLayout schema={schema}>
          {schema.sections.map((section) => (
            <div key={section.title} className="">
              <SectionRender
                section={section}
                register={register}
                control={control}
              />
            </div>
          ))}
        </SheetLayout>
      </form>
    </div>
  );
}
