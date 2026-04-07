import axiosInstance from "./AxiosInstance";

export const create = async <P, R>(
  url: string,
  sessionData: P,
): Promise<R> => {
  const response = await axiosInstance.post<R>(url, sessionData);
  return response.data;
};

export const getAll = async <T>(url: string): Promise<T[]> => {
  const response = await axiosInstance.get<T[]>(url);
  return response.data;
};

export const getById = async <T>(url: string, id: number): Promise<T> => {
  const response = await axiosInstance.get<T>(`${url}/${id}`);
  return response.data;
};

export const update = async <P, R>(
  url: string,
  id: number,
  sessionData: Partial<P>,
): Promise<R> => {
  const response = await axiosInstance.patch<R>(`${url}/${id}`, sessionData);
  return response.data;
};

export const deleteById = async (url: string, id: number): Promise<void> => {
  await axiosInstance.delete(`${url}/${id}`);
};
