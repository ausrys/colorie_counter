import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
type Props = {};
const PrivateRoutes = (props: Props) => {
  const { userInfo } = useSelector((state) => state.user);
  return userInfo ? <Outlet /> : <Navigate to={"/login"} />;
};
export default PrivateRoutes;
