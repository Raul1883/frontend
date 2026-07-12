import type { SessionGet } from "../../types/Session";
import useSWR from "swr";
import { getApplicationsPreviewData } from "../../API/Applications";
import type { ApplicationDataItem } from "../../types/Application";
import { EditOutlined, DeleteOutlined, UserOutlined } from "@ant-design/icons";
import NavButton from "../../components/NavButton";
import Typography from "antd/es/typography";
import Button from "antd/es/button";
import Card from "antd/es/card";
import Popover from "antd/es/popover";
import Tag from "antd/es/tag";
import Space from "antd/es/space";
import { Avatar, Badge } from "antd";

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

  const popoverContent =
    data.length != 0 ? (
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
    ) : (
      <div style={{ minWidth: 200 }}>
        <Typography.Title level={5} style={{ marginBottom: 8 }}>
          Пока нет участников
        </Typography.Title>
      </div>
    );

  const masterButtons = [
    <NavButton
      to={`/manage/sessions/${props.session.id}`}
      type="primary"
      icon={<EditOutlined />}
    >
      Изменить
    </NavButton>,
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
    <NavButton to={`/sessions/${props.session.id}`}>Узнать больше</NavButton>,
  ];

  return (
    <Card
      style={{
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
          <Badge count={number} color="#71bc78">
            <Avatar shape="square" icon={<UserOutlined />} />
          </Badge>
        </Popover>
      }
      title={
        <Typography.Title level={4} style={{ whiteSpace: "normal" }}>
          {props.session.title}
        </Typography.Title>
      }
    >
      {props.session.description ? (
        <Typography.Text>
          {props.session.description.substring(0, 100)}...
        </Typography.Text>
      ) : null}
      <Space size="small" wrap style={{ marginBottom: 8, marginTop: 8 }}>
        <Tag>{props.session.genre.text}</Tag>
        <Tag>{props.session.system.text}</Tag>
        <Tag>{props.session.company?.title || "OneShot"}</Tag>
      </Space>
    </Card>
  );
};
