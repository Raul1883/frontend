import { Link } from "react-router-dom";
import type { SessionGet } from "../types/Session";
import { useState, type JSX } from "react";
import useSWR from "swr";
import { getApplicationsPreviewData } from "../API/Applications";
import type { ApplicationDataItem } from "../types/Application";

type previewProps = {
  session: SessionGet;
  master?: boolean;
  handleDelete?: (id: number) => void;
};

export default (props: previewProps) => {
  const { data, isLoading, error } = useSWR<ApplicationDataItem[]>(
    props.session.id.toString(),
    getApplicationsPreviewData,
  );

  const [isPopoverOpen, setIsPopoverOpen] = useState<boolean>(false);

  if (isLoading || error || !data) return <></>;
  const number = data.length;

  const btnStyle = "text-xl font-bold border-2 px-4 py-2";
  const masterButtons: JSX.Element = (
    <div className="flex gap-2">
      <Link to={`/manage/sessions/${props.session.id}`} className={btnStyle}>
        Изменить
      </Link>
      <button
        onClick={() => {
          if (props.handleDelete) props.handleDelete(props.session.id);
        }}
        className={btnStyle}
      >
        Удалить
      </button>
    </div>
  );

  const userButtons: JSX.Element = (
    <div className="flex w-full">
      <Link
        to={`${props.session.id}`}
        className="text-xl w-[95%] font-bold mt-2 border-2 px-4 py-2"
      >
        Узнать больше
      </Link>
    </div>
  );

  return (
    <div className="border sm:w-[25%] w-[33%] py-4 px-6 relative">
      <div
        className="cursor-pointer px-4 inline-block relative"
        onMouseEnter={() => setIsPopoverOpen(true)}
        onMouseLeave={() => setIsPopoverOpen(false)}
      >
        <span className="text-5xl font-bold">{number}</span> заявки

        {/* Всплывающее окно */}
        {isPopoverOpen && (
          <div
            className="absolute left-0 top-full mt-2 min-w-[200px] bg-white border border-gray-300 rounded shadow-lg p-4 z-10"
            onMouseEnter={() => setIsPopoverOpen(true)}
            onMouseLeave={() => setIsPopoverOpen(false)}
          >
            <h1 className="text-xl font-semibold mb-2">Участники:</h1>
            <ul className="list-disc pl-4">
              {data.map((item, idx) => (
                <li key={idx}>
                  <p>{item.login}. {item.contact_info}</p>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <h1 className="text-2xl font-bold">{props.session.title}</h1>
      <ul className="flex gap-4 pt-4 flex-wrap">
        <li className="font-bold border-2 px-1">{props.session.genre.text}</li>
        <li className="font-bold border-2 px-1">{props.session.system.text}</li>
        <li className="font-bold border-2 px-1">
          {props.session.company?.title || "OneShot"}
        </li>
      </ul>
      <div className="flex mt-2 border-t-2 max-w-95%">
        <span>{props.session.master.login}</span>
        <span className="ml-auto mr-0">{props.session.scheduled_at}</span>
      </div>
      <div className="flex justify-center">
        {props.master ? masterButtons : userButtons}
      </div>
    </div>
  );
};