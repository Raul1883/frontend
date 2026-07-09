import React, { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import useSWR from "swr";
import { getAll, getById } from "../API/Fetcher";
import type { SessionGet } from "../types/Session";
import type { CharacterGet } from "../types/Character";
import { createApplications } from "../API/Applications";
import {
  Button,
  Card,
  Descriptions,
  Divider,
  Flex,
  Input,
  Space,
  Tag,
  Typography,
  Modal,
  type DescriptionsProps,
  Alert,
  Select,
} from "antd";
import Header from "../components/Header";

export default () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(true);
  const [commentText, setCommentText] = useState<string>("");
  const [selectedCharacterId, setSelectedCharacterId] = useState<number>(0);
  const [error, setError] = useState<string>("");

  const {
    data: sessionData,
    error: sessionError,
    isLoading: isSessionLoading,
  } = useSWR<SessionGet>(id ? ["/sessions", id] : null, ([url, targetId]) =>
    getById<SessionGet>(url as string, Number(targetId)),
  );

  const { data: characterData, isLoading: isCharacterLoading } = useSWR<
    CharacterGet[]
  >("/characters", getAll);

  if (sessionError || isSessionLoading || !sessionData) {
    return <div>Загрузка или ошибка или хз попробуйте позже</div>;
  }

  const handleCommentText = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setCommentText(e.target.value);
  };

  const handleCharacterChange = (charId: number) => {
    setSelectedCharacterId(charId);
  };

  const handleSubmit = async () => {
    console.log(commentText);
    if (characterData?.length == 0) {
      navigate("/characters");
    }

    if (!selectedCharacterId) {
      setError("Выберите персонажа");
      return;
    }

    setError("");

    try {
      const applicationData = {
        session_id: Number(id),
        character_id: selectedCharacterId,
        comment: commentText || "",
      };

      await createApplications(applicationData);

      setIsModalOpen(false);
      setCommentText("");
      setSelectedCharacterId(0);
      
      Modal.success({
        content: 'Заявка успешно отправлена!',
      })


    } catch (err) {
      setError("Ошибка при отправке заявки. Попробуйте позже.");
      console.error(err);
    } finally {
    }
  };

  const onClose = () => {
    setIsModalOpen(false);
    setError("");
    setSelectedCharacterId(0);
    setCommentText("");
  };

  return (
    <>
      <Header />
      <div className="flex flex-col items-center mt-10">
        <Card className="w-4xl  p-6">
          <Flex justify="space-between" align="center">
            <Typography.Title level={2} className="mb-4">
              {sessionData.title}
            </Typography.Title>
            <Space size="large">
              <Tag color="volcano">{sessionData.genre.text}</Tag>
              <Tag color="green">{sessionData.system.text}</Tag>
              <Tag color="orange">
                {sessionData.company?.title || "OneShot"}
              </Tag>
              <Tag color="purple">{sessionData.scheduled_at}</Tag>
              <Tag color="blue">{sessionData.master.login}</Tag>
            </Space>
          </Flex>

          <Divider />
          <p>{sessionData.description}</p>
          <Divider />

          <Button onClick={() => setIsModalOpen(true)}>Хочу играть!</Button>
        </Card>
        <Modal
          open={isModalOpen}
          onCancel={onClose}
          onOk={handleSubmit}
          closeIcon={false}
          title="Новая заявка"
        >
          {/* Селект персонажа */}

          {characterData?.length == 0 ? (
            <Alert
              type="info"
              title="Упс!"
              description="Кажется, у вас нет ни одного персонажа! Создайте нового и снова возвращайтесь сюда!"
            />
          ) : (
            <Space vertical style={{ width: "100%" }}>
              <label className="block text-sm font-medium text-gray-700">
                Выберите персонажа *
              </label>

              <Select
                allowClear
                disabled={isCharacterLoading}
                loading={isCharacterLoading}
                placeholder="Персонаж"
                onChange={handleCharacterChange}
                options={characterData?.map((character) => ({
                  value: character.id,
                  label: character.name,
                }))}
              />

              <label className="block text-sm font-medium text-gray-700 mb-2">
                Комментарий (необязательно)
              </label>
              <Input.TextArea
                autoSize={true}
                allowClear
                placeholder="Есть идеи?"
                value={commentText}
                onChange={handleCommentText}
              />
              {error && <Alert title={error} type="error" showIcon />}
            </Space>
          )}
        </Modal>
      </div>
    </>
  );
};
