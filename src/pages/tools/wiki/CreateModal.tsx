import { Checkbox, Form, Input, Modal } from "antd";
import type { WikiRecord, WikiRecordCreate } from "./types";
import FormItem from "antd/es/form/FormItem";
import { useForm } from "antd/es/form/Form";
import useApp from "antd/es/app/useApp";
import { pb } from "../../../API/PocketBase";
import { useNavigate } from "react-router-dom";

interface ModalProps {
  isModalOpen: boolean;
  closeModal: () => void;
  mutate: () => void;
  slug: string;
}

const validate = (values: WikiRecordCreate) => {
  const parts = values.slug.split("/");
  if (parts[parts.length - 1] != values.title) {
    return false;
  }
  return true;
};

export default ({
  isModalOpen,
  closeModal: setisModalOpen,
  mutate,
  slug
}: ModalProps) => {
  const [form] = useForm();
  const { message } = useApp();
  const navigate = useNavigate();

  const onFinish = async (values: WikiRecordCreate) => {
    if (!validate(values)) {
      message.warning("Название и последний элемент пути должны совпадать");
      return;
    }
    const res = await pb.collection<WikiRecord>("wiki").create(values);
    message.success("Создано!");
    navigate(`/tools/wiki/edit/${res.id}`);
    mutate();
  };

  return (
    <Modal
      open={isModalOpen}
      onCancel={setisModalOpen}
      title="Создать"
      onOk={form.submit}
    >
      <Form onFinish={onFinish} form={form} initialValues={{slug: slug}}>
        <FormItem name="title" label="Название" required>
          <Input />
        </FormItem>
        <FormItem name="slug" label="Путь" required>
          <Input placeholder="папка/папка/файл" />
        </FormItem>
        <FormItem name="isFolder" label="Папка?" valuePropName="checked">
          <Checkbox />
        </FormItem>
      </Form>
    </Modal>
  );
};
