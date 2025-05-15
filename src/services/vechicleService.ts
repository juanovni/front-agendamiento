import { apiRequest } from "../api/apiClient";
import { routes } from "../util/Api.config";

const getFormData = (data: Record<string, any>): FormData => {
  const formData = new FormData();
  Object.entries(data).forEach(([key, value]) => {
    formData.append(key, String(value));
  });
  return formData;
};

export const getVehicleInfoByPlate = async (
  plateId: string
): Promise<ApiResponse<Vehicle>> => {
  try {
    const response = await apiRequest<{ data: Vehicle }>(
      "get",
      routes.vehicle.searchByPlate + `/${plateId}`
    );
    return { success: true, data: response?.data };
  } catch (error) {
    console.error("Error fetching vehicle:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Error desconocido",
    };
  }
};

export const saveSchedule = async (
  info: Schedule
): Promise<ApiResponse<Schedule>> => {
  try {
    const body = getFormData(info);
    const response = await apiRequest<{ data: Schedule }>(
      "post",
      routes.vehicle.saveForm,
      body
    );
    return { success: true, data: response?.data };
  } catch (error) {
    console.error("Error creating vehicle:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Error desconocido",
    };
  }
};
