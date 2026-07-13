import useSWR from "swr";
import type { SessionGet } from "../../types/Session";
import SessionPreview from "./SessionPreview";
import { deleteById, getAll } from "../../API/Fetcher";
import { Empty, Space, Spin } from "antd";

export default ({ master = false }: { master: boolean }) => {
  const { data, error, isLoading, mutate } = useSWR<SessionGet[]>(
    "/sessions",
    getAll,
  );

  const handleDelete = async (id: number) => {
    const confirmDelete = window.confirm(`Точно?`);
    if (!confirmDelete) return;

    await deleteById(`/sessions`, id);
    await mutate();
  };

  if (isLoading) return <Spin />;

  if (error || !data || data?.length == 0)
    return <Empty description="Нет данных" />;

  return (
    <Space wrap align="start">
      {data?.map((session) => (
        <SessionPreview
          key={session.id}
          session={session}
          master={master}
          handleDelete={handleDelete}
        />
      ))}
    </Space>
  );
};
