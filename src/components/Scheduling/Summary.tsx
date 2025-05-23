import { useState, ChangeEvent, JSX } from "react";
import {
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
import Swal from "sweetalert2";
import ButtonElement from "../Elements/ButtonElement";
import SectionTitle from "../Elements/SectionTitle";
import texts from "../../util/text";
import CardMechanicalWorkshop from "./Cards/CardMechanicalWorkshop";
import { saveSchedule } from "../../services/vechicleService";
import CardSection from "./Cards/CardSection";
import { PaginationButtons } from "./PaginationButtons/PaginationButtons";
import { CalendarIcon } from "../Icons/Calendar";

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

  const handleSaveForm = () => {
    if (formData.plate) {
      const payload: Schedule = {
        id_vehiculo: formData?.vehicleId,
        id_marca: formData.brandId,
        id_modelo: formData.modelId,
        id_taller: formData.mechanicId,
        id_tecnico: formData.advisorId,
        id_mantenimiento: formData.maintenanceId,
        id_correctivo: formData.servicesId,
        propietario: formData.name,
        email: formData.email,
        estado: 1,
        telefono: formData.phone,
        placa: formData.plate,
        fecha_agenda: formData.date,
        hora_agenda: formData.time,
        observacion: formData.observation,
      };
      createSchedule(payload);
    }
  };

  const createSchedule = async (payload: Schedule) => {
    const response = await saveSchedule(payload);
    if (response.success) {
      showAlert();
      console.log("Vehículo creado:", response.data);
    } else {
      console.error("Error al crear vehículo:", response.error);
    }
  };

  const showAlert = () => {
    let timerInterval;
    Swal.fire({
      title: "Autoagendamiento",
      text: "Estamos procesesando su solicitud espere unos segundos.",
      imageUrl:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRG5XWyGxaf9B5Fj1LX-JjK_QaEuLmoeP3NUg&s",
      imageWidth: 200,
      imageHeight: 200,
      imageAlt: "Custom image",
      timer: 2500,
      timerProgressBar: true,
      didOpen: () => {
        Swal.showLoading();
      },
      willClose: () => {
        clearInterval(timerInterval);
      },
    }).then((result) => {
      if (result.dismiss === Swal.DismissReason.timer) {
        Swal.fire({
          text: "Su cita fue agendada con éxito.",
          icon: "success",
          draggable: true,
        }).then((result) => {
          window.location.reload();
        });
      }
    });
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
                <ButtonElement
                  className="bg-white text-black"
                  variant="light"
                  onPress={onClose}
                >
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
      <PaginationButtons
        onPrev={prev}
        onNext={handleSaveForm}
        isNextDisabled={showNextButton()}
        nextLabel="Agendar"
        nextIcon={<CalendarIcon/>}
      />
      <CardSection>
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
              maintenanceList={formData.mechanicDetail.mantenimientos}
            ></CardMechanicalWorkshop>
            <div className="">
              <Accordion
                selectionMode="multiple"
                defaultExpandedKeys={["personalInfo", "services", "datetime"]}
              >
                {Object.entries(initialValues).map(([sectionName, fields]) => (
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
                ))}
              </Accordion>
            </div>
          </div>
        </div>
      </CardSection>
    </>
  );
};

export default Summary;
