import SessionsList from "../Sessions/SessionsList";
import MainLayout from "../../components/MainLayout";
import NavButton from "../../components/NavButton";
import { Space } from "antd";

export default () => {
  return (
    <MainLayout>
      <Space vertical>
        <NavButton to="new" >Создать</NavButton>
        <SessionsList master={true} />
      </Space>
    </MainLayout>
  );
};
