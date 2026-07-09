import Header from "../components/Header";
import SessionsList from "../components/SessionsList";

export default () => {
  return (
    <div className="min-h-screen bg-linear-to-b from-white to-gray-50">
      <Header />

      <div className="w-full max-w-5xl">
        <SessionsList master={false} />
      </div>
    </div>
  );
};
