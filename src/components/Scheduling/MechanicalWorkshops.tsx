import { useState, useEffect } from "react";
import { Card, CardHeader, CardBody, Divider, Button } from "@heroui/react";
import { getMechanicalWorkshops } from "../../services/mechanicalWorkshops";

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
  const [values, setValues] = useState([]);

  useEffect(() => {
    fetchMechanicalWorkshops();
    console.log(formData)
  }, []);

  const fetchMechanicalWorkshops = async () => {
    const response = await getMechanicalWorkshops();
    if (response.success && response.data) {
      setMechanicalWorkshops(response?.data);
      setError(null);
    } else {
      setError(response.error || "Error al obtener los talleres");
    }
    setLoading(false);
  };

  const _renderLabel = (text: string) => (
    <div className="text-tiny uppercase font-bold mb-2">{text}</div>
  );

  return (
    <div>
      <div className="flex justify-between pr-4 mb-4">
        <div></div>
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
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 p-2">
        {mechanicalWorkshops.map((mechanicalWorkshop) => (
          <Card key={mechanicalWorkshop.id} className=" cursor-pointer ">
            <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
              <h4 className="font-bold text-large">
                {mechanicalWorkshop.nombre}
              </h4>
              <small className="text-default-500">
                {mechanicalWorkshop.ciudad}
              </small>
              <Divider className="mt-4 mb-4" />
            </CardHeader>
            <CardBody className="overflow-visible py-2">
              {_renderLabel(mechanicalWorkshop.direccion)}
              {_renderLabel(mechanicalWorkshop.telefono)}
              <div className="m-10">
                <ul className="list-disc">
                  {mechanicalWorkshop?.mantenimientos.map(({ id, nombre }) => (
                    <li key={id}>{nombre}</li>
                  ))}
                </ul>
              </div>
            </CardBody>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default MechanicalWorkshops;
