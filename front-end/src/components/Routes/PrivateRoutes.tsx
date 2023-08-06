import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { RootState } from "../../types/reducersTypes";
type Props = {};
const PrivateRoutes = (props: Props) => {
  const { userInfo } = useSelector((state: RootState) => state.user);
  return userInfo ? <Outlet /> : <Navigate to={"/login"} />;
};
export default PrivateRoutes;
