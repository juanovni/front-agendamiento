import { useState, useEffect, ChangeEvent } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Divider,
  Select,
  SelectItem,
  Image,
} from "@heroui/react";
import { getMechanicalWorkshops } from "../../services/mechanicalWorkshops";
import ButtonElement from "../Elements/ButtonElement";
import { VehicleIcon } from "../Icons/VehicleIcon";
import texts from "../../util/text";

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

  const _renderLabel = (text: string, styles?: string) => (
    <div className={`${styles} text-tiny font-bold`}>{text}</div>
  );

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

  const showNextButton = () => {
    if (!formData.mechanicId) {
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
      <div className="m-4">
        <Card className="m-auto w-full">
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
            <div className="flex justify-between items-center pr-4 mb-4 w-full">
              <div className="mt-2 ml-4">
                {_renderLabel(
                  "Lista de Talleres",
                  "text-xl font-medium tracking-tight text-gray-950"
                )}
                {_renderLabel(
                  "Seleccione el taller de su preferencia",
                  "font-light text-sm"
                )}
              </div>
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

            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 m-2">
              {mechanicalWorkshops.map((mechanicalWorkshop) => (
                <Card key={mechanicalWorkshop.id} className=" cursor-pointer ">
                  <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
                    <h4 className="font-bold text-large">
                      {mechanicalWorkshop.nombre}
                    </h4>
                    <small className="text-default-500">
                      {mechanicalWorkshop.ciudad}
                    </small>
                    <div className="flex items-center justify-center self-center m-4">
                      <Image
                        className="w-full h-32 object-contain"
                        alt="HeroUI hero Image"
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRG5XWyGxaf9B5Fj1LX-JjK_QaEuLmoeP3NUg&s"
                      />
                    </div>
                  </CardHeader>
                  <CardBody className="overflow-visible py-2">
                    {_renderLabel(
                      mechanicalWorkshop.direccion,
                      "uppercase ml-6"
                    )}
                    {_renderLabel(
                      mechanicalWorkshop.telefono,
                      "uppercase ml-6"
                    )}
                    <div className="ml-10 py-2 mb-4">
                      <ul className="list-disc">
                        {mechanicalWorkshop?.mantenimientos.map(
                          ({ id, nombre }) => (
                            <li key={id}>{nombre}</li>
                          )
                        )}
                      </ul>
                    </div>
                  </CardBody>
                </Card>
              ))}
            </div>
          </CardBody>
        </Card>
      </div>
    </>
  );
};

export default MechanicalWorkshops;
