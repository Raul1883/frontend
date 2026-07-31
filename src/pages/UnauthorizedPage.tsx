import MainLayout from "../components/MainLayout";
import NavButton from "../components/NavButton";

export default () => {
  return (
    <MainLayout>
      <h1 className="text-4xl">Упс...</h1>
      <p className="text-4xl">Вам сюда нельзя</p>
      <NavButton to="/">Домой</NavButton>
    </MainLayout>
  );
};
