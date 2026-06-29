import { visit } from "unist-util-visit";
import type { Node } from "unist";

// Регулярка ловит [[Имя статьи]] и [[Путь/Статья|Отображаемый Текст]]
const WIKI_LINK_REGEX = /\[\[([^\]|]+)(?:\|([^\]]+))?\]\]/g;

export function remarkWikiLinks() {
  return (tree: Node) => {
    visit(tree, "text", (node: any, index, parent: any) => {
      const value = node.value;
      const matches = [...value.matchAll(WIKI_LINK_REGEX)];

      if (matches.length === 0) return;

      const children: any[] = [];
      let lastIndex = 0;

      matches.forEach((match) => {
        const matchIndex = match.index ?? 0;

        if (matchIndex > lastIndex) {
          children.push({
            type: "text",
            value: value.slice(lastIndex, matchIndex),
          });
        }

        const targetPath = match[1].trim(); // Куда ведет ссылка
        const displayText = match[2] ? match[2].trim() : targetPath; // Что отображать

        children.push({
          type: "link",
          url: `/tools/wiki/${encodeURIComponent(targetPath)}`,
          children: [{ type: "text", value: displayText }],
        });

        lastIndex = matchIndex + match[0].length;
      });

      if (lastIndex < value.length) {
        children.push({ type: "text", value: value.slice(lastIndex) });
      }

      parent.children.splice(index, 1, ...children);
    });
  };
}
