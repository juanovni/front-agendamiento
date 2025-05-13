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
}

interface Brand {
  id: string;
  nombre: string;
  estado: string;
}

interface Services {
  id: string;
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
  mantenimientos:[]
}

interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}
