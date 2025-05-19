import { useEffect, useState, ChangeEvent } from "react";
import { Input, Select, SelectItem, Checkbox } from "@heroui/react";
import { getVehicleInfoByPlate } from "../../services/vechicleService";
import { getModelsByBrand } from "../../services/modelService";
import { getBrands } from "../../services/brandService";
import ButtonElement from "../Elements/ButtonElement";
import { SearchIcon } from "../Icons/SearchIcon";
import { ChevronRight } from "../Icons/ChevronRight";
import SectionTitle from "../Elements/SectionTitle";
import { showAlert } from "../../util/Swal";
import CardSection from "./Cards/CardSection";

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
  const [disableButtonSearch, setDisableButtonSearch] = useState<boolean>(true);
  const [isChecked, setIsChecked] = useState<boolean>(false);

  useEffect(() => {
    fetchBrands();
  }, []);

  useEffect(() => {
    if (formData.brandId) {
      fetchModels(parseInt(formData.brandId));
    }
  }, [formData.brandId]);

  const handleSearchVehicle = () => {
    if (plateInput.length > 4)
      fetchVehicleInfo(
        plateInput,
        ({ id, propietario, email, telefono, marca, modelo }) => {
          fetchModels(marca?.id);
          updateFormData({
            vehicleId: id,
            name: propietario,
            email: email,
            phone: telefono,
            brandId: marca.id,
            brandName: marca.nombre,
            modelId: modelo.id,
            modelName: modelo.nombre,
          });
          setIsChecked(true);
        }
      );
  };

  const resetForm = () => {
    updateFormData(initialFormState);
  };

  const handleBrandChange = (e: ChangeEvent<HTMLSelectElement>) => {
    let brandId = e.target.value;
    if (brandId) {
      const brandSelected = brands.find(
        (item) => Number(item.id) == Number(brandId)
      );
      fetchModels(parseInt(brandId));
      updateFormData({
        brandId: brandSelected?.id,
        brandName: brandSelected?.nombre,
      });
    }
  };

  const handleModelChange = (e: ChangeEvent<HTMLSelectElement>) => {
    let modelId = e.target.value;
    if (modelId) {
      const modelSelected = models.find(
        (item) => Number(item.id) == Number(modelId)
      );
      updateFormData({
        modelId: modelSelected?.id,
        modelName: modelSelected?.nombre,
      });
    }
  };

  const handlePlateChange = (e: ChangeEvent<HTMLInputElement>) => {
    const plateValue = e.target.value;
    updateFormData({ plate: plateValue });
    setPlateInput(plateValue);
    setDisableButtonSearch(true);
    if (plateValue.length > 5) setDisableButtonSearch(false);
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
        <ButtonElement onPress={handleNext} isDisabled={showNextButton()}>
          <div className="flex justify-center gap-2 items-center">
            Siguiente
            <ChevronRight />
          </div>
        </ButtonElement>
      </div>
      <CardSection>
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
          <ButtonElement
            isIconOnly
            className="bg-orange-600 hover:bg-orange-600 text-white p-2 rounded-full shadow-md"
            onPress={handleSearchVehicle}
            isDisabled={disableButtonSearch}
          >
            <SearchIcon />
          </ButtonElement>
        </div>
        <SectionTitle
          title="Información del vehículo"
          subTitle="Continue con el agendamiento de la cita, diligenciando los campos"
        />
        <Checkbox
          className="py-4 px-6"
          classNames={{
            label: "text-small",
          }}
          color="warning"
          checked={isChecked}
          isSelected={isChecked}
          onChangeCapture={(e) => setIsChecked(!isChecked)}
        >
          <p>Desmarcar para actualizar los datos</p>
        </Checkbox>
        <div className="flex flex-col gap-4 p-4">
          <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
            <Select
              label="Marca"
              size="sm"
              isRequired
              isDisabled={isChecked}
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
              isDisabled={isChecked}
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
                  isDisabled={isChecked}
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
      </CardSection>
    </>
  );
};

export default SearhVehicle;
