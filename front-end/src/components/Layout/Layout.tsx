import { Outlet } from "react-router-dom";
import Navbar from "../Navbar/Navbar";

type Props = {};

const Layout = (props: Props) => {
  return (
    <div className="min-h-screen flex flex-col">
      <header>
        <Navbar />
      </header>
      <Outlet />
    </div>
  );
};

export default Layout;
