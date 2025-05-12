import { apiRequest } from "../api/apiClient";
import { routes } from "../util/Api.config";

interface Vehicle {
  id: string;
  placa: string;
  propietario: string;
  email: string;
  telefono: string;
}

interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

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
