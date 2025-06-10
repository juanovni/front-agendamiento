import { apiRequest } from "../api/apiClient";
import { routes } from "../util/Api.config";

const getFormData = (data: Record<string, any>): FormData => {
  const formData = new FormData();
  Object.entries(data).forEach(([key, value]) => {
    formData.append(key, String(value));
  });
  return formData;
};

type WorkSchedulesData = [];

export const getWorkSchedules = async (
  info: WorkSchedules
): Promise<ApiResponse<WorkSchedulesData>> => {
  try {
    const body = getFormData(info);
    const response = await apiRequest<{ data: WorkSchedulesData }>(
      "post",
      routes.workSchedules.getWorkSchedules,
      body
    );
    return { success: true, data: response?.data };
  } catch (error) {
    console.error("Error creating WorkSchedules:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Error desconocido",
    };
  }
};
