import Header from "../../../components/Header";
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
    <div>
      <Header />
      <Menu menuItems={items} />
    </div>
  );
};
