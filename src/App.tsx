import { useEffect, useState } from "react";
import {
  Card,
  CardBody,
  Divider,
  Button,
  Input,
  Select,
  SelectItem,
} from "@heroui/react";
import { SearchIcon } from "./components/Icons/SearchIcon";
import { VehicleIcon } from "./components/Icons/VehicleIcon";
import { getVehicleInfoByPlate } from "./services/vechicleService";
import { getBrands } from "./services/brandService";
import Layout from "./components/Layout/Layout";
import texts from "./util/text";

interface Brand {
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

const initialValues = {
  fields: [
    {
      id: "name",
      label: "Nombres Completos",
      placeholder: "",
      description: "Ingrese su nombre completo",
      type: "text",
    },
    {
      id: "email",
      label: "Email",
      placeholder: "",
      description: "Ingrese su correo completo",
      type: "email",
    },
    {
      id: "phone",
      label: "Teléfono",
      placeholder: "",
      description: "Ingrese su número de teléfono",
      type: "email",
    },
  ],
};

function App() {
  const [brands, setBrands] = useState<Brand[]>([]);
  const [vehicle, setVehicle] = useState<Vehicle | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchVehicleInfo = async () => {
    const response = await getVehicleInfoByPlate("GNY0716");
    if (response.success && response.data) {
      setVehicle(response.data);
      setError(null);
    } else {
      setError(response.error || "Error al obtener marcas");
    }
    setLoading(false);
  };

  const handleSearchVehicle = () => {
    fetchVehicleInfo();
  };

  useEffect(() => {
    const fetchBrands = async () => {
      const response = await getBrands();
      if (response.success && response.data) {
        setBrands(response?.data);
        setError(null);
      } else {
        setError(response.error || "Error al obtener marcas");
      }

      setLoading(false);
    };
    fetchBrands();
  }, []);

  return (
    <Layout>
      <h1 className="text-5xl font-semibold tracking-tight text-balance text-gray-900 sm:text-3xl">
        {texts.BUSINESS.project}
      </h1>
      <Divider className="my-4" />
      <Card className="w-full">
        <CardBody>
          <div className="flex justify-center gap-4 items-center p-2">
            <div className="w-full md:w-96">
              <Input
                isClearable
                startContent={<VehicleIcon />}
                label="Placa"
                labelPlacement="outside"
                placeholder="GNY1234"
                description="Por favor digite la placa del vehículo"
                size="lg"
              />
            </div>
            <div>
              <Button
                isIconOnly
                className="bg-orange-600 hover:bg-orange-600 text-white p-2 rounded-full shadow-md"
                onPress={handleSearchVehicle}
              >
                <SearchIcon />
              </Button>
            </div>
          </div>

          <div className="mt-2 ml-4">
            <h2 className="text-xl font-medium tracking-tight text-gray-950">
              Información del vehículo
            </h2>
            <p className="font-light text-sm">
              Continue con el agendamiento de la cita, diligenciando los campos
            </p>
          </div>

          <div className="flex flex-col gap-4 p-4">
            <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
              <Select
                label="Marca"
                size="sm"
                isRequired
                placeholder="Seleccione una marca"
              >
                {brands.map((brand) => (
                  <SelectItem key={brand.id}>{brand.nombre}</SelectItem>
                ))}
              </Select>
              <Select
                label="Modelo"
                size="sm"
                isRequired
                placeholder="Seleccione una modelo"
              >
                {brands.map((brand) => (
                  <SelectItem key={brand.id}>{brand.nombre}</SelectItem>
                ))}
              </Select>
            </div>
            <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
              {initialValues.fields.map((field) => {
                return (
                  <Input
                    isRequired
                    key={field.id}
                    labelPlacement="outside"
                    label={field.label}
                    placeholder={field.placeholder}
                    description={field.description}
                    type={field.type}
                    isClearable
                    size="lg"
                  />
                );
              })}
            </div>
          </div>
        </CardBody>
      </Card>
    </Layout>
  );
}

export default App;
