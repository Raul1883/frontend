import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import useSWR from "swr";
import { getById } from "../../API/Fetcher";
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

export default () => {
  const { id } = useParams<{ id: string }>();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const {
    data: sessionData,
    error: sessionError,
    isLoading: isSessionLoading,
    mutate: mutateSession,
  } = useSWR<SessionGet>(id ? ["/sessions", id] : null, ([url, targetId]) =>
    getById<SessionGet>(url as string, Number(targetId)),
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
                  <Tag>{sessionData.genre.text}</Tag>
                  <Tag>{sessionData.system.text}</Tag>
                  <Tag>{sessionData.company?.title || "OneShot"}</Tag>
                  <Tag>{sessionData.scheduled_at}</Tag>
                  <Tag>{sessionData.master.login}</Tag>
                </Space>
                <Button type="dashed">
                  <Link to="/sessions">Закрыть</Link>
                </Button>
              </Flex>

              <Divider />
              <p>{sessionData.description}</p>
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
            sessionId={Number(id)}
            onClose={() => setIsModalOpen(false)}
            onSuccess={() => mutateSession()}
          />
        )}
      </div>
    </MainLayout>
  );
};
