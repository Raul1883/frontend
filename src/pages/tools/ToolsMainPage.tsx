import Header from "../../components/Header";
import Menu, { type menuItem } from "../../components/Menu";

const items: menuItem[] = [
  {
    title: "Гильдия",
    path: "guild",
    description: "Хоумрулы и инструменты для гильдийских ваншотов",
  },
    {
    title: "Wiki",
    path: "wiki",
    description: "Хоумрулы и лор для различных компаний и сеттингов",
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
