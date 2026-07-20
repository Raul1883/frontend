import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";

import { useEffect, useRef, useState } from "react";
import useSWR, { mutate } from "swr";
import { useNavigate, useParams } from "react-router-dom";

import SheetLayout from "./SheetLayout";

import { create, getById, updateByPath } from "../../../API/Fetcher";

import type { CharacterSchema } from "../types/CharacterSheet";
import type { CharacterGet, CharacterPost } from "../../../types/Character";
import { getSchema } from "./SchemaSelector";
import SchemaHeader from "./SchemaHeader";
import SectionRender from "./SectionRender";
import Form, { useForm } from "antd/es/form/Form";
import { ConfigProvider } from "antd";

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
  const [schema, setSchema] = useState<CharacterSchema>();

  const [form] = useForm();

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
            name: "Новый персонаж",
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
      const values = form.getFieldsValue();

      const payload: CharacterPost = {
        name: values.name,
        description: values.story ?? "",
        data_fields: {
          system_name: character?.data_fields.system_name,
          ...values,
        },
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

  useEffect(() => {
    async function fetchData() {
      // Запрос только когда есть system_name
      if (!character?.data_fields?.system_name) return;

      const res = await getSchema(character.data_fields.system_name);
      if (!res) return;
      setSchema(res);
    }

    fetchData();
  }, [character]);

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

  if (!schema) return <div>Не найдена схема персонажа</div>;

  return (
    <ConfigProvider
      theme={{
        token: {
          borderRadius: 2,
          wireframe: false,
          colorPrimary: "#6e6e6e",
          colorInfo: "#6e6e6e",
        },
        components: {
          Input: {
            paddingInline: 2,
            paddingBlock: 2,
          },
        },
      }}
    >
      <Form
        form={form}
        onFinish={onSubmit}
        initialValues={character.data_fields}
      >
        <SchemaHeader saved={saved} getValues={form.getFieldsValue()} />

        <SheetLayout schema={schema}>
          {schema.sections.map((section) => (
            <div key={section.title} className="">
              <SectionRender section={section} form={form} />
            </div>
          ))}
        </SheetLayout>
      </Form>
    </ConfigProvider>
  );
}
