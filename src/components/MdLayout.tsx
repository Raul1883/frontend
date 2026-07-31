import { Link } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkCallouts from "remark-callouts";
import { remarkWikiLinks } from "../utils/remarkWikiLinks";

export default ({ content }: { content: string }) => {
  return (
    <div className="markdown-body">
      <ReactMarkdown
        remarkPlugins={[remarkGfm, remarkWikiLinks, remarkCallouts]}
        components={{
          a: ({ href, children, ...props }) => {
            if (!href) return <span {...props}>{children}</span>;

            const decodedHref = decodeURIComponent(href);

            const isExternal =
              decodedHref.startsWith("http://") || href.startsWith("https://");

            if (!isExternal) {
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
        {content}
      </ReactMarkdown>
    </div>
  );
};
