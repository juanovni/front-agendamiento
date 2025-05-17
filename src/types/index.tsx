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
  marca: { id: number; nombre: string };
  modelo: { id: number; nombre: string };
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

interface Schedule {
  id?: number;
  placa: string;
  propietario: string;
  email: string;
  telefono: string;
  id_marca: number;
  id_modelo: number;
  id_taller: number;
  id_tecnico: number;
  id_mantenimiento: number;
  //id_correctivo:arra
  estado: number;
  fecha_agenda: string;
  hora_agenda: string;
  observacion: string;
}
