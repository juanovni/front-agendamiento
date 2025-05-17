import { Button, ButtonProps } from "@heroui/react";
import { FC, ReactNode } from "react";
import clsx from "clsx";

interface ButtonElementProps extends ButtonProps {
  children: ReactNode;
  className?: string;
}

const ButtonElement: FC<ButtonElementProps> = ({
  children,
  className,
  ...rest
}) => {
  return (
    <Button
      variant="shadow"
      size="lg"
      radius="sm"
      className={clsx("font-semibold bg-black text-white", className)}
      {...rest}
    >
      {children}
    </Button>
  );
};

export default ButtonElement;
