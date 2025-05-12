import { SearchIcon } from "./components/Icons/SearchIcon";
import { VehicleIcon } from "./components/Icons/VehicleIcon";
import Layout from "./components/Layout/Layout";
import texts from "./util/text";
import {
  Card,
  CardBody,
  Divider,
  Button,
  Input,
} from "@heroui/react";

function App() {
  const handleSearchVehicle = () => {
    alert("Busqueda");
  };

  return (
    <Layout>
      <h1 className="text-5xl font-semibold tracking-tight text-balance text-gray-900 sm:text-3xl">
        {texts.BUSINESS.project}
      </h1>
      <Divider className="my-4" />
      <Card className="w-full">
        <CardBody>
          <div className="flex justify-center gap-4 items-center p-2">
            <div className="w-96">
              <Input
                isClearable
                startContent={<VehicleIcon />}
                label="Placa"
                labelPlacement="outside"
                placeholder="GNY1234"
                description="Por favor digite la placa del vehículo"
                size="lg"
              />
            </div>
            <div>
              <Button
                isIconOnly
                className="bg-orange-600 hover:bg-orange-600 text-white p-2 rounded-full shadow-md"
                onPress={handleSearchVehicle}
              >
                <SearchIcon/>
              </Button>
            </div>
          </div>
        </CardBody>
        <Divider />
      </Card>
    </Layout>
  );
}

export default App;
