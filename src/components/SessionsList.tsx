import useSWR from "swr";
import type { SessionGet } from "../types/Session";
import SessionPreview from "./SessionPreview";
import { deleteById, getAll } from "../API/Fetcher";

export default ({ master = false }: { master: boolean }) => {
  const { data, error, isLoading, mutate } = useSWR<SessionGet[]>("/sessions", getAll);

  const handleDelete = async (id: number) => {
    const confirmDelete = window.confirm(`Точно?`);
    if (!confirmDelete) return;

    await deleteById(`/sessions`, id)
    await mutate()
  };

  if (error) return <p>error</p>;

  if (isLoading) return <p>loading</p>;

  if (data?.length == 0) return <p>А на сегодня все</p>;

  return (
    <div className="flex flex-wrap">
      {data?.map((session) => (
        <SessionPreview
          key={session.id}
          session={session}
          master={master}
          handleDelete={handleDelete}
        />
      ))}
    </div>
  );
};
