import { apiRequest } from "../api/apiClient";
import { routes } from "../util/Api.config";

export const getBrands = async (): Promise<ApiResponse<Brand[]>> => {
  try {
    const response = await apiRequest<{ data: Brand[] }>(
      "get",
      routes.brand.all
    );
    return { success: true, data: response?.data };
  } catch (error) {
    console.error("Error fetching brands:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Error desconocido",
    };
  }
};
