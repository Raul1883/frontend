import { Divider, Typography } from "antd";
import SessionsList from "../../components/SessionsList";
import MainLayout from "../../components/MainLayout";

export default () => {
  return (
    <MainLayout>
      <Divider>
        <Typography.Title>Сессии</Typography.Title>
      </Divider>

      <div className="w-full max-w-5xl">
        <SessionsList master={false} />
      </div>
    </MainLayout>
  );
};
