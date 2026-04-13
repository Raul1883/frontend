import { Link } from "react-router-dom";

export default () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-4xl">Упс...</h1>
      <p className="text-4xl">Вам сюда нельзя</p>
      <Link to="/" className="mt-8 hover:border-2 rounded-full p-4">Домой</Link>
    </div>
  );
};
