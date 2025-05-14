import { useState, useEffect, ChangeEvent } from "react";
import {
  Card,
  CardBody,
  Divider,
  Select,
  SelectItem,
  CardHeader,
  Textarea,
} from "@heroui/react";
import { Selection } from "@heroui/react";

import { getServices } from "../../services/TypesServcies";
import { VehicleIcon } from "../Icons/VehicleIcon";
import texts from "../../util/text";
import { getMaintenances } from "../../services/maintenanceService";
import ButtonElement from "../Elements/ButtonElement";

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
  /* const [values, setValues] = useState([]); */
  const [values, setValues] = useState<Set<string>>(new Set());
  const [selectedServices, setSelectedServices] = useState<Set<string>>(
    new Set()
  );

  useEffect(() => {
    fetchServices();
    fetchMaintenance();
  }, []);

  useEffect(() => {
    if (Array.isArray(formData.servicesId)) {
      setValues(new Set(formData.servicesId.map(String)));
      const selectedKeys = Array.from(formData.servicesId).map(String);
      setSelectedServices(new Set(selectedKeys));
    }
  }, [formData.servicesId]);

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

  const handleMaintenanceChange = (e: ChangeEvent<HTMLSelectElement>) => {
    updateFormData({ maintenanceId: e.target.value });
  };

  const handleServicesChange = (keys: Selection) => {
    if (keys === "all") {
      const allServiceIds = services.map((s) => String(s.id));
      setSelectedServices(new Set(allServiceIds));
      updateFormData({ servicesId: allServiceIds });
    } else {
      const selectedKeys = Array.from(keys).map(String);
      setSelectedServices(new Set(selectedKeys));
      updateFormData({ servicesId: selectedKeys });
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    updateFormData({ observation: e.target.value });
  };

  const showNextButton = () => {
    if (!formData.maintenanceId || !formData.observation) {
      return true;
    }
    return false;
  };

  return (
    <>
      <div className="w-full flex justify-end gap-2 pr-4 mb-4">
        <ButtonElement label="Anterior" onPress={prev} />
        <ButtonElement
          label="Siguiente"
          onPress={next}
          isDisabled={showNextButton()}
        />
      </div>
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
          <div className="flex justify-start pr-4 mb-4">
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
          </div>
          <div className="flex justify-center gap-4 items-center p-2">
            <div className="w-full md:w-[60%]">
              <Select
                className="mb-4"
                label="Mantenimiento"
                placeholder="Seleccione el mantenimiento"
                onChange={handleMaintenanceChange}
                selectedKeys={
                  formData.maintenanceId ? [String(formData.maintenanceId)] : []
                }
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
                selectionMode="multiple"
                onSelectionChange={handleServicesChange}
                selectedKeys={selectedServices}
              >
                {services.map((service) => (
                  <SelectItem key={String(service.id)}>
                    {service.nombre}
                  </SelectItem>
                ))}
              </Select>
              <Textarea
                isRequired
                label="Solicitud de servicio"
                placeholder="Obervación"
                description={
                  "Describa que servicios requiere (por ejemplo, mantenimiento preventivo, revisión de frenos, alineación y balanceo, entre otros)."
                }
                onChange={handleChange}
                value={formData.observation}
              />
            </div>
          </div>
        </CardBody>
      </Card>
    </>
  );
};

export default TypeServices;
