interface Model {
  id: string;
  nombre: string;
  estado: string;
}

interface Vehicle {
  id: string;
  placa: string;
  propietario: string;
  email: string;
  telefono: string;
  marca: { id: number };
  modelo: { id: number };
}

interface Brand {
  id: string;
  nombre: string;
  estado: string;
}

interface Maintenance {
  id: string;
  nombre: string;
  estado: string;
}

interface Services {
  id: string;
  nombre: string;
  estado: string;
}

interface Advisor {
  id: string;
  guid: string;
  nombre: string;
  estado: string;
}

interface MechanicalWorkshops {
  id: string;
  nombre: string;
  estado: string;
  ciudad: string;
  telefono: string;
  direccion: string;
  mantenimientos: [];
}

interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}
