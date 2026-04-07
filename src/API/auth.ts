import axiosInstance  from './AxiosInstance';
import { setAccessToken, clearAccessToken } from '../utils/token';

export interface LoginCredentials {
  login: string;
  password: string;
}

export interface User {
  id: number;
  login: string;
  contact_info: string | null;
  role: string;
}

export interface LoginResponse {
  access_token: string;
  user: User;
}

export const authAPI = {
  login: async (credentials: LoginCredentials): Promise<LoginResponse> => {
    const response = await axiosInstance.post<LoginResponse>('/auth/login', credentials);
    const { access_token } = response.data;
    
    setAccessToken(access_token);
    
    return response.data;
  },
  
  logout: async (): Promise<void> => {
    try {
      await axiosInstance.post('/auth/logout');
    } finally {
      clearAccessToken();
    }
  },
  
  refresh: async (): Promise<string> => {
    const response = await axiosInstance.post<{ access_token: string }>('/auth/refresh');
    const { access_token } = response.data;
    setAccessToken(access_token);
    return access_token;
  },
  
  getProfile: async (): Promise<User> => {
    const response = await axiosInstance.get<User>('/users/profile');
    return response.data;
  },
};