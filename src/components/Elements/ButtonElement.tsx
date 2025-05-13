import { Button } from "@heroui/react";

interface Props {
  label: string;
  onPress?: () => void;
  isDisabled?: boolean;
}

const ButtonElement = ({ label, onPress, isDisabled }: Props) => {
  return (
    <Button
      onPress={onPress}
      variant="shadow"
      size="lg"
      radius="sm"
      className="font-semibold bg-black text-white"
      isDisabled={isDisabled}
    >
      {label}
    </Button>
  );
};

export default ButtonElement;
