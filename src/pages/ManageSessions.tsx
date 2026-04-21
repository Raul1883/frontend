import { Link } from "react-router-dom";
import SessionsList from "../components/SessionsList";

export default () => {
  return (
    <div className="">
      <div className="flex flex-row">

        <Link to="/manage" className="flex items-center gap-2 transition-colors pl-4">
          <span>←</span> Назад на главную
        </Link>

        <h1 className="text-2xl font-bold text-center mt-4 w-full">
          Управление сессиями
        </h1>

      </div>
      
      <div className="p-5 border">
        <Link to="new" className="text-xl ">
          Создать
        </Link>
        <SessionsList master={true} />
      </div>
    </div>
  );
};
