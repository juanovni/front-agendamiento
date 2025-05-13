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
import { getMaintenances } from "../../services/maintenanceService";

interface Props {
  formData: any;
  updateFormData: (data: Partial<any>) => void;
  next: () => void;
  prev: () => void;
}

const TypeServices = ({ formData, updateFormData, next, prev }: Props) => {
  const [maintenances, setMaintenances] = useState<Services[]>([]);
  const [services, setServices] = useState<Services[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [values, setValues] = useState([]);

  useEffect(() => {
    fetchServices();
    fetchMaintenance();
  }, []);

  useEffect(() => {
    if (typeof formData?.servicesId && formData.servicesId.length > 0)
      setValues(formData.servicesId);
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
  const fetchMaintenance = async () => {
    const response = await getMaintenances();
    if (response.success && response.data) {
      setMaintenances(response?.data);
      setError(null);
    } else {
      setError(response.error || "Error al obtener los servicios");
    }
    setLoading(false);
  };
  const handleMaintenanceChange = (e: ChangeEvent<HTMLInputElement>) => {
    updateFormData({ maintenanceId: e.target.value });
  };
  const handleServicesChange = (e: ChangeEvent<HTMLInputElement>) => {
    updateFormData({ servicesId: e.target.value });
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
              label="Mantenimiento"
              placeholder="Seleccione el mantenimiento"
              onChange={handleMaintenanceChange}
              selectedKeys={[String(formData.maintenanceId)]}
            >
              {maintenances.map((maintenance) => (
                <SelectItem key={maintenance.id}>
                  {maintenance.nombre}
                </SelectItem>
              ))}
            </Select>
            <Select
              className="mb-4"
              label="Correctivos"
              placeholder="Seleccione uno varios correctivos"
              selectedKeys={values}
              selectionMode="multiple"
              onSelectionChange={setValues}
              onChange={handleServicesChange}
            >
              {services.map((service) => (
                <SelectItem key={service.id}>{service.nombre}</SelectItem>
              ))}
            </Select>
            <Textarea
              label="Solicitud de servicio"
              placeholder="Obervación"
              description={"Ingrese los servicios solicitados"}
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
