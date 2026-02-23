import Footer from "../components/Footer";
import Header from "../components/Header";

function MainPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <p className="">Главная страница</p>
      <Footer />
    </div>
  );
}

export default MainPage;