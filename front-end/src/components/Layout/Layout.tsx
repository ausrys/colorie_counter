import { Outlet } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";

const Layout = () => {
  return (
    <div className="min-h-screen text-center flex flex-col bg-neutral-200">
      <header>
        <Navbar />
      </header>
      <div className="flex flex-col flex-1">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
