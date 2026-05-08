import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";

import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import useSWR, { mutate } from "swr";
import { useNavigate, useParams } from "react-router-dom";

import { witcherSchema } from "./SchemaUtils";
import { FieldRenderer } from "./FieldRender";
import SheetLayout from "./SheetLayout";

import { create, getById, updateByPath } from "../../../API/Fetcher";

import type { CharacterSchema, Section } from "../systems/types/Form";
import type { CharacterGet, CharacterPost } from "../../../types/Character";
import type { CharacterSheet } from "../systems/types/TypesDND5";
import Modal from "../../../components/Modal";
import SchemaSelector from "./SchemaSelector";

export function CharacterForm() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [isModal, setIsModal] = useState<boolean>(false);

  const schema: CharacterSchema = SchemaSelector();

  const isNew = id === "new";
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
          data_fields: {},
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
        } as CharacterSheet);
      },
    },
  );

  /*
   * SAVE
   */
  const onSubmit = async () => {
    console.log(1111);
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

      const res = await updateByPath<CharacterPost, CharacterGet>(
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
    console.log(1);
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

  /*
   * buttons
   */

  /*
   * RENDER
   */
  return (
    <div className="">
      <form onSubmit={handleSubmit(onSubmit)} className="">
        <div className="flex gap-4 pl-4 mt-2">
          <button
            type="submit"
            className="relative inline-flex items-center"
          >
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
          <button
            type="button"
            onClick={() => setIsModal(true)}
            className=""
          >
            <img
              className="w-8"
              src="/src/assets/info-circle-svgrepo-com.svg"
            />
          </button>
        </div>
        <SheetLayout schema={schema}>
          {schema.sections.map((section) => (
            <div key={section.title} className="border p-2 bg-white">
              <div className="flex items-center gap-x-2 dragable cursor-grab active:cursor-grabbing">
                <img
                  src="/src/assets/hand-svgrepo-com.svg"
                  className="w-4 h-4"
                />

                <h3 className="text-lg font-semibold">{section.title}</h3>
              </div>

              <div className={getGrid(section)}>
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
        <h1 className="text-2xl mb-4">Информация</h1>
        <p>
          Это тестовая версия листа персонажа, в отображении могут возникать
          ошибки, но это не очень страшно, потому что вы можете изменять размер
          каждого из окон, а также перемещать их внутри листа.
        </p>
        <p className="font-bold">
          Сохраняй лист персонажа, авто сейва пока нет!
        </p>
        <p>
          Если что-то пошло не так, можно нажать на круглик и блоки
          перерасчитают свое положение.
        </p>
      </Modal>
    </div>
  );
}

const getSectionColsCount = (section: Section) => {
  if (section.fields.length <= 6) return 1;
  if (section.fields.length <= 12) return 2;
  return 3;
};

const getGrid = (section: Section) => {
  const gridCols = {
    1: "grid-cols-1",
    2: "grid-cols-2",
    3: "grid-cols-3",
  };

  return `grid gap-2 ${gridCols[getSectionColsCount(section)]}`;
};
