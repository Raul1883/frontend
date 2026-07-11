import type { TreeDataNode } from "antd";

// Временный интерфейс для построения сырого дерева
interface RawBuilderNode {
  title: string;
  isLeaf: boolean;
  fullPath: string; // нужен, чтобы гарантировать уникальность ключа папки
  children: Record<string, RawBuilderNode>;
}

/**
 * Преобразует плоский массив путей напрямую в формат TreeDataNode для Ant Design
 * @param paths массив строк вида ['folder/subfolder/page.md', 'root-page.md']
 */
export function buildAntdTree(paths: string[]): TreeDataNode[] {
  // 1. Создаем корневой объект сборщика
  const rootChildren: Record<string, RawBuilderNode> = {};

  paths.forEach((path) => {
    const parts = path.split("/");
    let currentChildren = rootChildren;
    let accumulatedPath = "";

    parts.forEach((part, index) => {
      const isLast = index === parts.length - 1;
      
      // Накапливаем путь для текущего уровня (чтобы ключ папки был уникальным)
      accumulatedPath = accumulatedPath ? `${accumulatedPath}/${part}` : part;

      if (!currentChildren[part]) {
        currentChildren[part] = {
          title: isLast ? part.replace(".md", "") : part,
          isLeaf: isLast,
          fullPath: accumulatedPath,
          children: {},
        };
      }

      currentChildren = currentChildren[part].children;
    });
  });

  // 2. Рекурсивная функция для конвертации во внутренний формат Antd и сортировки
  const convertAndSort = (childrenMap: Record<string, RawBuilderNode>): TreeDataNode[] => {
    const nodes = Object.values(childrenMap);
    if (nodes.length === 0) return [];

    return nodes
      .map((node) => {
        // Для файлов делаем привычный url-путь, для папок — уникальный внутренний fullPath
        const key = node.isLeaf
          ? `/tools/wiki/${encodeURIComponent(node.fullPath)}`
          : `folder://${node.fullPath}`;

        const hasChildren = Object.keys(node.children).length > 0;

        return {
          title: node.title,
          key: key,
          isLeaf: node.isLeaf,
          children: hasChildren ? convertAndSort(node.children) : undefined,
        };
      })
      .sort((a, b) => {
        // Папки всегда идут выше файлов
        if (!a.isLeaf && b.isLeaf) return -1;
        if (a.isLeaf && !b.isLeaf) return 1;
        // Внутри своей группы сортируем по алфавиту
        return (a.title as string).localeCompare(b.title as string);
      });
  };

  return convertAndSort(rootChildren);
}