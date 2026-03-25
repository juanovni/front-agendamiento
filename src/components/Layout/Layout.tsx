import { ReactNode } from "react";
import Nav from "../Nav/Nav";

interface Props {
  children: ReactNode;
}

const Layout = ({ children }: Props) => {
  return (
    <div className="w-full m-auto">
      <Nav />
      <div className="mx-auto py-6 lg:py-4">{children}</div>
    </div>
  );
};

export default Layout;
