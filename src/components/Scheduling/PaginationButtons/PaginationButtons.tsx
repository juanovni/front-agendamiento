import { ChevronRight } from "../../Icons/ChevronRight";
import { ChevronLeft } from "../../Icons/ChevronLeft";
import ButtonElement from "../../Elements/ButtonElement";
import { JSX } from "react";

interface PaginationButtonsProps {
  onPrev?: () => void;
  onNext?: () => void;
  isNextDisabled?: boolean;
  isPrevDisabled?: boolean;
  prevLabel?: string;
  nextLabel?: string;
  hidePrev?: boolean;
  hideNext?: boolean;
  nextIcon?: JSX.Element;
}

export const PaginationButtons = ({
  onPrev,
  onNext,
  isNextDisabled = false,
  isPrevDisabled = false,
  prevLabel = "Anterior",
  nextLabel = "Siguiente",
  hidePrev = false,
  hideNext = false,
  nextIcon = <ChevronRight />,
}: PaginationButtonsProps) => {
  return (
    <div className="w-full flex justify-end gap-2 pr-4 mb-4">
      <div className="flex justify-between gap-2">
        {!hidePrev && (
          <ButtonElement onPress={onPrev} isDisabled={isPrevDisabled}>
            <div className="flex justify-center gap-2 items-center">
              <ChevronLeft />
              {prevLabel}
            </div>
          </ButtonElement>
        )}
        {!hideNext && (
          <ButtonElement onPress={onNext} isDisabled={isNextDisabled}>
            <div className="flex justify-center gap-2 items-center">
              {nextLabel}
              {nextIcon}
            </div>
          </ButtonElement>
        )}
      </div>
    </div>
  );
};
