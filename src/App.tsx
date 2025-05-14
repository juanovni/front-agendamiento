import { useState } from "react";
import Layout from "./components/Layout/Layout";
import SearhVehicle from "./components/Scheduling/SearchVehicle";
import TypeServices from "./components/Scheduling/TypeServices";
import MechanicalWorkshops from "./components/Scheduling/MechanicalWorkshops";
import ScheduleCalendarSelector from "./components/Scheduling/ScheduleCalendarSelector";

function App() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    plate: "",
    brandId: "",
    modelId: "",
    name: "",
    email: "",
    phone: "",
    observation: "",
    servicesId: "",
    maintenanceId: "",
    mechanicId: "",
    time: "",
    date: "",
    advisorId:""
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
    </Layout>
  );
}

export default App;
