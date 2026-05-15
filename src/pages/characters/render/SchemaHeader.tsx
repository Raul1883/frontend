import { useNavigate } from "react-router-dom";
import DownloadJSON from "../../../utils/DownloadJSON";
import type { FieldValues, UseFormGetValues } from "react-hook-form";
import { useState } from "react";
import Modal from "../../../components/Modal";
import HelpChar from "./HelpChar";

interface SchemaHeaderProps {
  saved: boolean;
  getValues: UseFormGetValues<FieldValues>;
}

export default (props: SchemaHeaderProps) => {
  const navigate = useNavigate();
  const [isModal, setIsModal] = useState<boolean>(false);

  return (
    <div className="flex gap-4 pl-4 mt-2">
      <button type="submit" className="relative inline-flex items-center">
        <img className="w-7" src="/src/assets/save-floppy-svgrepo-com.svg" />
        {props.saved && (
          <div className="absolute -top-1 -right-1 w-4 h-4 flex items-center justify-center text-xs bg-green-500 text-white rounded-full">
            ✓
          </div>
        )}
      </button>
      <button
        type="button"
        onClick={() => {
          setIsModal(true);
        }}
        className=""
      >
        <img className="w-8" src="/src/assets/info-circle-svgrepo-com.svg" />
      </button>
      <button
        onClick={() => {
          DownloadJSON(props.getValues());
        }}
      >
        JSON
      </button>
      <button
        type="button"
        onClick={() => {
          navigate("/characters");
        }}
        className="ml-auto mr-10"
      >
        <img className="w-8" src="/src/assets/house-water-svgrepo-com.svg" />
      </button>
      <Modal
        isOpen={isModal}
        onClose={() => {
          setIsModal(false);
        }}
        className="w-[50%]"
      >
        <HelpChar />
      </Modal>
    </div>
  );
};
