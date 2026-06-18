import { Link } from "react-router-dom";

export interface menuItem {
  title: string;
  path: string;
  description: string;
}

export interface menuItems {
  menuItems: menuItem[];
}

export default (props: menuItems) => {
  return (
    <div>
      <div className=" p-8 flex flex-col items-center ">
        {/* Сетка меню */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full max-w-6xl">
          {props.menuItems.map((item) => (
            <Link
              key={item.title}
              to={item.path}
              className="group relative bg-white p-8  border-2 hover:shadow-xl  flex flex-col items-start"
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
    </div>
  );
};
