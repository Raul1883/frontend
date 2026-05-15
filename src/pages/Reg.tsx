import React, { useState } from "react";
import axiosInstance from "../API/AxiosInstance";
import { Link } from "react-router-dom";

interface RegistrationData {
  login: string;
  password: string;
  contact_info: string;
  secret_key: string;
}

interface RegistrationResponse {
  message?: string;
  user?: {
    id: number;
    login: string;
    contact_info: string | null;
    role: string;
  };
}

export default () => {
  const [formData, setFormData] = useState<RegistrationData>({
    login: "",
    password: "",
    contact_info: "",
    secret_key: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const response = await axiosInstance.post<RegistrationResponse>(
        "/auth/register",
        formData,
      );
      setSuccess("Registration successful! You can now log in.");
      console.log("Registration response:", response.data);
      // Опционально: очистить форму или перенаправить
      setFormData({
        login: "",
        password: "",
        contact_info: "",
        secret_key: "",
      });
    } catch (err: any) {
      const errorMessage =
        err.response?.data?.message || err.message || "Registration failed";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-md">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Новый аккаунт
          </h2>
          <p className="text-center pt-2 text-red-400 font-bold">
            Важно! Пароли не восстанавливаются!
          </p>
          <p className="text-center pt-2 text-red-400 font-bold">
            Двухфакторки нет делайте сложный пароль
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label
                htmlFor="login"
                className="block text-sm font-medium text-gray-700"
              >
                Логин
              </label>
              <input
                id="login"
                name="login"
                type="text"
                autoComplete="username"
                required
                value={formData.login}
                onChange={handleChange}
                className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Enter your login"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Пароль
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="new-password"
                required
                value={formData.password}
                onChange={handleChange}
                className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Enter your password"
              />
            </div>

            <div>
              <label
                htmlFor="contact_info"
                className="block text-sm font-medium text-gray-700"
              >
                Контактная информация
              </label>
              <input
                id="contact_info"
                name="contact_info"
                type="text"
                autoComplete="off"
                required
                value={formData.contact_info}
                onChange={handleChange}
                className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="ник в дс, телег, etc"
              />
            </div>

            <div>
              <label
                htmlFor="secret_key"
                className="block text-sm font-medium text-gray-700"
              >
                Мистическая строка
              </label>
              <input
                id="secret_key"
                name="secret_key"
                type="text"
                autoComplete="off"
                value={formData.secret_key}
                onChange={handleChange}
                className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Если вы не знаете что с ней делать - не трогайте"
              />
            </div>
          </div>

          {error && (
            <div className="rounded-md bg-red-50 p-4">
              <p className="text-sm text-red-800">{error}</p>
            </div>
          )}

          {success && (
            <div className="rounded-md bg-green-50 p-4">
              <p className="text-sm text-green-800">{success}</p>
              <Link
                to="/login"
                className=" text-green-800 hover:text-green-950"
              >
                Войти
              </Link>
            </div>
          )}

          <div>
            <button
              type="submit"
              disabled={loading}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Делается..." : "Сделать"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
