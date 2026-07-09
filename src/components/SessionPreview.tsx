import { Link } from "react-router-dom";
import type { SessionGet } from "../types/Session";
import { useState, type JSX } from "react";
import useSWR from "swr";
import { getApplicationsPreviewData } from "../API/Applications";
import type { ApplicationDataItem } from "../types/Application";
import { Button, Card, Popover, Tag, Space, Typography } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

type PreviewProps = {
  session: SessionGet;
  master?: boolean;
  handleDelete?: (id: number) => void;
};

export default (props: PreviewProps) => {
  const { data, isLoading, error } = useSWR<ApplicationDataItem[]>(
    props.session.id.toString(),
    getApplicationsPreviewData,
  );

  if (isLoading || error || !data) return null;

  const number = data.length;

  // Контент всплывающего окна со списком участников
  const popoverContent = (
    <div style={{ minWidth: 200 }}>
      <Typography.Title level={5} style={{ marginBottom: 8 }}>
        Участники:
      </Typography.Title>
      <ul style={{ listStyle: "disc", paddingLeft: 20, marginBottom: 0 }}>
        {data.map((item, idx) => (
          <li key={idx}>
            <Typography.Text>
              {item.login}. {item.contact_info}
            </Typography.Text>
          </li>
        ))}
      </ul>
    </div>
  );

  const masterButtons = [
    <Link to={`/manage/sessions/${props.session.id}`}>
      <Button type="primary" icon={<EditOutlined />}>
        Изменить
      </Button>
    </Link>,
    <Button
      danger
      icon={<DeleteOutlined />}
      onClick={() => {
        if (props.handleDelete) props.handleDelete(props.session.id);
      }}
    >
      Удалить
    </Button>,
  ];
  const userButtons = [
    <Link to={`/sessions/${props.session.id}`}>
      <Button type="primary" block>
        Узнать больше
      </Button>
    </Link>,
  ];

  return (
    <Card
      style={{
        width: "100%",
        maxWidth: 320,
        marginBottom: 16,
      }}
      actions={props.master ? masterButtons : userButtons}
      extra={
        <Popover
          content={popoverContent}
          trigger="hover"
          placement="bottomLeft"
        >
          <Typography.Title level={4}>{number} заявки</Typography.Title>
        </Popover>
      }
      title={
        <Typography.Title level={4}>{props.session.title}</Typography.Title>
      }
    >
      {props.session.description ? (
        <Typography.Text>
          {props.session.description.substring(0, 100)}...
        </Typography.Text>
      ) : null}
      <Space size="small" wrap style={{ marginBottom: 8, marginTop: 8 }}>
        <Tag color="blue">{props.session.genre.text}</Tag>
        <Tag color="green">{props.session.system.text}</Tag>
        <Tag color="orange">{props.session.company?.title || "OneShot"}</Tag>
      </Space>
    </Card>
  );
};
