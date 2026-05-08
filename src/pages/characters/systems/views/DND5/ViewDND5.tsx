import React, { useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import useSWR, { mutate } from "swr";
import { FormProvider, useForm } from "react-hook-form";
import type { CharacterSheet, Tabs as Tab } from "../../types/TypesDND5";
import { emptyCharacter } from "./EmptySheet";
import TabSelector from "./TabSelector";
import { create, getById, updateByPath } from "../../../../../API/Fetcher";
import type {
  CharacterGet,
  CharacterPost,
} from "../../../../../types/Character";

export default function CharacterSheetEditor() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const isNew = id === "new";

  const methods = useForm<CharacterSheet>({ defaultValues: emptyCharacter, mode: "onBlur"});
  const { reset, handleSubmit } = methods;
  const creationTriggered = React.useRef(false);

  const { error, isLoading } = useSWR<CharacterGet>(
    !isNew && id ? `/characters` : null,
    async (url: string) => {
      const char = await getById<CharacterGet>(url, Number(id));
      return char;
    },
    {
      onSuccess: (char) => {
        reset({
          name: char.name,
          ...char.data_fields,
        } as CharacterSheet);
      },
    },
  );

  useEffect(() => {
    if (!isNew) return;
    if (creationTriggered.current) return; 

    let isMounted = true;
    creationTriggered.current = true;

    const createNewCharacter = async () => {
      try {
        const initialData: CharacterPost = {
          name: emptyCharacter.name || "Новый персонаж",
          description: emptyCharacter.story || "",
          data_fields: emptyCharacter as Record<string, any>,
        };
        const newChar = await create<CharacterPost, CharacterGet>(
          "/characters",
          initialData,
        );
        if (isMounted && newChar.id) {
          navigate(`/character/${newChar.id}`, { replace: true });
        }
      } catch (err) {
        console.error("Ошибка создания персонажа:", err);
        creationTriggered.current = false; 
      }
    };

    createNewCharacter();

    return () => {
      isMounted = false;
    };
  }, [isNew, navigate]);

  const onBlur = async (data: CharacterSheet) => {
    if (!id || isNew) {
      console.warn("Невозможно сохранить: нет id персонажа");
      return;
    }

    const payload: CharacterPost = {
      name: data.name,
      description: data.story,
      data_fields: { ...data, name: data.name },
    };

    try {
      await updateByPath<CharacterPost, CharacterGet>(
        "/characters",
        Number(id),
        payload,
      );

      mutate(`/characters/${id}`);
    } catch (err) {
      console.error("Ошибка сохранения:", err);
    }
  };

  const [currentTab, setCurrentTab] = React.useState<Tab>("stats");

  if (isLoading && !isNew) return <div>Загрузка...</div>;
  if (error) return <div>Ошибка загрузки: {error.message}</div>;

  return (
    <div>
      <div className="px-8 py-2 flex justify-between">
        <button onClick={() => setCurrentTab("stats")}>Характеристики</button>
        <button onClick={() => setCurrentTab("equipment")}>Снаряжение</button>
        <button onClick={() => setCurrentTab("notes")}>Заметки</button>
        <Link to="/characters">Домой</Link>
      </div>

      <div className="px-4">
        <FormProvider {...methods}>
          <form onBlur={handleSubmit(onBlur)}>
            <TabSelector tab={currentTab} />
          </form>
        </FormProvider>
      </div>
    </div>
  );
}
