import { useState, useEffect, ChangeEvent } from "react";
import {
  Card,
  CardBody,
  Divider,
  Button,
  Select,
  SelectItem,
  CardHeader,
  Textarea,
} from "@heroui/react";
import { getServices } from "../../services/TypesServcies";
import { VehicleIcon } from "../Icons/VehicleIcon";
import texts from "../../util/text";

interface Props {
  formData: any;
  updateFormData: (data: Partial<any>) => void;
  next: () => void;
  prev: () => void;
}

const TypeServices = ({ formData, updateFormData, next, prev }: Props) => {
  const [services, setServices] = useState<Services[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [values, setValues] = useState([]);

  useEffect(() => {
    fetchServices();
    console.log(formData);
  }, []);

  const _renderLabel = (text: string, styles?: string) => (
    <div className={styles}>{text}</div>
  );

  const fetchServices = async () => {
    const response = await getServices();
    if (response.success && response.data) {
      setServices(response?.data);
      setError(null);
    } else {
      setError(response.error || "Error al obtener los servicios");
    }
    setLoading(false);
  };
  const handleMaintenanceChange = (e: ChangeEvent<HTMLInputElement>) => {
    updateFormData({ services: e.target.value });
  };
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    updateFormData({ observation: e.target.value });
  };

  return (
    <Card className="m-auto max-w-6xl">
      <CardHeader className="bg-black">
        <div className="flex justify-center gap-2 items-center">
          <VehicleIcon />
          <h1 className="text-xl md:text-sm font-semibold tracking-tight text-balance text-white uppercase">
            {texts.BUSINESS.project}
          </h1>
        </div>
      </CardHeader>
      <Divider />
      <CardBody>
        <div className="flex justify-between pr-4 mb-4">
          <div className="mt-2 ml-4">
            {_renderLabel(
              "Servicios",
              "text-xl font-medium tracking-tight text-gray-950"
            )}
            {_renderLabel(
              "Seleccione los servicios a realizar",
              "font-light text-sm"
            )}
          </div>
          <div className="flex justify-end gap-2">
            <Button
              onPress={prev}
              variant="shadow"
              className="font-semibold bg-black text-white"
              size="md"
            >
              Anterior
            </Button>
            <Button
              onPress={next}
              variant="shadow"
              className="font-semibold bg-black text-white"
              size="md"
            >
              Siguiente
            </Button>
          </div>
        </div>

        <div className="flex justify-center gap-4 items-center p-2">
          <div className="w-full md:w-[50%]">
            <Select
              className="mb-4"
              label="Plan de mantenimiento"
              placeholder="Seleccione uno varios servicios"
              selectedKeys={values}
              selectionMode="multiple"
              onSelectionChange={setValues}
              onChange={handleMaintenanceChange}
            >
              {services.map((service) => (
                <SelectItem key={service.id}>{service.nombre}</SelectItem>
              ))}
            </Select>
            <Textarea
              label="Solicitud de servicio"
              placeholder="Obervación"
              description={
                "Ingrese el kilometraje actual del vehículo, así como los servicios solicitados"
              }
              onChange={handleChange}
              value={formData.observation}
            />
          </div>
        </div>
      </CardBody>
    </Card>
  );
};

export default TypeServices;
