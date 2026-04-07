import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

export const AuthButton: React.FC = () => {
  const { isAuthenticated, user, logout, isLoading } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  const handleLogin = () => {
    navigate('/login');
  };

  if (isLoading) {
    return <button disabled className="loading">Загрузка...</button>;
  }

  if (isAuthenticated) {
    return (
      <div className="auth-info">
        <button onClick={handleLogout} className="logout-btn">
          Выйти
        </button>
      </div>
    );
  }

  return (
    <div>
    <button onClick={handleLogin} className="login-btn">
      Войти
    </button>
    </div>
  );
};