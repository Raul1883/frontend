import React, { useMemo } from "react";
import useSWR from "swr";
import { SidebarNode } from "./SidebarNode";
import { buildTree } from "./treeBuilder";
import axiosInstance from "../../../API/AxiosInstance";

interface NodeListResponse {
  pages: string[];
}

const fetcher = (url: string) =>
  axiosInstance.get<NodeListResponse>(url).then((res) => res.data.pages);

export const WikiSidebar: React.FC = () => {
  const {
    data: paths,
    error,
    isLoading,
  } = useSWR("/wiki", fetcher, {
    revalidateOnFocus: false,
    dedupingInterval: 60000,
  });

  const treeData = useMemo(() => {
    if (!paths) return [];
    return buildTree(paths);
  }, [paths]);

  const containerStyle = "w-[20%] min-w-[20%] border-r-4 p-x-2 overflow-y-auto h-screen"

  if (isLoading)
    return <div className={containerStyle}>Загрузка оглавления...</div>;
  if (error)
    return (
      <div className={containerStyle}>Ошибка загрузки структуры вики</div>
    );
  if (!paths || paths.length === 0) return <div className={containerStyle}>Вики пуста</div>;

  return (
    <aside className={containerStyle}>
      <div className="flex flex-col gap-y-2">
        {treeData.map((rootNode, index) => (
          <SidebarNode key={index} node={rootNode} />
        ))}
      </div>
    </aside>
  );
};
