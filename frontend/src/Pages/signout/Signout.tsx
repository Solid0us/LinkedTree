import { useEffect } from "react";
import { useAuth } from "../../Context/AuthContext";

const Signout = () => {
  const auth = useAuth();
  useEffect(() => {
    auth.logout();
  }, []);
  return <></>;
};

export default Signout;
