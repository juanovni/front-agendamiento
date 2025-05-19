import { useState, useEffect, ChangeEvent } from "react";
import {
  Select,
  SelectItem,
  Calendar,
  User,
  Alert,
  addToast,
} from "@heroui/react";
import "react-datepicker/dist/react-datepicker.css";
import { today, getLocalTimeZone, getDayOfWeek } from "@internationalized/date";
import { useLocale } from "@react-aria/i18n";
import { getAdvisorsByMechanicalWokshops } from "../../services/advisorService";
import SectionTitle from "../Elements/SectionTitle";
import CardSection from "./Cards/CardSection";
import { PaginationButtons } from "./PaginationButtons/PaginationButtons";

const disponibilidad: { [dia: number]: string[] } = {
  0: [], //Sunday
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
  ], // Monday
  2: ["10:00", "12:00", "15:00"], // Sunday
  3: ["08:00", "13:00", "16:00"], // Wednesday
  4: ["09:30", "11:30", "17:00"], // Thursday
  5: ["10:00", "14:00", "18:00"], // Friday
  6: ["09:00", "12:00"], // Saturday
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
  const [advisorsAvatars, setAdvisorsAvatars] = useState<Advisor[] | []>([]);
  const allAdvisor: Advisor = {
    id: "",
    guid: "",
    nombre: "Todos",
    estado: "",
  };
  let { locale } = useLocale();
  let [date, setDate] = useState(today(getLocalTimeZone()));
  let dayOfWeek = getDayOfWeek(date, locale);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const availableHours = disponibilidad[dayOfWeek];

  useEffect(() => {
    if (formData.mechanicId)
      fetchAdvisorsByMechanicalWorkshopId(formData.mechanicId);
  }, [formData.mechanicId]);

  const fetchAdvisorsByMechanicalWorkshopId = async (advisorId: string) => {
    const response = await getAdvisorsByMechanicalWokshops(advisorId);
    if (response.success && response.data) {
      const advisorProcess = response.data.map((adv) => {
        return adv;
      });
      //setAdvisors([allAdvisor, ...advisorProcess]);
      setAdvisors([...advisorProcess]);
      setAdvisorsAvatars([...advisorProcess]);
    }
  };

  const handleDateChange = (date: any) => {
    setDate(date);
    setSelectedTime(null);
    updateFormData({ date: date.toString() });
  };

  const handleHourClick = (hour: string) => {
    setSelectedTime(hour);
    updateFormData({ time: hour });
    addToast({
      title: "Taller!",
      description: `Has seleccionado as las ${hour} para su agendamiento vehicular.`,
      timeout: 2000,
      shouldShowTimeoutProgress: true,
    });
  };

  const handleAdvisorChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const advisorId = e.target.value;
    if (advisorId == "") {
      setAdvisorsAvatars(
        advisors.filter((advisor) => advisor.id != "").map((advisor) => advisor)
      );
    } else {
      const advisorProcess = advisors
        .filter((advi) => advi.id == advisorId)
        .map((advisor) => advisor);
      setAdvisorsAvatars([...advisorProcess]);
    }
    const advisorSelected = advisors.find(
      (ad) => parseInt(ad.id) == Number(advisorId)
    );
    updateFormData({ advisorId, advisorName: advisorSelected?.nombre });
  };

  const _renderLabel = (text: string, styles?: string) => (
    <div className={styles}>{text}</div>
  );

  const showNextButton = () => {
    if (!formData.advisorId || !formData.date || !formData.time) {
      return true;
    }
    return false;
  };

  const scheduleAlert =
    selectedTime && date ? (
      <Alert
        className="p-2"
        title={`Has seleccionado a las ${selectedTime} para su agendamiento vehicular.`}
      />
    ) : null;

  const _renderAvatarImage = (item: any) => {
    return (
      <User
        key={item.id}
        avatarProps={{
          src: "https://avatars.githubusercontent.com/u/30373425?v=4",
        }}
        description="Asesor Ténico"
        name={item.nombre}
      />
    );
  };

  return (
    <>
      <PaginationButtons
        onPrev={prev}
        onNext={next}
        isNextDisabled={showNextButton()}
      />
      <CardSection alert={scheduleAlert}>
        <SectionTitle
          title="Horarios Disponibles"
          subTitle="Seleccione el horario que va a realizar el mantenimiento"
        />
        <div className="flex justify-center gap-4 items-center mb-4">
          <div className="w-full md:w-80">
            <Select
              isRequired
              label="Asesor Ténico"
              size="sm"
              placeholder="Seleccione un asesor"
              onChange={handleAdvisorChange}
            >
              {advisors.map((advisor) => (
                <SelectItem key={advisor.id}>{advisor.nombre}</SelectItem>
              ))}
            </Select>
          </div>
        </div>
        <div className="flex gap-4 px-4 py-1">
          {advisorsAvatars.map((item) => _renderAvatarImage(item))}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 py-2">
          <div className="text-center md:text-end">
            <Calendar
              showMonthAndYearPickers
              onChange={(date) => handleDateChange(date)}
              aria-label="Date (Min Date Value)"
              defaultValue={today(getLocalTimeZone())}
              minValue={today(getLocalTimeZone())}
            />
          </div>
          <div>
            {_renderLabel("Horas disponibles:", "font-medium mb-2")}
            {availableHours.length === 0 ? (
              _renderLabel("No hay horas disponibles para este día")
            ) : (
              <div className="flex flex-wrap gap-2">
                {availableHours.map((hour) => (
                  <button
                    key={hour}
                    onClick={() => handleHourClick(hour)}
                    className={`px-3 py-1 rounded border ${
                      hour === selectedTime
                        ? "bg-blue-600 text-white"
                        : "bg-gray-100 hover:bg-gray-200"
                    }`}
                  >
                    {hour}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </CardSection>
    </>
  );
};

export default ScheduleCalendarSelector;
