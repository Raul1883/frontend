import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import useSWR from "swr";
import type { SessionGet } from "../../types/Session";
import {
  Button,
  Card,
  Divider,
  Flex,
  Space,
  Tag,
  Typography,
  Alert,
} from "antd";
import MainLayout from "../../components/MainLayout";
import { ApplySessionModal } from "./ApplySessionModal";
import { pb } from "../../API/PocketBase";

export default () => {
  const { id } = useParams<{ id: string }>();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const {
    data: sessionData,
    error: sessionError,
    isLoading: isSessionLoading,
    mutate: mutateSession,
  } = useSWR<SessionGet>(id ? ["sessions", id] : null, ([url, targetId]) =>
    pb
      .collection(url)
      .getOne(targetId as string, { expand: "company,genre,system,master" }),
  );

  if (sessionError) {
    return (
      <MainLayout>
        <div className="flex justify-center mt-10">
          <Alert
            type="error"
            title="Ошибка"
            description="Ошибка загрузки данных. Попробуйте позже."
            showIcon
          />
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="flex flex-col items-center mt-10">
        <Card className="w-4xl p-6" loading={isSessionLoading || !sessionData}>
          {sessionData && (
            <>
              <Flex justify="space-between" align="center">
                <Typography.Title level={2} className="mb-4">
                  {sessionData.title}
                </Typography.Title>
                <Space size="large">
                  <Tag>{sessionData.expand.genre.name}</Tag>
                  <Tag>{sessionData.expand.system.name}</Tag>
                  <Tag>{sessionData.expand.company.name}</Tag>
                  <Tag>{sessionData.scheduled_at}</Tag>
                  <Tag>{sessionData.expand.master.login}</Tag>
                </Space>
                <Button type="dashed">
                  <Link to="/sessions">Закрыть</Link>
                </Button>
              </Flex>

              <Divider />
              <p>{sessionData.description ? sessionData.description : "Мастер игры ещё не составил описания, но наверняка будет крайне интересно."}</p>
              <Divider />

              <Button type="primary" onClick={() => setIsModalOpen(true)}>
                Хочу играть!
              </Button>
            </>
          )}
        </Card>

        {id && (
          <ApplySessionModal
            open={isModalOpen}
            sessionId={id}
            onClose={() => setIsModalOpen(false)}
            onSuccess={() => mutateSession()}
          />
        )}
      </div>
    </MainLayout>
  );
};
