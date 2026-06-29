export interface ITreeNode {
  name: string;
  id: string | null; // null для папок, строка-путь для файлов
  isFolder: boolean;
  children: ITreeNode[];
}

export function buildTree(paths: string[]): ITreeNode[] {
  const root: { children: Record<string, any> } = { children: {} };

  paths.forEach((path) => {
    const parts = path.split("/");
    let current = root;

    parts.forEach((part, index) => {
      const isLast = index === parts.length - 1;

      if (!current.children[part]) {
        current.children[part] = {
          name: isLast ? part.replace(".md", "") : part,
          id: isLast ? path : null,
          isFolder: !isLast,
          children: isLast ? null : {},
        };
      }
      current = current.children[part];
    });
  });

  // Рекурсивно превращаем Record<string, Node> в отсортированный массив ITreeNode[]
  const convertToArray = (nodeChildren: Record<string, any>): ITreeNode[] => {
    if (!nodeChildren) return [];

    return Object.values(nodeChildren)
      .map((node) => ({
        name: node.name,
        id: node.id,
        isFolder: node.isFolder,
        children: convertToArray(node.children),
      }))
      .sort((a, b) => {
        // Сортировка: папки идут первыми, затем файлы по алфавиту
        if (a.isFolder && !b.isFolder) return -1;
        if (!a.isFolder && b.isFolder) return 1;
        return a.name.localeCompare(b.name);
      });
  };

  return convertToArray(root.children);
}
