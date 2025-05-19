import { JSX } from "react";
import { Card, CardBody, Divider, CardHeader } from "@heroui/react";
import { VehicleIcon } from "../../Icons/VehicleIcon";
import texts from "../../../util/text";

type CardProps = {
  children?: JSX.Element | JSX.Element[];
  style?: string;
  alert?: JSX.Element | null;
};

const CardSection = ({ children, style = "max-w-6xl", alert }: CardProps) => {
  return (
    <>
      <Card className={`m-auto ${style}`}>
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
          {children}
          {alert && <div className="mb-4">{alert}</div>}
        </CardBody>
      </Card>
    </>
  );
};

export default CardSection;
