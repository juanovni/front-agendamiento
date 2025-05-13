import { apiRequest } from "../api/apiClient";
import { routes } from "../util/Api.config";

export const getServices = async (): Promise<ApiResponse<Services[]>> => {
  try {
    const response = await apiRequest<{ data: Services[] }>(
      "get",
      routes.services.all
    );
    return { success: true, data: response?.data };
  } catch (error) {
    console.error("Error fetching services:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Error desconocido",
    };
  }
};
