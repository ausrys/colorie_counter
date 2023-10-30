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
    } catch (error) {}
  };
  return (
    <nav className="bg-white text-black font-bold text-lg shadow-md w-full relative flex items-center">
      {userInfo !== null ? (
        <div className="flex items-center justify-between w-full px-6 py-4">
          <div>
            <h3 className="whitespace-nowrap">Hello, {userInfo.user_name}</h3>
          </div>
          <div className="space-x-4">
            <NavLink to={"/"} className="hover:underline">
              Home
            </NavLink>
            <NavLink to={"/meals"} className="hover:underline">
              Meals
            </NavLink>
            <NavLink to={"/statistics"} className="hover:underline">
              Statistics
            </NavLink>
            {userInfo.isAdmin === true ? (
              <NavLink to={"/products/add"} className="hover:underline">
                Add products
              </NavLink>
            ) : null}
          </div>
          <div className="px-2">
            <Button onClick={logOutHandler}>Logout</Button>
          </div>
        </div>
      ) : (
        <div className="w-full px-6 py-4 flex items-center justify-center space-x-4">
          <NavLink
            to={"/login"}
            className={({ isActive }) =>
              isActive
                ? "bg-teal-300 px-5 py-2 rounded-full"
                : "hover:underline"
            }
          >
            Login
          </NavLink>
          <NavLink
            to={"/register"}
            className={({ isActive }) =>
              isActive
                ? "bg-teal-300 px-5 py-2 rounded-full"
                : "hover:underline"
            }
          >
            Register
          </NavLink>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
