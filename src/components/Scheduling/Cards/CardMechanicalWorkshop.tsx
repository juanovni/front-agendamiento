import { JSX } from "react";
import { Card, CardBody, CardHeader, Image } from "@heroui/react";

type CardMechanicalWorkshopProps = {
  children?: JSX.Element | JSX.Element[];
  className?: string;
  name?: string;
  city?: string | null;
  address?: string | null;
  phone?: string | null;
  isSelected?: boolean;
  sizeImage?: string | null;
  maintenanceList?: { id: number; nombre: string }[] | [];
};

const CardMechanicalWorkshop = ({
  children,
  className,
  name,
  city,
  address,
  phone,
  sizeImage = "h-32",
  isSelected = false,
  maintenanceList,
}: CardMechanicalWorkshopProps) => {
  return (
    <Card
      className={`cursor-pointer min-h-[440px] hover:shadow-xl ${
        isSelected ? "border-3 border-orange-400" : ""
      } ${className}`}
    >
      <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
        <h4 className="font-bold text-large">{name}</h4>
        <small className="text-default-500">{city}</small>
        <div className="flex items-center justify-center self-center m-4">
          <Image
            isBlurred
            className={`w-full object-contain ${sizeImage}`}
            alt="DGMotors"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRG5XWyGxaf9B5Fj1LX-JjK_QaEuLmoeP3NUg&s"
          />
        </div>
      </CardHeader>
      <CardBody className="overflow-visible py-2">
        <div className="uppercase ml-6 py-1 text-tiny font-bold">{address}</div>
        <div className="uppercase ml-6 py-1 text-tiny font-bold">{phone}</div>
        {children}
        {maintenanceList && (
          <div className="ml-10 py-2 mb-4">
            <ul className="list-disc">
              {maintenanceList?.map(({ id, nombre }) => (
                <li key={id}>{nombre}</li>
              ))}
            </ul>
          </div>
        )}
      </CardBody>
    </Card>
  );
};

export default CardMechanicalWorkshop;
