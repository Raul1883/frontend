import ReactMarkdown from "react-markdown";
import Modal from "../../../../components/Modal";
import remarkGfm from "remark-gfm";
import { useState } from "react";
import "../../../../css/markdown.css";

interface buildingData {
  name: string;
  level: number;
  description: string;
  img?: string;
}

const levelToBills = [1, 3, 5, 7, 9];

export default ({ data }: { data: buildingData }) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  return (
    <div className="bg-gray-300 rounded-md w-70 flex items-center flex-col pb-6">
      <div className="flex gap-4 items-center my-2 text-xl font-bold">
        <h2 className="">{data.name}</h2>
        <p className="">{data.level}lvl</p>
      </div>
      <img
        className="h-40 w-auto m-2"
        src={data.img}
      />
      <button
        onClick={() => {
          setIsModalOpen(true);
        }}
        className="font-bold border rounded-md px-4 py-2 hover:shadow-xl"
      >
        Подробнее
      </button>

      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
        }}
        className="w-[60%] max-w-[90vw] max-h-[80vh] overflow-y-auto"
      >
        <h1 className="text-xl font-bold ">{data.name}</h1>
        <div className="flex flex-col gap-2">
          <p className="text-gray-500">
            Купчих для улучшения: {levelToBills[data.level]}
          </p>
          <div className="markdown-body">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {data.description}
            </ReactMarkdown>
          </div>
        </div>
      </Modal>
    </div>
  );
};
