import { apiRequest } from "../api/apiClient";
import { routes } from "../util/Api.config";

const getFormData = (data: Record<string, any>): FormData => {
  const formData = new FormData();
  Object.entries(data).forEach(([key, value]) => {
    formData.append(key, String(value));
  });
  return formData;
};

type WorkSchedulesResponse = {
  available: boolean;
  capacity: number;
  occupied: number;
};

type AvailableHours = string[];

type AvailabilityResponse = {
  available: boolean;
  capacity: number;
  occupied: number;
};

type WorkSchedulesData = [];

/* export const getWorkSchedules = async (
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
}; */

export const getWorkSchedules = async (
  info: WorkSchedulesValidation,
): Promise<ApiResponse<WorkSchedulesResponse>> => {
  try {
    const body = getFormData(info);

    const response = await apiRequest<{ data: WorkSchedulesResponse }>(
      "post",
      routes.workSchedules.getWorkSchedules,
      body,
    );

    return { success: true, data: response?.data };
  } catch (error) {
    console.error("Error getting WorkSchedules:", error);

    return {
      success: false,
      error: error instanceof Error ? error.message : "Error desconocido",
    };
  }
};

export const getAvailableHours = async (info: {
  tecnico_id: number;
  fecha_agenda: string;
}): Promise<ApiResponse<AvailableHours>> => {
  try {
    const body = getFormData(info);

    const response = await apiRequest<{ data: AvailableHours }>(
      "post",
      routes.workSchedules.getAvailableHours,
      body,
    );

    return { success: true, data: response.data };
  } catch (error) {
    return {
      success: false,
      error: "Error obteniendo horarios",
    };
  }
};
