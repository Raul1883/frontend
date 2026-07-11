import MainLayout from "../../../components/MainLayout";
import Menu, { type menuItem } from "../../../components/Menu";

const items: menuItem[] = [
  {
    title: "Город",
    path: "city",
    description: "Хоумрулы и инструменты для гильдийских ваншотов",
  },
];

export default () => {
  return (
    <MainLayout>
      <Menu menuItems={items} title="Гильдийские ваншоты" />
    </MainLayout>
  );
};
