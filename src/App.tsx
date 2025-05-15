import { useState } from "react";
import Layout from "./components/Layout/Layout";
import SearhVehicle from "./components/Scheduling/SearchVehicle";
import TypeServices from "./components/Scheduling/TypeServices";
import MechanicalWorkshops from "./components/Scheduling/MechanicalWorkshops";
import ScheduleCalendarSelector from "./components/Scheduling/ScheduleCalendarSelector";
import Summary from "./components/Scheduling/Summary";

interface FormDataType {
  maintenanceId: number | null;
  servicesId: string[]; // o number[], depende del backend
  observation: string;
}

function App() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    plate: "",
    brandId: "",
    brandName: "",
    modelId: "",
    modelName: "",
    name: "",
    email: "",
    phone: "",
    observation: "",
    servicesId: [],
    maintenanceId: "",
    mechanicDetail: {},
    mechanicId: "",
    time: "",
    date: "",
    advisorId: "",
    advisorName: "",
  });

  const next = () => setStep((prev) => prev + 1);
  const prev = () => setStep((prev) => prev - 1);
  const updateFormData = (newData: Partial<typeof formData>) => {
    setFormData({ ...formData, ...newData });
  };

  return (
    <Layout>
      {step === 1 && (
        <SearhVehicle
          formData={formData}
          updateFormData={updateFormData}
          next={next}
        />
      )}
      {step === 2 && (
        <TypeServices
          formData={formData}
          updateFormData={updateFormData}
          next={next}
          prev={prev}
        />
      )}
      {step === 3 && (
        <MechanicalWorkshops
          formData={formData}
          updateFormData={updateFormData}
          next={next}
          prev={prev}
        />
      )}
      {step === 4 && (
        <ScheduleCalendarSelector
          formData={formData}
          updateFormData={updateFormData}
          next={next}
          prev={prev}
        />
      )}
      {step === 5 && (
        <Summary
          formData={formData}
          updateFormData={updateFormData}
          next={next}
          prev={prev}
        />
      )}
    </Layout>
  );
}

export default App;
