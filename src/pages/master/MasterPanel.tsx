import Header from "../../components/Header";
import Menu from "../../components/Menu";

export const menuItems = [
  {
    title: "Сессии",
    path: "/manage/sessions",
    description: "Управление активными играми",
  },
  {
    title: "Игроки",
    path: "/manage/users",
    description: "Список пользователей и статистика",
  },
  {
    title: "База знаний",
    path: "/manage/knowledge",
    description: "Пока не реализовано",
  },
  // {
  //   title: "Компании",
  //   path: "/manage/companies",
  //   description: "Управление игровыми компаниями",
  // },
  {
    title: "Схемы",
    path: "/manage/schemas",
    description: "Управление шаблонами персонажей",
  },
];

const MainMenu = () => {
  return (
    <div>
      <Header />

      <Menu menuItems={menuItems} />
    </div>
  );
};

export default MainMenu;
