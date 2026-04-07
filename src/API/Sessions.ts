import config from "../config";
import type { SessionGet, SessionPost } from "../types/Session";
import axiosInstance from "./AxiosInstance";

const SESSIONS_URL = "/sessions";

export const createSession = async (
  sessionData: Omit<SessionPost, "id">,
): Promise<SessionGet> => {
  const response = await axiosInstance.post<SessionGet>(SESSIONS_URL, sessionData);
  return response.data;
};

export const getSessions = async (): Promise<SessionGet[]> => {
  const response = await axiosInstance.get<SessionGet[]>(SESSIONS_URL);
  return response.data;
};

export const getSessionById = async (id: number): Promise<SessionGet> => {
  const response = await axiosInstance.get<SessionGet>(`${SESSIONS_URL}/${id}`);
  return response.data;
};

export const updateSession = async (
  id: number,
  sessionData: Partial<Omit<SessionPost, "id">>,
): Promise<SessionGet> => {
  const response = await axiosInstance.put<SessionGet>(
    `${SESSIONS_URL}/${id}`,
    sessionData,
  );
  return response.data;
};

export const deleteSession = async (id: number): Promise<void> => {
  await axiosInstance.delete(`${SESSIONS_URL}/${id}`);
};
