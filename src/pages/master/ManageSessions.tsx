import { Link } from "react-router-dom";
import SessionsList from "../Sessions/SessionsList";
import ManageHeader from "./ManageHeader";

export default () => {
  return (
    <div className="">
      <ManageHeader title="Управление сессиями" />
      <div className="h-4"></div>
      <div className="">
        <Link to="new" className=" flex mb-4 ">
          <span className="mr-4 px-3 py-2  text-2xl border hover:rounded-md hover:shadow-xl">Создать</span>
        </Link>
        <SessionsList master={true} />
      </div>
    </div>
  );
};
