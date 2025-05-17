import { apiRequest } from "../api/apiClient";
import { routes } from "../util/Api.config";

export const getMechanicalWorkshops = async (
  filters?: string
): Promise<ApiResponse<MechanicalWorkshops[]>> => {
  try {
    let filter = "";
    if (typeof filters != "undefined") {
      filter = filters;
    }
    const response = await apiRequest<{ data: MechanicalWorkshops[] }>(
      "get",
      routes.mechanicalWorkshops.all + `?filter[ciudad]=${filter}`
    );
    return { success: true, data: response?.data };
  } catch (error) {
    console.error("Error fetching mechanical workshops:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Error desconocido",
    };
  }
};
