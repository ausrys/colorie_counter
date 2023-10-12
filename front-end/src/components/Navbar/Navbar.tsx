import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import Button from "../Reusable Components/Button";
import { logOutUser } from "../../reducers/userReducers/userReducer";
import axios from "axios";
import { RootState } from "../../types/reducersTypes";

const Navbar = () => {
  const { userInfo } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logOutHandler = async () => {
    try {
      await axios.post(`${import.meta.env.VITE_BACKEND_URL}/logout`, {
        withCredentials: true,
      });
      dispatch(logOutUser());
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <nav className="bg-white text-black font-bold font-sans text-lg shadow-lg w-full relative flex flex-row items-center">
      {userInfo !== null ? (
        <>
          <div>
            <h3 className="px-7 whitespace-nowrap">
              Hello, {userInfo.user_name}
            </h3>
          </div>
          <div className="container ml-auto px-4 py-5">
            <NavLink to={"/"}> Home </NavLink>
            <NavLink to={"/meals"}> Meals</NavLink>
            <NavLink to={"/statistics"}> Statistics </NavLink>
            {userInfo.isAdmin === true ? (
              <NavLink to={"/products/add"}> Add products </NavLink>
            ) : null}
          </div>
          <div className="ml-auto px-7 py-5">
            <Button onClick={logOutHandler}>Logout</Button>
          </div>
        </>
      ) : (
        <div className="flex flex-row justify-center px-7 py-5 w-full">
          <NavLink
            className={({ isActive }) =>
              isActive ? "px-5 bg-slate-200" : "px-5"
            }
            to={"/login"}
          >
            Login
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              isActive ? "px-5 bg-slate-200" : "px-5"
            }
            to={"/register"}
          >
            Register
          </NavLink>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
