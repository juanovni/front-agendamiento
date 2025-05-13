import { useEffect, useState, ChangeEvent } from "react";
import {
  Card,
  CardBody,
  Divider,
  Button,
  Input,
  Select,
  SelectItem,
  CardHeader,
} from "@heroui/react";
import { SearchIcon } from "../Icons/SearchIcon";
import { VehicleIcon } from "../Icons/VehicleIcon";
import { getVehicleInfoByPlate } from "../../services/vechicleService";
import { getModelsByBrand } from "../../services/modelService";
import { getBrands } from "../../services/brandService";
import texts from "../../util/text";
import Swal from "sweetalert2";
import ButtonElement from "../Elements/ButtonElement";

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
      type: "text",
    },
  ],
};

interface Props {
  formData: any;
  updateFormData: (data: Partial<any>) => void;
  next: () => void;
}

const initialFormState = {
  plate: "",
  brandId: "",
  modelId: "",
  name: "",
  email: "",
  phone: "",
};

const SearhVehicle = ({ formData, updateFormData, next }: Props) => {
  const [plateInput, setPlateInput] = useState("");
  const [brands, setBrands] = useState<Brand[]>([]);
  const [models, setModels] = useState<Model[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [showDetails, setShowDetails] = useState<boolean>(false);

  const showAlert = (title: string, text: string, icon: string) => {
    Swal.fire({
      title,
      text,
      icon: "warning",
      confirmButtonText: "Aceptar",
    });
  };

  useEffect(() => {
    fetchBrands();
  }, []);

  const handleSearchVehicle = () => {
    if (plateInput.length > 4)
      fetchVehicleInfo(
        plateInput,
        ({ propietario, email, telefono, marca, modelo }) => {
          fetchModels(marca?.id);
          updateFormData({
            name: propietario,
            email: email,
            phone: telefono,
            brandId: marca?.id,
            modelId: modelo?.id,
          });
        }
      );
  };

  const resetForm = () => {
    updateFormData(initialFormState);
  };

  const handleBrandChange = (e: ChangeEvent<HTMLSelectElement>) => {
    let brandId = e.target.value;
    if (brandId) {
      fetchModels(parseInt(brandId));
      updateFormData({ brandId });
    }
  };

  const handleModelChange = (e: ChangeEvent<HTMLSelectElement>) => {
    let modelId = e.target.value;
    if (modelId) {
      updateFormData({ modelId });
    }
  };

  const handlePlateChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPlateInput(e.target.value);
    updateFormData({ plate: e.target.value });
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    updateFormData({ [e.target.name]: e.target.value });
  };

  const handleNext = () => {
    next();
  };

  const fetchVehicleInfo = async (
    plateInfo: string,
    callback: (data: Vehicle) => void
  ) => {
    const response = await getVehicleInfoByPlate(plateInfo);
    if (response.success && response.data) {
      if (callback) callback(response.data);
    } else {
      resetForm();
      showAlert(
        "Atención!",
        "La placa digitada no existe en el sistema, para continuar agendando una cita complete el formulario.",
        "warning"
      );
      setError(response.error || "Error al obtener marcas");
    }
    setShowDetails(true);
    setLoading(false);
  };

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

  const fetchModels = async (brandId: number) => {
    const response = await getModelsByBrand(brandId);
    if (response.success && response.data) {
      setModels(response?.data);
      setError(null);
    } else {
      setError(response.error || "Error al obtener marcas");
    }
    setLoading(false);
  };

  const _renderLabel = (text: string, styles?: string) => (
    <div className={styles}>{text}</div>
  );

  const showNextButton = () => {
    if (
      !formData.plate ||
      !formData.name ||
      !formData.email ||
      !formData.phone
    ) {
      return true;
    }
    return false;
  };

  return (
    <>
      <div className="w-full flex justify-end pr-4 mb-4">
        <ButtonElement
          label="Siguiente"
          onPress={handleNext}
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
          <div className="flex justify-center gap-4 items-center">
            <div className="w-full md:w-80">
              <Input
                isRequired
                startContent={<SearchIcon />}
                label="Placa"
                labelPlacement="outside"
                placeholder="GNY0123"
                description="Ingrese la placa del vehículo"
                size="lg"
                value={formData.plate}
                onChange={handlePlateChange}
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
            {_renderLabel(
              "Información del vehículo",
              "text-xl font-medium tracking-tight text-gray-950"
            )}
            {_renderLabel(
              "Continue con el agendamiento de la cita, diligenciando los campos",
              "font-light text-sm"
            )}
          </div>

          <div className="flex flex-col gap-4 p-4">
            <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
              <Select
                label="Marca"
                size="sm"
                isRequired
                placeholder="Seleccione una marca"
                onChange={handleBrandChange}
                selectedKeys={[String(formData.brandId)]}
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
                onChange={handleModelChange}
                selectedKeys={[String(formData.modelId)]}
              >
                {models.map((model) => (
                  <SelectItem key={model.id}>{model.nombre}</SelectItem>
                ))}
              </Select>
            </div>
            <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
              {initialValues.fields.map((field) => {
                return (
                  <Input
                    isRequired
                    key={field.id}
                    name={field.id}
                    label={field.label}
                    placeholder={field.description}
                    type={field.type}
                    size="md"
                    value={formData[field?.id]}
                    onChange={handleChange}
                  />
                );
              })}
            </div>
          </div>
        </CardBody>
      </Card>
    </>
  );
};

export default SearhVehicle;
