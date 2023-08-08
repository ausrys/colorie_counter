import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { RootState } from "../../types/reducersTypes";
type Props = {};
const AdminRoute = (props: Props) => {
  const { userInfo } = useSelector((state: RootState) => state.user);
  return userInfo.isAdmin === true ? <Outlet /> : <Navigate to={"/"} />;
};
export default AdminRoute;
