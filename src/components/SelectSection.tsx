import useSWR from "swr";
import { getAll } from "../API/Fetcher";

type SelectItem = {
  id: number;
  text: string;
};

type SelectData = {
  title: string;
  default: SelectItem;
  path: string;
};

export default (selectData: SelectData) => {
  const { data, isLoading, error } = useSWR<SelectItem[]>(
    selectData.path,
    getAll,
  );

  const default_id = selectData.default.id.toString();
  const default_text = selectData.default.text;

  if (isLoading || data == undefined)
    return (
      <div>
        <h3>{default_text}</h3>
        <select id={default_id}>
          <option id={default_id}>{default_text}</option>
        </select>
      </div>
    );
  if (error) return <div>чтоо-то пошло не так</div>;

  return (
    <div className="w-[30%]">
      <h3 className="text-l font-bold pl-2 mb-1">{selectData.title}</h3>
      <select id={default_id} className="border-4 py-2 w-full rounded-lg indent-2">
        <option className="" key={default_id} id={default_id}>
          {default_text}
        </option>
        {data.map((item) => (
          <option key={item.id} id={item.id.toString()}>
            {item.text}
          </option>
        ))}
      </select>
    </div>
  );
};
