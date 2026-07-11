// Компонент WikiLayout.tsx
import React from "react";
import { Layout, Splitter } from "antd";
import { WikiSidebar } from "./WikiSidebar";
import MainLayout from "../../../components/MainLayout";

const { Content, Sider } = Layout;

export const WikiLayout: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <MainLayout fluid footer={false}>
      <Splitter
        style={{
          background: "#fcf5e4",
          borderRadius: "4px",
          minHeight: "calc(100vh - 56px)",
        }}
      >
        <Splitter.Panel defaultSize="20%">
          <WikiSidebar />
        </Splitter.Panel>
        <Splitter.Panel>
          <Content>{children}</Content>
        </Splitter.Panel>
      </Splitter>
    </MainLayout>
  );

  return (
    <MainLayout fluid footer={false}>
      <Layout style={{ background: "#fcf5e4", borderRadius: "4px" }}>
        <Sider width={250}>
          <WikiSidebar />
        </Sider>
        <Content>{children}</Content>
      </Layout>
    </MainLayout>
  );
};
