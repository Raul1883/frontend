import { Link } from "react-router-dom";
import { menuItems } from "./MasterPanel";

interface ManageHeaderProps {
  title: string;
}

export default (props: ManageHeaderProps) => {
  return (
    <div className="border">
      <div className="flex items-center justify-center w-full h-20 border">
        <h1 className="text-4xl font-bold text-center ">{props.title}</h1>
      </div>
      <div className="w-full h-full border flex justify-between text-2xl">
        <Link
          to="/manage"
          className="flex w-full  items-center justify-center transition hover:bg-gray-100"
        >
          <span className="w-full font-bold text-slate-800 text-center ">
            Назад
          </span>
        </Link>
        {menuItems.map((item) => (
          <Link
            key={item.title}
            to={item.path}
            className="flex items-center justify-center w-full border-l-2 transition hover:bg-gray-100"
          >
            <h2 className="font-bold text-slate-800 text-center">
              {item.title}
            </h2>
          </Link>
        ))}
      </div>
    </div>
  );
};
