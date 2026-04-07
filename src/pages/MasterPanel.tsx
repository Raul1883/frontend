import { Link } from "react-router-dom";

const MainMenu = () => {
  const menuItems = [
    {
      title: "Сессии",
      path: "/manage/sessions",
      description: "Управление активными играми",
    },
    {
      title: "Игроки",
      path: "/manage/players",
      description: "Список пользователей и статистика",
    },
    {
      title: "База знаний",
      path: "/manage/knowledge",
      description: "Обучающие материалы",
    },
    {
      title: "Компании",
      path: "/manage/companies",
      description: "Управление игровыми компаниями",
    },
  ];

  return (
    <div className="min-h-screen p-8 flex flex-col items-center justify-center">
      {/* Кнопка назад */}
      <div className="w-full max-w-5xl mb-8">
        <Link to="/" className="flex items-center gap-2 transition-colors ">
          <span>←</span> Назад на главную
        </Link>
      </div>

      {/* Заголовок */}
      <h1 className="text-4xl font-bold text-slate-800 mb-12 text-center">
        Панель управления
      </h1>

      {/* Сетка меню */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full max-w-6xl">
        {menuItems.map((item) => (
          <Link
            key={item.title}
            to={item.path}
            className="group relative bg-white p-8  border hover:shadow-xl  flex flex-col items-start"
          >
            <h2 className="text-xl font-bold text-slate-800 mb-2">
              {item.title}
            </h2>
            <p className="text-slate-500 text-sm leading-relaxed">
              {item.description}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default MainMenu;
