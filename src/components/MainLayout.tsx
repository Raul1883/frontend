import { Button, Layout, Menu } from "antd";
import { Link, useLocation } from "react-router-dom";
import { AuthButton } from "./AuthButton";

const { Header, Content, Footer } = Layout;

interface LayoutProps {
  children?: React.ReactNode;
  header?: boolean;
  footer?: boolean;
  fluid?: boolean;
}

export default ({
  children,
  header = true,
  footer = true,
  fluid = false,
}: LayoutProps) => {
  const location = useLocation();

  const items = [
    { key: "sessions", label: <Link to="/sessions">Игры</Link> },
    { key: "characters", label: <Link to="/characters">Персонажи</Link> },
    { key: "tools", label: <Link to="/tools">Инструменты</Link> },
    { key: "manage", label: <Link to="/manage">Мастерская</Link> },
    { key: "exit", label: <AuthButton /> },
  ];

  const currentKey = location.pathname.split("/")[1] || "sessions";

  return (
    <Layout style={{ minHeight: "100vh" }}>
      {header && (
        <Header
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            margin: "16px 24px 0 24px",
            padding: "0 24px",
            borderRadius: "4px",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.03)",
            height: "56px",
            lineHeight: "56px",
          }}
        >
          <Button type="text" style={{ height: "auto", padding: 0 }}>
            <Link className="text-3xl font-bold" to="/">
              TTR manager
            </Link>
          </Button>

          <Menu
            mode="horizontal"
            selectedKeys={[currentKey]}
            items={items}
            style={{
              background: "transparent",
              border: "none",
              flexGrow: 1,
              justifyContent: "flex-end",
              marginLeft: "24px",
            }}
          />
        </Header>
      )}

      <Content
        style={
          fluid
            ? {
                width: "100%",

                padding: "24px",
              }
            : {
                padding: "24px",
                maxWidth: "1200px",
                width: "100%",
                margin: "0 auto",
              }
        }
      >
        <div style={{ minHeight: "100%", height: fluid ? "100%" : "auto" }}>
          {children}
        </div>
      </Content>

      {footer && (
        <Footer
          style={{
            textAlign: "center",
            background: "transparent",
          }}
        >
          TTR manager ©2026
        </Footer>
      )}
    </Layout>
  );
};
