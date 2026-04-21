import type {
  ApplicationCount,
  ApplicationGet,
  ApplicationPost,
} from "../types/Application";
import axiosInstance from "./AxiosInstance";

const APPLICATIONS_URL = "/applications";

export const getApplicationsCount = async (
  session_id: string,
): Promise<ApplicationCount> => {
  const response = await axiosInstance.get<ApplicationCount>(
    APPLICATIONS_URL + "/by_sessions/count/" + session_id,
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
