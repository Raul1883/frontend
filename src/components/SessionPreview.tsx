import { Link } from "react-router-dom";
import type { SessionGet } from "../types/Session";
import type { JSX } from "react";
import Modal from "./Modal";
import useSWR from "swr";
import { getById } from "../API/Fetcher";
import { getApplicationsCount } from "../API/Applications";
import type { ApplicationCount } from "../types/Application";

type previewProps = {
  session: SessionGet;
  master?: boolean;
  handleDelete?: (id: number) => void;
};


export default (props: previewProps) => {
  const { data, isLoading, error } = useSWR<ApplicationCount>(
    props.session.id.toString(),
    getApplicationsCount,
  );

  if (isLoading || error || !data) return <></>;

  const number = data.count.toString();

  const masterButtons: JSX.Element = (
    <div>
      <Link
        to={`/manage/sessions/${props.session.id}`}
        className="text-xl font-bold mt-2 border-2 px-4 py-2"
      >
        Изменить
      </Link>
      <button
        onClick={() => {
          if (props.handleDelete) props.handleDelete(props.session.id);
        }}
        className="text-xl font-bold mt-2 border-2 ml-4 px-4 py-2"
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
    <div className="border sm:w-[25%] w-[33%] py-4 px-6">
      <h1>
        <span className="text-5xl font-bold">{number}</span> заявки
      </h1>
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
