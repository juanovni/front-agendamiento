import Nav from "../Nav/Nav";

interface Props {
  children: any;
}

const Layout = ({ children }: Props) => {
  return (
    <>
      <Nav />
      <div className="mx-auto py-6 lg:py-4">{children}</div>
    </>
  );
};

export default Layout;
