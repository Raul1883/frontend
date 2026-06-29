import Header from "../../../components/Header";
import MdViewer from "./MdViewer";
import { WikiSidebar } from "./Sidebar";

export default () => {
  return (
    <div>
      <Header />
      <div className="flex">
        <WikiSidebar />
        <MdViewer />
      </div>
    </div>
  );
};
