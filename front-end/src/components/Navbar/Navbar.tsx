import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

const Navbar = (props: Props) => {
  return (
    <nav className="bg-white text-black font-bold font-sans text-lg shadow-lg fixed w-full relative">
      <div className="container mx-auto px-4 py-5">{props.children}</div>
    </nav>
  );
};

export default Navbar;
