import React, { useState } from "react";
import { Card, Button, Modal, Flex, Typography, Popover } from "antd";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const { Title, Text } = Typography;

export interface BuildingData {
  name: string;
  level: number;
  description: string;
  img?: string;
}

const levelToBills = [1, 3, 5, 7, 9];

export default ({ data }: { data: BuildingData }) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  return (
    <>
      <Card
        className="w-70 pb-2"
        cover={
          <img
            alt={data.name}
            src={data.img}
            className="h-40 object-contain p-2"
          />
        }
        title={data.name}
        extra={
          <Popover
            content={
              <Typography.Text>
                Купчих для улучшения: {levelToBills[data.level] ?? 0}
              </Typography.Text>
            }
            trigger="hover"
            placement="bottomLeft"
          >
            lvl {data.level}
          </Popover>
        }
        actions={[
          <Button onClick={() => setIsModalOpen(true)}>Подробнее</Button>,
        ]}
      />

      <Modal
        title={data.name}
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
        width="60%"
        centered
      >
        <Flex
          vertical
          gap="small"
          className="max-h-[70vh] overflow-y-auto pt-2"
        >
          <Text type="secondary">
            Купчих для улучшения: {levelToBills[data.level] ?? 0}
          </Text>
          <div className="markdown-body">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {data.description}
            </ReactMarkdown>
          </div>
        </Flex>
      </Modal>
    </>
  );
};
