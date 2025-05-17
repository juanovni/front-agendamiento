import { FC } from "react";

interface SectionTitleProps {
  title: string;
  subTitle?: string;
}

const SectionTitle: FC<SectionTitleProps> = ({ title, subTitle }) => {
  return (
    <div className="mt-2 ml-4">
      <div className="text-xl font-medium tracking-tight text-gray-950">
        {title}
      </div>
      <div className="font-light text-sm">{subTitle}</div>
    </div>
  );
};

export default SectionTitle;
