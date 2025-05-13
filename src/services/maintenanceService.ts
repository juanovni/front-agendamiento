import { apiRequest } from "../api/apiClient";
import { routes } from "../util/Api.config";

export const getMaintenances = async (): Promise<
  ApiResponse<Maintenance[]>
> => {
  try {
    const response = await apiRequest<{ data: Maintenance[] }>(
      "get",
      routes.maintenance.all
    );
    return { success: true, data: response?.data };
  } catch (error) {
    console.error("Error fetching maintenances:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Error desconocido",
    };
  }
};
