import { apiRequest } from "../api/apiClient";
import { routes } from "../util/Api.config";

export const getAdvisorsByMechanicalWokshops = async (
  filters?: string
): Promise<ApiResponse<Advisor[]>> => {
  try {
    let filter = "";
    if (typeof filters != "undefined") {
      filter = filters;
    }
    const response = await apiRequest<{ data: Advisor[] }>(
      "get",
      routes.advisor.advisorsByMechanicalWokshops +
        `?filter[id_taller]=${filter}`
    );
    return { success: true, data: response?.data };
  } catch (error) {
    console.error("Error fetching advisors:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Error desconocido",
    };
  }
};
