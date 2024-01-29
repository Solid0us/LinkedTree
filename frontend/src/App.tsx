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
import MainNav from "./layouts/navbar/Navbar";
import Admin from "./Pages/admin/Admin";
import Login from "./Pages/login/Login";
import { CookiesProvider, useCookies } from "react-cookie";
import RequireAuthRouters from "./components/auth/RequireAuthRouters";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <CookiesProvider>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route element={<RequireAuthRouters roles={["ADMIN"]} />}>
              <Route path="/admin" element={<Admin />} />
            </Route>
            <Route path="/login" element={<Login />} />
          </Routes>
        </CookiesProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
