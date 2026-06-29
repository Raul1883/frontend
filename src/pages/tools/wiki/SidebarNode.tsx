import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import type { ITreeNode } from "./treeBuilder";

interface SidebarNodeProps {
  node: ITreeNode;
}

export const SidebarNode: React.FC<SidebarNodeProps> = ({ node }) => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const isActive = node.id
    ? decodeURIComponent(location.pathname).endsWith(node.id)
    : false;

  const toggleOpen = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsOpen(!isOpen);
  };

  if (node.isFolder) {
    return (
      <div style={{ marginLeft: "12px", userSelect: "none" }}>
        {/* Кнопка папки */}
        <div
          onClick={toggleOpen}
          style={{
            cursor: "pointer",
            padding: "4px 8px",
            display: "flex",
            alignItems: "center",
            gap: "6px",
            fontWeight: "500",
          }}
        >
          <span>{isOpen ? "-" : "+"}</span>
          <span>{node.name}</span>
        </div>

        {/* Рекурсивный рендеринг детей, если папка открыта */}
        {isOpen && node.children && (
          <div style={{ borderLeft: "1px solid #ccc" }}>
            {node.children.map((childNode, index) => (
              <SidebarNode key={index} node={childNode} />
            ))}
          </div>
        )}
      </div>
    );
  }

  // Рендеринг конечного файла (ссылки)
  return (
    <div style={{ marginLeft: "12px" }}>
      <Link
        to={`/tools/wiki/${encodeURIComponent(node.id!)}`}
        style={{
          display: "block",
          padding: "4px 8px",
          textDecoration: "none",
          color: isActive ? "#000000" : "#333",
          fontWeight: isActive ? "bold" : "normal",
          borderRadius: "4px",
        }}
      >
        {node.name}
      </Link>
    </div>
  );
};
