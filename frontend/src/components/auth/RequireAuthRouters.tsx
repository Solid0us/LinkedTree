import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../Context/AuthContext";

type Props = {
  roles: string[];
};

const RequireAuthRouters = ({ roles }: Props) => {
  const auth = useAuth();
  const location = useLocation();
  console.log(
    `User is logged in: ${auth.loggedIn}. Loading user: ${auth.loadingUser}`
  );
  console.log("Require Auth:", auth.user);
  if (!auth.loadingUser) {
    if (auth.user) {
      if (roles.includes(auth.user.role)) {
        return <Outlet />;
      } else {
        return <Navigate to="/" state={{ from: location }} replace />;
      }
    } else {
      return <Navigate to="/login" state={{ from: location }} replace />;
    }
  }
};

export default RequireAuthRouters;
