import { useState, ChangeEvent, JSX } from "react";
import {
  Card,
  CardBody,
  Divider,
  CardHeader,
  Alert,
  RadioGroup,
  Radio,
  Accordion,
  AccordionItem,
  Checkbox,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
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
      key: "brandName",
      label: "Marca",
    },
    {
      key: "modelName",
      label: "Modelo",
    },
  ],
  services: [
    {
      key: "observation",
      label: "Observaciones",
    },
  ],
  datetime: [
    {
      key: "advisorName",
      label: "Asesor",
    },
    {
      key: "date",
      label: "Fecha",
    },
  ],
};
const Summary = ({ formData, updateFormData, next, prev }: Props) => {
  const [selected, setSelected] = useState("0");
  const [isChecked, setIsChecked] = useState<boolean>(false);
  const [isDisabledConfirmButton, setIsDisabledConfirmButton] =
    useState<boolean>(true);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const handleDataProtectionSelected = (e: ChangeEvent<HTMLInputElement>) => {
    setSelected("0");
    if (e.target.value == "1") {
      onOpen();
      setIsDisabledConfirmButton(true);
    }
  };

  const handleCheckboxChange = (e: ChangeEvent<HTMLInputElement>) => {
    setIsDisabledConfirmButton(true);
    if (e.target.checked) {
      setIsDisabledConfirmButton(false);
    }
    setIsChecked(true);
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
        label = "Asesor ténico y fecha de la cita";
        break;
      default:
        break;
    }
    return <div className="uppercase py-1 text-base font-bold">{label}</div>;
  };

  const showNextButton = () => {
    if (!formData.maintenanceId || !formData.observation || selected == "0") {
      return true;
    }
    return false;
  };
  console.log(formData);
  const swhowConfirModal = () => {
    return (
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="5xl">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                {texts.DATA_PROTECTION.title.first}
              </ModalHeader>
              <ModalBody>
                <p>{texts.DATA_PROTECTION.description.first}</p>
                <p>{texts.DATA_PROTECTION.description.second}</p>
                <p>{texts.DATA_PROTECTION.description.third}</p>
                <div className="flex py-2 px-1 justify-between">
                  <Checkbox
                    classNames={{
                      label: "text-small",
                    }}
                    color="warning"
                    checked={isChecked}
                    onChange={handleCheckboxChange}
                  >
                    <p>{texts.DATA_PROTECTION.accept}</p>
                  </Checkbox>
                </div>
              </ModalBody>
              <ModalFooter>
                <ButtonElement className="bg-white text-black" variant="light" onPress={onClose}>
                  Cancelar
                </ButtonElement>
                <ButtonElement
                  onPress={(e) => {
                    setSelected("1");
                    onClose();
                  }}
                  isDisabled={isDisabledConfirmButton}
                >
                  Consiento
                </ButtonElement>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    );
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
          {swhowConfirModal()}
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

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-4">
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
                            {field.label}: {formData[field.key]}{" "}
                            {field.key == "date" && formData.time}
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
