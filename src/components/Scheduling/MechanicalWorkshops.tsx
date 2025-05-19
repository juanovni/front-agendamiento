import { useState, useEffect, ChangeEvent } from "react";
import { addToast, Select, SelectItem } from "@heroui/react";
import { getMechanicalWorkshops } from "../../services/mechanicalWorkshops";
import ButtonElement from "../Elements/ButtonElement";
import { ChevronLeft } from "../Icons/ChevronLeft";
import { ChevronRight } from "../Icons/ChevronRight";
import SectionTitle from "../Elements/SectionTitle";
import CardMechanicalWorkshop from "./Cards/CardMechanicalWorkshop";
import CardSection from "./Cards/CardSection";

interface Props {
  formData: any;
  updateFormData: (data: Partial<any>) => void;
  next: () => void;
  prev: () => void;
}

const MechanicalWorkshops = ({
  formData,
  updateFormData,
  next,
  prev,
}: Props) => {
  const [mechanicalWorkshops, setMechanicalWorkshops] = useState<
    MechanicalWorkshops[]
  >([]);
  const [mechanicalValue, setMechanicalValue] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [cities, setCities] = useState<string[]>([]);

  useEffect(() => {
    fetchMechanicalWorkshops("", (res) => {
      setMechanicalWorkshops(res);
      setCities(getCitiesOnly(res) || []);
    });
  }, []);

  const fetchMechanicalWorkshops = async (
    city: string,
    callback?: (data: MechanicalWorkshops[]) => void
  ) => {
    const response = await getMechanicalWorkshops(city);
    if (response.success && response.data) {
      if (callback) callback(response.data);
      setError(null);
    } else {
      setError(response.error || "Error al obtener los talleres");
    }
    setLoading(false);
  };

  const getCitiesOnly = (data: MechanicalWorkshops[]): string[] => {
    const cities = new Set<string>();
    data.forEach((item) => {
      cities.add(item.ciudad);
    });
    return Array.from(cities);
  };

  const handleCityChange = (e: ChangeEvent<HTMLSelectElement>) => {
    fetchMechanicalWorkshops(e.target.value, (res) => {
      setMechanicalWorkshops(res);
    });
  };

  const handleMechanicalClick = (mechanicId: number) => {
    const mechanicalWorkshopSelected = mechanicalWorkshops.find(
      (m) => parseInt(m.id) == mechanicId
    );
    const mechanicalName = mechanicalWorkshopSelected?.nombre;
    addToast({
      title: "Taller!",
      description: mechanicalName,
      timeout: 1000,
      shouldShowTimeoutProgress: true,
    });

    setMechanicalValue(mechanicId);
    updateFormData({
      mechanicId,
      mechanicDetail: mechanicalWorkshopSelected,
    });
  };

  const showNextButton = () => {
    if (!formData.mechanicId) {
      return true;
    }
    return false;
  };

  return (
    <>
      <div className="w-full flex justify-end gap-2 pr-4 mb-4">
        <ButtonElement onPress={prev}>
          <div className="flex justify-center gap-2 items-center">
            <ChevronLeft />
            Anterior
          </div>
        </ButtonElement>
        <ButtonElement onPress={next} isDisabled={showNextButton()}>
          <div className="flex justify-center gap-2 items-center">
            Siguiente
            <ChevronRight />
          </div>
        </ButtonElement>
      </div>
      <div className="m-4">
        <CardSection style="w-full">
          <div className="flex justify-between items-center pr-4 mb-4 w-full">
            <SectionTitle
              title="Lista de Talleres"
              subTitle="Seleccione el taller de su preferencia"
            />
            <div className="flex justify-end gap-2 w-52">
              <Select
                label="Filtrar por ciudad"
                size="sm"
                onChange={handleCityChange}
              >
                {cities.map((city) => (
                  <SelectItem key={city}>{city}</SelectItem>
                ))}
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 m-2">
            {mechanicalWorkshops.map((mechanicalWorkshop) => (
              <div
                key={mechanicalWorkshop.id}
                onClick={(e) =>
                  handleMechanicalClick(parseInt(mechanicalWorkshop.id))
                }
              >
                <CardMechanicalWorkshop
                  name={mechanicalWorkshop.nombre}
                  city={mechanicalWorkshop.ciudad}
                  address={mechanicalWorkshop.direccion}
                  phone={mechanicalWorkshop.telefono}
                  isSelected={
                    formData.mechanicId == parseInt(mechanicalWorkshop.id)
                  }
                  maintenanceList={mechanicalWorkshop.mantenimientos}
                ></CardMechanicalWorkshop>
              </div>
            ))}
          </div>
        </CardSection>
      </div>
    </>
  );
};

export default MechanicalWorkshops;
