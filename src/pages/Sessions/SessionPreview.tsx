import type { ApplicationPayload, SessionGet } from "../../types/Session";
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
  handleDelete?: (id: string) => void;
};

export default (props: PreviewProps) => {
  let data: ApplicationPayload[] = [];

  if (props.session.expand.applications_via_session) {
    data = props.session.expand.applications_via_session;
  } else {
    data = [];
  }

  const number = data.length;

  const popoverContent =
    data.length != 0 && data[0].expand.user ? (
      <div style={{ minWidth: 200 }}>
        <Typography.Title level={5} style={{ marginBottom: 8 }}>
          Участники:
        </Typography.Title>
        <ul style={{ listStyle: "disc", paddingLeft: 20, marginBottom: 0 }}>
          {data.map((item, idx) => (
            <li key={idx}>
              <Typography.Text>
                {item.expand.user.login}. {item.expand.user.contact_info}
              </Typography.Text>
            </li>
          ))}
        </ul>
      </div>
    ) : (
      <div style={{ minWidth: 200 }}>
        <Typography.Title level={5} style={{ marginBottom: 8 }}>
          {!data[0] || data[0].expand.user
            ? "Ещё никто не участвует"
            : "Авторизуйтесь, чтобы увидеть список участников"}
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
        <Tag>{props.session.expand.genre.name}</Tag>
        <Tag>{props.session.expand.system.name}</Tag>
        <Tag>{props.session.expand.company.name}</Tag>
      </Space>
    </Card>
  );
};
