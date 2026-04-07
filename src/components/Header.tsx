import { Link } from "react-router-dom";
import { AuthButton } from "./AuthButton";
import { RoleGuard } from "../utils/RoleGuard";

export default () => {
  const liStyle = "hover:border-b-2";
  return (
    <header className="p-6 flex justify-between items-start border-b-4">
      <div className="font-bold text-2xl flex flex-col gap-1">
        <span>TTR</span>
        <span>Manager</span>
        <div className="h-1 w-[50%] bg-black mt-3"></div>
      </div>

      <nav>
        <ul className="flex gap-6 list-none font-bold text-sm no-underline">
          <li className={liStyle}>
            <Link to="/sessions">Игры</Link>
          </li>
          <li className={liStyle}>
            <Link to="/">Персонажи</Link>
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
