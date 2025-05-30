export const routes = {
  brand: {
    //v1.0
    all: "/v1/brands",
  },
  models: {
    //v1.0
    modelByBrand: "/v1/models/brand",
  },
  vehicle: {
    //v1.0
    searchByPlate: "/v1/vehicles/plate",
    saveForm: "v1/vehicles/store/",
  },
  services: {
    //v1.0
    all: "/v1/services",
  },
  mechanicalWorkshops: {
    all: "/v1/mechanical_workshops",
  },
  maintenance: {
    all: "/v1/maintenances",
  },
  advisor: {
    advisorsByMechanicalWokshops: "/v1/advisors/mechanical-workshop",
  },
  workSchedules: {
    getWorkSchedules: "/v1/work-schedules/",
  },
};
