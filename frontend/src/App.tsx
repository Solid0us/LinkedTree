import "./App.scss";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  Outlet,
} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { AuthProvider } from "./Context/AuthContext";
import HomePage from "./Pages/homepage/Homepage";
import Admin from "./Pages/admin/Admin";
import Login from "./Pages/login/Login";
import { CookiesProvider, useCookies } from "react-cookie";
import RequireAuthRouters from "./components/auth/RequireAuthRouters";
import Signup from "./Pages/signup/Signup";
import Signout from "./Pages/signout/Signout";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <CookiesProvider>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route element={<RequireAuthRouters roles={["ADMIN", "USER"]} />}>
              <Route path="/admin" element={<Admin />} />
            </Route>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/signout" element={<Signout />} />
          </Routes>
        </CookiesProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
