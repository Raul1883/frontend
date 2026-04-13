import Footer from "../components/Footer";
import Header from "../components/Header";
import SessionInfo from "./Session";
import { authAPI } from "../API/auth";

export default () => {
  return (
    <div className="">
      <Header />
      <SessionInfo />

      <Footer />
    </div>
  );
};
