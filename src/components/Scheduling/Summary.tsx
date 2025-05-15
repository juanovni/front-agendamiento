import { useState, ChangeEvent, ReactNode, JSX } from "react";
import {
  Card,
  CardBody,
  Divider,
  CardHeader,
  Alert,
  RadioGroup,
  Radio,
  Image,
  Accordion,
  AccordionItem,
} from "@heroui/react";
import { VehicleIcon } from "../Icons/VehicleIcon";
import ButtonElement from "../Elements/ButtonElement";
import SectionTitle from "../Elements/SectionTitle";
import texts from "../../util/text";
import { ChevronLeft } from "../Icons/ChevronLeft";
import { CalendarIcon } from "../Icons/Calendar";
import CardMechanicalWorkshop from "./Cards/CardMechanicalWorkshop";

interface Props {
  formData: any;
  updateFormData: (data: Partial<any>) => void;
  next: () => void;
  prev: () => void;
}
const initialValues = {
  personalInfo: [
    {
      key: "name",
      label: "Nombres",
    },
    {
      key: "phone",
      label: "Telefono",
    },
    {
      key: "email",
      label: "Email",
    },
    {
      key: "brandId",
      label: "Marca",
    },
    {
      key: "modelId",
      label: "Modelo",
    },
  ],
  services: [
    {
      key: "servicesId",
      label: "Servicios",
    },
    {
      key: "observation",
      label: "Observaciones",
    },
  ],
  datetime: [
    {
      key: "advisorId",
      label: "Asesor",
    },
    {
      key: "date",
      label: "Fecha",
    },
  ],
};
const Summary = ({ formData, updateFormData, next, prev }: Props) => {
  console.log(formData);
  const [selected, setSelected] = useState("0");
  const defaultContent =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.";

  const handleDataProtectionSelected = (e: ChangeEvent<HTMLInputElement>) => {
    setSelected(e.target.value);
  };

  const _renderLabel = (key: string): JSX.Element => {
    let label = "";
    switch (key) {
      case "personalInfo":
        label = "Información personal";
        break;
      case "services":
        label = "Servicios";
        break;
      case "datetime":
        label = "Fecha y hora de la cita";
        break;
      default:
        break;
    }
    return <div className="uppercase py-1 text-base font-bold">{label}</div>;
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
        <ButtonElement onPress={prev}>
          <div className="flex justify-center gap-2 items-center">
            <ChevronLeft />
            Anterior
          </div>
        </ButtonElement>
        <ButtonElement onPress={next} isDisabled={showNextButton()}>
          <div className="flex justify-center gap-2 items-center">Agendar</div>
          <CalendarIcon />
        </ButtonElement>
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
          <SectionTitle
            title="Información de la Cita"
            subTitle="Por favor verifique la información"
          />
          <div className="gap-4 p-2">
            <div className="flex flex-col gap-4 w-full">
              <Alert
                color="danger"
                title={texts.DATA_PROTECTION.title.first}
                description={texts.DATA_PROTECTION.title.second}
                variant="bordered"
              >
                <p className="text-black font-bold py-2">
                  {texts.DATA_PROTECTION.confirm}
                </p>
                <RadioGroup
                  label=""
                  color="warning"
                  defaultValue="no"
                  orientation="horizontal"
                  className="text-black font-semibold"
                  value={selected}
                  onChange={handleDataProtectionSelected}
                >
                  <Radio value="1">Si</Radio>
                  <Radio value="0">No</Radio>
                </RadioGroup>
              </Alert>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 py-4">
              <CardMechanicalWorkshop
                name={formData.mechanicDetail.nombre}
                city={formData.mechanicDetail.ciudad}
                address={formData.mechanicDetail.direccion}
                phone={formData.mechanicDetail.telefono}
                sizeImage={"h-52"}
              ></CardMechanicalWorkshop>
              <div className="">
                <Accordion
                  selectionMode="multiple"
                  defaultExpandedKeys={["personalInfo", "services", "datetime"]}
                >
                  {Object.entries(initialValues).map(
                    ([sectionName, fields]) => (
                      <AccordionItem
                        key={sectionName}
                        aria-label="Accordion 1"
                        title={_renderLabel(sectionName)}
                      >
                        {fields.map((field) => (
                          <p key={field.key} className="font-normal text-base">
                            {field.label}: {formData[field.key]}
                          </p>
                        ))}
                      </AccordionItem>
                    )
                  )}
                </Accordion>
              </div>
            </div>
          </div>
        </CardBody>
      </Card>
    </>
  );
};

export default Summary;
