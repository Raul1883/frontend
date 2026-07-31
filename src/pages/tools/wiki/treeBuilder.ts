import type { TreeDataNode } from "antd";
import type { WikiRecord } from "./types";

// Временный интерфейс для построения сырого дерева
interface RawBuilderNode {
  title: string;
  isLeaf: boolean;
  key: string; // нужен, чтобы гарантировать уникальность ключа папки
  slug: string;
  children: Record<string, RawBuilderNode>;
}

export function buildAntdTree(records: WikiRecord[]): TreeDataNode[] {
  // 1. Создаем корневой объект сборщика
  const rootChildren: Record<string, RawBuilderNode> = {};

  records.forEach((record) => {
    const parts = record.slug.split("/");
    let currentChildren = rootChildren;

    parts.forEach((part) => {
      if (!currentChildren[part]) {
        currentChildren[part] = {
          title: record.title,
          isLeaf: !record.isFolder,
          key: record.id,
          slug: record.slug,
          children: {},
        };
      }

      currentChildren = currentChildren[part].children;
    });
  });

  // 2. Рекурсивная функция для конвертации во внутренний формат Antd и сортировки
  const convertAndSort = (
    childrenMap: Record<string, RawBuilderNode>,
  ): TreeDataNode[] => {
    const nodes = Object.values(childrenMap);
    if (nodes.length === 0) return [];

    return nodes
      .map((node) => {
        // Для файлов делаем привычный url-путь, для папок — уникальный внутренний fullPath
        const key = node.key;

        const hasChildren = Object.keys(node.children).length > 0;

        return {
          title: node.title,
          key: key,
          isLeaf: node.isLeaf,
          slug: node.slug,
          children: hasChildren ? convertAndSort(node.children) : undefined,
        };
      })
      .sort((a, b) => {
        if (!a.isLeaf && b.isLeaf) return -1;
        if (a.isLeaf && !b.isLeaf) return 1;
        return (a.title as string).localeCompare(b.title as string);
      });
  };

  return convertAndSort(rootChildren);
}
