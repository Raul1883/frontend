import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export const Login: React.FC = () => {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { login: authLogin } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      await authLogin(login, password);
      navigate("/"); // Редирект после успешного входа
    } catch (err: any) {
      setError(err.response?.data?.detail || "Login failed");
    } finally {
      setIsLoading(false);
    }
  };



  return (
    <div className="flex items-center justify-center w-full h-screen ">
      <form
        className="flex flex-col gap-4 w-80 p-8 bg-white shadow-xl"
        onSubmit={handleSubmit}
      >
        <h2 className="text-2xl font-light tracking-wide text-center text-black mb-2">
          Вход
        </h2>

        <input
          type="text"
          value={login}
          onChange={(e) => setLogin(e.target.value)}
          placeholder="Логин"
          required
          className="w-full px-4 py-3 text-black bg-white border border-gray-300 rounded-none focus:outline-none focus:border-black transition-colors placeholder-gray-400"
        />

        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Пароль"
          required
          className="w-full px-4 py-3 text-black bg-white border border-gray-300 rounded-none focus:outline-none focus:border-black transition-colors placeholder-gray-400"
        />

        {error && <div className="text-sm text-red-600 mt-[-8px]">{error}</div>}

        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-3 mt-2 text-white bg-black hover:bg-gray-800 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors text-sm font-medium tracking-wide"
        >
          {isLoading ? "Загрузка..." : "Войти"}
        </button>
        <Link to="/reg" className="text-center hover:text-gray-500">Зарегестироваться</Link>
      </form>
    </div>
  );
};
