import useSWR from "swr";
import axiosInstance from "../../../API/AxiosInstance";
import { useParams, Link } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkCallouts from "remark-callouts";
import "../../../css/markdown.css";
import { remarkWikiLinks } from "../../../utils/remarkWikiLinks";
import { Empty, Skeleton } from "antd";

interface DocumentResponse {
  title: string;
  content: string;
}

const fetcher = (url: string) =>
  axiosInstance.get<DocumentResponse>(url).then((res) => res.data);

export default () => {
  const { id } = useParams<{ id: string }>();

  const decodedId = id ? decodeURIComponent(id) : null;

  const { data, error, isLoading } = useSWR(
    decodedId ? `/wiki/${encodeURIComponent(decodedId)}` : null,
    fetcher,
  );

  if (isLoading || error) return <Skeleton active />;

  if (!id || !data?.content)
    return <Empty description="Пусто!" className="pt-10" />;

  return (
    <div className="markdown-body mx-8 mt-4 max-w-[80%] w-250">
      <ReactMarkdown
        remarkPlugins={[remarkGfm, remarkWikiLinks, remarkCallouts]}
        components={{
          a: ({ href, children, ...props }) => {
            if (!href) return <span {...props}>{children}</span>;

            // Декодируем ссылку, чтобы точно работать с понятным текстом
            const decodedHref = decodeURIComponent(href);

            // Проверяем: если ссылка начинается с http/https — она внешняя
            const isExternal =
              decodedHref.startsWith("http://") || href.startsWith("https://");

            if (!isExternal) {
              // Все внутренние ссылки (начинаются с /wiki или просто с названия статьи)
              // пускаем через Link без перезагрузки страницы и в той же вкладке
              return (
                <Link
                  to={href} // Передаем оригинальный (закодированный) href для роутера
                  {...props}
                  className="text-blue-500 hover:underline"
                >
                  {children}
                </Link>
              );
            }

            return (
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:underline"
                {...props}
              >
                {children}
              </a>
            );
          },
        }}
      >
        {data?.content || "Документ пуст"}
      </ReactMarkdown>
    </div>
  );
};
