import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export const AuthButton: React.FC = () => {
  const { logout, isLoading, role } = useAuth();
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

  if (role) {
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