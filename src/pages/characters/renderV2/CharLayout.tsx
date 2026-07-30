import { Button, ConfigProvider, Space, Typography } from "antd";

import { Layout } from "antd";
import NavButton from "../../../components/NavButton";
import Dice from "./Dice";

const { Header, Content } = Layout;

interface CharLayoutProps {
  children?: React.ReactNode;
  systemName: string;
  save: () => void;
  resetLayout: () => void;
  saveJson: () => void;
}

export default ({
  children,
  systemName,
  save,
  resetLayout,
  saveJson,
}: CharLayoutProps) => {
  const theme = {
    token: {
      borderRadius: 2,
      wireframe: false,
      colorPrimary: "#6e6e6e",
      colorInfo: "#6e6e6e",
    },
    components: {
      Input: {
        paddingInline: 1,
        paddingBlock: 2,
      },
      Form: {
        itemMarginBottom: 4,
      },
      Table: {
        cellPaddingBlock: 0,
        cellPaddingInline: 0,

        cellPaddingBlockSM: 0,
        cellPaddingInlineSM: 0,
      },
      Select: {
        controlHeight: 28,
      },
      Layout: {
        headerHeight: 56,
      },
    },
  };

  return (
    <ConfigProvider theme={theme}>
      <Layout style={{ minHeight: "100vh" }}>
        <Header
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            margin: "10px",
            borderRadius: "4px",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.03)",
          }}
        >
          <Space>
            <Button onClick={save}>Сохранить</Button>
            <Button onClick={resetLayout}>Разметка по умолчанию</Button>
            <Button onClick={saveJson}>Скачать json</Button>
            <Dice />
            <NavButton to="/characters">Домой</NavButton>
          </Space>
          <Typography.Title style={{ margin: 0 }}>
            {systemName}
          </Typography.Title>
        </Header>

        <Content>
          <div>{children}</div>
        </Content>
      </Layout>
    </ConfigProvider>
  );
};
