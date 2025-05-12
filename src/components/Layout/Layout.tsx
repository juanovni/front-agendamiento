import Nav from "../Nav/Nav";

interface Props {
  children: any;
}

const Layout = ({ children }: Props) => {
  return (
    <>
      <Nav />
      <div className="mx-auto max-w-6xl py-32 sm:py-48 lg:py-12">
        <div className="text-center">{children}</div>
      </div>
    </>
  );
};

export default Layout;
