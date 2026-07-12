import React, { useMemo } from "react";
import useSWR from "swr";
import { Tree, Spin, Alert, Typography, Skeleton } from "antd";
import { useNavigate, useLocation } from "react-router-dom";
import { FolderOutlined, FileTextOutlined } from "@ant-design/icons";
import axiosInstance from "../../../API/AxiosInstance";
import { buildAntdTree } from "./treeBuilder";

interface NodeListResponse {
  pages: string[];
}

const fetcher = (url: string) =>
  axiosInstance.get<NodeListResponse>(url).then((res) => res.data.pages);

export const WikiSidebar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const {
    data: paths,
    error,
    isLoading,
  } = useSWR("/wiki", fetcher, {
    revalidateOnFocus: false,
    dedupingInterval: 60000,
  });

  // Формируем данные для Antd Tree
  const antdTreeData = useMemo(() => {
    if (!paths) return [];
    return buildAntdTree(paths);
  }, [paths]);

  // Обработка клика по элементу дерева
  const handleSelect = (selectedKeys: React.Key[], info: any) => {
    if (!info.node.isLeaf) return;
    selectedKeys;

    const targetUrl = info.node.key as string;
    navigate(targetUrl);
  };

  // Декодируем pathname для точного сопоставления с key в дереве
  const selectedKey = decodeURIComponent(location.pathname);

  if (!paths || paths.length === 0) {
    return <div>Вики пуста</div>;
  }

  console.log(antdTreeData);

  if (isLoading) {
    return (
      <aside className="overflow-y-auto pt-8">
        <Typography.Title level={4} className="ml-4">
          <Spin />
          {"  TTR wiki"}
        </Typography.Title>
      </aside>
    );
  }

  if (error) {
    return (
      <div>
        <Alert
          description="Не удалось загрузить структуру wiki"
          title="Ошибка!"
          type="error"
          showIcon
        />
      </div>
    );
  }

  return (
    <aside className="overflow-y-auto pt-8">
      <Typography.Title level={4} className="ml-4">
        TTR wiki
      </Typography.Title>

      <Tree
        treeData={antdTreeData}
        selectedKeys={[selectedKey]}
        onSelect={handleSelect}
        showIcon
        expandAction="click"
        icon={(props) =>
          props.isLeaf ? <FileTextOutlined /> : <FolderOutlined />
        }
      />
    </aside>
  );
};
