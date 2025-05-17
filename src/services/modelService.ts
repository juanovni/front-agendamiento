import { apiRequest } from "../api/apiClient";
import { routes } from "../util/Api.config";

export const getModelsByBrand = async (
  brandId: number
): Promise<ApiResponse<Model[]>> => {
  try {
    const response = await apiRequest<{ data: Model[] }>(
      "get",
      routes.models.modelByBrand + `/${brandId}`
    );
    return { success: true, data: response?.data };
  } catch (error) {
    console.error("Error fetching models:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Error desconocido",
    };
  }
};
