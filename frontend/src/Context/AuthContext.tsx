import { useState, useContext, createContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import UserAuth from "../Services/auth";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loadingUser, setLoadingUser] = useState(true);
  const [loggedIn, setLoggedIn] = useState(false);

  const login = async (email: string, password: string) => {
    try {
      const res = await UserAuth.login({
        email,
        password,
      });
      setUser(res.data.user);
      navigate("/", { replace: true });
    } catch (err) {
      console.log(err);
      alert("Incorrect credentials");
    }
  };

  const logout = async () => {
    try {
      const res = await UserAuth.logout();
      setUser(null);
      navigate("/login");
    } catch (err) {
      console.log(err);
    }
  };

  const redirectLogin = () => {
    if (!user) {
      navigate("/login");
    }
  };
  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const res = await UserAuth.authenticate();
        setUser(res.data);
        setLoadingUser(false);
      } catch (err) {
        if (err.response) {
          setUser(null);
          setLoadingUser(false);
        }
      }
    };
    checkLoginStatus();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        redirectLogin,
        loggedIn,
        loadingUser,
        setUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
