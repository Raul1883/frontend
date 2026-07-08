import type {
  ApplicationDataItem,
  ApplicationGet,
  ApplicationPost,
} from "../types/Application";
import axiosInstance from "./AxiosInstance";

const APPLICATIONS_URL = "/applications";

export const getApplicationsPreviewData = async (
  session_id: string,
): Promise<any> => {
  const response = await axiosInstance.get<ApplicationDataItem>(
    APPLICATIONS_URL + "/by_sessions/preview/" + session_id,
  );
  return response.data;
};

export const createApplications = async (
  data: ApplicationPost,
): Promise<ApplicationGet> => {
  const response = await axiosInstance.post<ApplicationGet>(
    APPLICATIONS_URL,
    data,
  );
  return response.data;
};
