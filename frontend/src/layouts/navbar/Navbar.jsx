import { useState } from "react";
import { useAuth } from "../../Context/AuthContext";
import RequireAuthChildrenComponents from "../../components/auth/RequireAuthChildrenComponents";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import LinkedTreeLogo from "./components/LinkedTreeLogo";
import AnchorLink from "./components/AnchorLink";

const MainNav = () => {
  const auth = useAuth();
  const [hamburger, setHamburger] = useState(false);
  const toggleHamburger = (e) => {
    e.target.name = e.target.name === "menu" ? "close" : "menu";
  };
  const logout = () => {
    auth.logout();
  };
  return (
    <nav className="flex justify-between items-center absolute top-10 left-1/2 transform -translate-x-1/2  bg-slate-200 rounded-full pl-4 pr-4 h-20 mx-auto w-[95%]">
      <div className="nav-links md:static absolute md:min-h-fit min-h-[60vh] left-0 top-[-9%] md:w-auto w-full flex items-center">
        <a href="/" className="no-underline text-black">
          <LinkedTreeLogo />
        </a>
        <ul className="flex lg:flex-row flex-col md:items-center text-center md:gap-4 gap-8 mx-auto pt-3 ">
          <li>
            <AnchorLink href="/" text="Templates" />
          </li>
          <li>
            <AnchorLink href="/" text="Discover" />
          </li>
          <li>
            <AnchorLink href="/" text="Pricing" />
          </li>
          <li>
            <AnchorLink href="/" text="Learn" />
          </li>
          <li>
            <AnchorLink href="/admin" text="Admin" />
          </li>
        </ul>
      </div>
      <div className="flex items-center gap-6">
        <a href={`${auth.user ? "/admin" : "/login"}`} className="no-underline">
          <div className="bg-slate-300 p-3 rounded-md">
            <span className="text-black font-bold">
              {auth.user ? "Admin" : "Log in"}
            </span>
          </div>
        </a>
        {auth.user ? (
          <a href="/logout" className="no-underline">
            <div className="bg-black rounded-full  p-3">
              <span className="text-white">Logout</span>
            </div>
          </a>
        ) : (
          <a href="/signup" className="no-underline">
            <div className="bg-black rounded-full  p-3">
              <span className="text-white">Sign up free</span>
            </div>
          </a>
        )}
        {hamburger ? (
          <MenuIcon
            className="lg:hidden"
            onClick={() => setHamburger((prevState) => !prevState)}
          />
        ) : (
          <CloseIcon
            className="lg:hidden"
            onClick={() => setHamburger((prevState) => !prevState)}
          />
        )}
      </div>
    </nav>
  );
};

export default MainNav;
