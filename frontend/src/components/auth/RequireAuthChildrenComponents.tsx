import { useAuth } from "../../Context/AuthContext";

type Props = {
  children: React.ReactNode;
  roles: string[];
};

const RequireAuthChildrenComponents = ({ children, roles }: Props) => {
  const auth = useAuth();
  const userRoles = auth.user.role;
  if (roles.includes(userRoles)) {
    return <>{children}</>;
  }
};

export default RequireAuthChildrenComponents;
