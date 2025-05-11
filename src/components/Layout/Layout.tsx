import Nav from "../Nav/Nav";

interface Props {
  children: any;
}

const Layout = ({ children }: Props) => {
  return (
    <>
      <Nav />
      <div className="relative isolate">
        <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-20">
          <div className="text-center">
            {children}
          </div>
        </div>
      </div>
    </>
  );
};

export default Layout;
