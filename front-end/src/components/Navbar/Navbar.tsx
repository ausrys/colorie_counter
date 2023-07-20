import { ReactNode } from "react";
import { NavLink } from "react-router-dom";

const Navbar = (props: any) => {
  return (
    <nav className="bg-white text-black font-bold font-sans text-lg shadow-lg w-full relative">
      <div className="container mx-auto px-4 py-5">
        <NavLink to={"/"}> Home </NavLink>
        <NavLink to={"/meals"}> Meals</NavLink>
        <NavLink to={"/statistics"}> Statistics </NavLink>
      </div>
    </nav>
  );
};

export default Navbar;
