import { useState, useContext, createContext, useEffect } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import UserAuth from "../Services/auth";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loadingUser, setLoadingUser] = useState(true);
  const [loggedIn, setLoggedIn] = useState(false);

  const signup = async (
    username: string,
    first_name: string,
    last_name: string,
    email: string,
    password: string,
    confirm_password: string
  ) => {
    try {
      const res = await UserAuth.signup({
        username,
        first_name,
        last_name,
        email,
        password,
        confirm_password,
      });
      setUser(res.data.user);
      navigate("/admin", { replace: true });
      navigate(0);
    } catch (err) {
      alert("Could not sign up.");
      console.log(err);
    }
  };

  const login = async (email: string, password: string) => {
    try {
      const res = await UserAuth.login({
        email,
        password,
      });
      setUser(res.data.user);
      navigate("/admin", { replace: true });
      navigate(0);
    } catch (err) {
      console.log(err);
      alert("Incorrect credentials");
    }
  };

  const logout = async () => {
    try {
      const res = await UserAuth.logout();
      setUser(null);
      navigate("/", { replace: true });
      navigate(0);
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
        signup,
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
