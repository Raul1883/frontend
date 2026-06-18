import { Link, useNavigate, useParams } from "react-router-dom";
import Header from "../../../../components/Header";
import { useEffect } from "react";
import useSWR from "swr";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import "../../../../css/markdown.css";

const chapters = [
  "Гильдия.md",
  "Мир.md",
  "Княжества.md",
  "Религия.md",
  "Начало приключения.md",
  "Происхождение и начальное снаряжение.md",
  "Расы.md",
  "Классы.md",
  "Город.md",
  "Домашние правила.md",
  "Чтение.md",
  "Критические провалы.md",
  "Оружие.md",
  "Провизия.md",
  "Кузнечка.md",
  "Кулачный бой.md",
  "Травмы.md",
];

const basePath = "/tools/guild/rules/";

const fetcher = async (url: string) => {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Ошибка загрузки: ${res.status}`);
  return res.text();
};

export default () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  useEffect(() => {
    if (!id || id === "") {
      navigate(chapters[0]);
    }
  }, [id, navigate, chapters]);

  const { data, error, isLoading } = useSWR(
    id ? `/guild-rules/${id.toString()}` : null,
    fetcher,
  );

  return (
    <div>
      <div className="flex">
        <div className="fixed w-full">
          <Header compact={true} backLinkPath="/tools/guild" />
        </div>

        <div className="fixed top-10 w-[20%] h-screen border-r-2 flex flex-col overflow-y-scroll sidebar-scroll">
          {chapters.map((x) => (
            <Link
              to={basePath + x}
              className="block border py-2 pl-4"
              key={`key_${x}`}
            >
              {x.slice(0, -3)}
            </Link>
          ))}
        </div>

        <div className="markdown-body mr-20 pl-[22%] mb-8 mt-10 border-l">
          {isLoading || error || !id ? (
            <div>loading</div>
          ) : (
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{data}</ReactMarkdown>
          )}
        </div>
      </div>
    </div>
  );
};
