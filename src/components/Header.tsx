import { Layout, Menu, Typography } from "antd";
import { Link, useLocation } from "react-router-dom";
import { AuthButton } from "./AuthButton";

export default () => {
  const { Header } = Layout;
  const location = useLocation();

  const items = [
    { key: "sessions", label: <Link to="/sessions">Игры</Link> },
    { key: "characters", label: <Link to="/characters">Персонажи</Link> },
    { key: "tools", label: <Link to="/tools">Инструменты</Link> },
    { key: "manage", label: <Link to="/manage">Мастерская</Link> },
    { key: "exit", label: <AuthButton /> },
  ];

  return (
    <Layout className="mt-4">
      <Header
        style={{
          display: "flex",
          background: "white",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h1 className="text-3xl font-bold">
          <Link to="/">TTR manager</Link>
        </h1>

        <Menu
          mode="horizontal"
          defaultSelectedKeys={[location.pathname.substring(1)]}
          items={items}
          style={{
            border: "none",
          }}
        />
      </Header>
    </Layout>
  );
};
