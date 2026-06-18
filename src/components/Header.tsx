import { Link, useNavigate } from "react-router-dom";
import { AuthButton } from "./AuthButton";
import { RoleGuard } from "../utils/RoleGuard";

interface headerProps {
  compact?: boolean;
  backLinkPath?: string;
}

export default (props: headerProps) => {
  const liStyle = "hover:border-b-2";
  const navigate = useNavigate();

  if (props.compact) {
    return (
      <div className="bg-white flex justify-between px-10 h-10 items-center border-b-2 text-xl ">
        <Link to="/sessions">Игры</Link>
        <Link to="/characters">Персонажи</Link>
        <Link to="/tools">Инструменты</Link>
        <RoleGuard allowedRoles={["master"]}>
          <Link to="/manage">Мастерская</Link>
        </RoleGuard>
        <button
          onClick={() => {
            if (props.backLinkPath) navigate(props.backLinkPath);
            else navigate(-1);
          }}
        >
          Назад
        </button>
      </div>
    );
  }
  return (
    <header className="p-6 flex justify-between items-start border-b-4">
      <div className="font-bold text-2xl flex flex-col gap-1">
        <span>TTR</span>
        <span>Manager</span>
        <div className="h-1 w-[50%] bg-black mt-3"></div>
      </div>

      <nav>
        <ul className="flex gap-6 list-none font-bold text-sm no-underline ml-auto">
          <li className={liStyle}>
            <Link to="/sessions">Игры</Link>
          </li>
          <li className={liStyle}>
            <Link to="/characters">Персонажи</Link>
          </li>
          <li className={liStyle}>
            <Link to="/tools">Инструменты</Link>
          </li>
          <RoleGuard allowedRoles={["master"]}>
            <li className={liStyle}>
              <Link to="/manage">Мастерская</Link>
            </li>
          </RoleGuard>
          <li className={liStyle}>
            <AuthButton />
          </li>
        </ul>
      </nav>
    </header>
  );
};
