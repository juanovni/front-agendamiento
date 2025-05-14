import { useState, useEffect, ChangeEvent } from "react";
import {
  Card,
  CardBody,
  Divider,
  Select,
  SelectItem,
  CardHeader,
  Calendar,
  User,
} from "@heroui/react";
import { getServices } from "../../services/TypesServcies";
import { VehicleIcon } from "../Icons/VehicleIcon";
import texts from "../../util/text";
import { getMaintenances } from "../../services/maintenanceService";
import ButtonElement from "../Elements/ButtonElement";
import DatePicker from "react-datepicker";
import { format, getDay } from "date-fns";
import "react-datepicker/dist/react-datepicker.css";
import {
  today,
  getLocalTimeZone,
  isWeekend,
  getWeeksInMonth,
  getDayOfWeek,
} from "@internationalized/date";
import { useLocale } from "@react-aria/i18n";
import { getAdvisorsByMechanicalWokshops } from "../../services/advisorService";

// Horarios por día de la semana (0: domingo, 1: lunes, ..., 6: sábado)
const disponibilidad: { [dia: number]: string[] } = {
  0: [], // Domingo
  1: [
    "09:00",
    "10:00",
    "11:00",
    "14:00",
    "15:00",
    "16:00",
    "17:00",
    "18:00",
    "19:00",
    "20:00",
  ], // Lunes
  2: ["10:00", "12:00", "15:00"], // Martes
  3: ["08:00", "13:00", "16:00"], // Miércoles
  4: ["09:30", "11:30", "17:00"], // Jueves
  5: ["10:00", "14:00", "18:00"], // Viernes
  6: ["09:00", "12:00"], // Sábado
};

interface Props {
  formData: any;
  updateFormData: (data: Partial<any>) => void;
  next: () => void;
  prev: () => void;
}

const ScheduleCalendarSelector = ({
  formData,
  updateFormData,
  next,
  prev,
}: Props) => {
  const [advisors, setAdvisors] = useState<Advisor[]>([]);
  let { locale } = useLocale();

  let [date, setDate] = useState(today(getLocalTimeZone()));
  let isInvalid = isWeekend(date, locale);
  let dayOfWeek = getDayOfWeek(date, locale);
  const [horaSeleccionada, setHoraSeleccionada] = useState<string | null>(null);

  const diaSemana = dayOfWeek ? getDayOfWeek(date, locale) : 1; // default lunes
  const horasDisponibles = disponibilidad[diaSemana];

  useEffect(() => {
    if (formData.mechanicId)
      fetchAdvisorsByMechanicalWorkshopId(formData.mechanicId, (res) => {
        setAdvisors(res);
      });
  }, []);

  const fetchAdvisorsByMechanicalWorkshopId = async (
    advisorId: string,
    callback?: (data: Advisor[]) => void
  ) => {
    const response = await getAdvisorsByMechanicalWokshops(advisorId);
    if (response.success && response.data) {
      if (callback) callback(response.data);
    }
  };

  const manejarSeleccionHora = (hora: string) => {
    setHoraSeleccionada(hora);
  };

  const _renderLabel = (text: string, styles?: string) => (
    <div className={styles}>{text}</div>
  );

  return (
    <>
      <div className="w-full flex justify-end gap-2 pr-4 mb-4">
        <ButtonElement label="Anterior" onPress={prev} />
        <ButtonElement label="Siguiente" onPress={next} />
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
                "Horarios Disponibles",
                "text-xl font-medium tracking-tight text-gray-950"
              )}
              {_renderLabel(
                "Seleccione el horario que va a realizar el mantenimiento",
                "font-light text-sm"
              )}
            </div>
          </div>
          <div className="flex justify-center gap-4 items-center mb-4">
            <div className="w-full md:w-80">
              <Select
                isRequired
                label="Asesor Ténico"
                size="sm"
                placeholder="Seleccione un asesor"
              >
                {advisors.map((advisor) => (
                  <SelectItem key={advisor.id}>{advisor.nombre}</SelectItem>
                ))}
              </Select>
            </div>
          </div>
          <User
            avatarProps={{
              src: "https://i.pravatar.cc/150?u=a04258114e29026702d",
            }}
            description="Product Designer"
            name="Jane Doe"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 py-6">
            <div className="text-end">
              <Calendar
                showMonthAndYearPickers
                onChange={(date) => {
                  setDate(date);
                  setHoraSeleccionada(null);
                }}
                aria-label="Date (Min Date Value)"
                defaultValue={today(getLocalTimeZone())}
                minValue={today(getLocalTimeZone())}
              />
            </div>
            <div>
              <p className="font-medium mb-2">Horas disponibles:</p>
              {horasDisponibles.length === 0 ? (
                <p className="text-gray-500">
                  No hay horas disponibles para este día
                </p>
              ) : (
                <div className="flex flex-wrap gap-2">
                  {horasDisponibles.map((hora) => (
                    <button
                      key={hora}
                      onClick={() => manejarSeleccionHora(hora)}
                      className={`px-3 py-1 rounded border ${
                        hora === horaSeleccionada
                          ? "bg-blue-600 text-white"
                          : "bg-gray-100 hover:bg-gray-200"
                      }`}
                    >
                      {hora}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {horaSeleccionada && date && (
            <div className="mt-4 p-2 bg-green-100 border border-green-400 rounded">
              Has seleccionado:{" "}
              {/* <strong>
                    {format(date, "EEEE dd/MM/yyyy")}
                  </strong>{" "} */}
              a las <strong>{horaSeleccionada}</strong>
            </div>
          )}
        </CardBody>
      </Card>
    </>
  );
};

export default ScheduleCalendarSelector;
