import { useState } from "react";
import { useAuth } from "../../Context/AuthContext";
import RequireAuthChildrenComponents from "../../components/auth/RequireAuthChildrenComponents";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import LinkedTreeLogo from "./components/LinkedTreeLogo";
import AnchorLink from "./components/AnchorLink";

const MainNav = () => {
  const auth = useAuth();
  const [hamburger, setHamburger] = useState(true);
  const toggleHamburger = (e) => {
    e.target.name = e.target.name === "menu" ? "close" : "menu";
  };
  const logout = () => {
    auth.logout();
  };
  const [hide, setHide] = useState(true);
  return (
    <nav
      className="flex justify-between items-center fixed top-10 left-1/2 transform -translate-x-1/2  bg-slate-200 rounded-full pl-4 pr-4 h-20 mx-auto w-[95%]"
      onClick={() => setHide((prevState) => !prevState)}
    >
      {/* <div className="nav-links md:static relative md:min-h-fit min-h-[60vh] left-0 top-[-9%] md:w-auto w-full flex items-center"> */}
      <div className="md:px-10 py-4 px-7 md:flex justify-between items-center">
        <a href="/" className="no-underline text-black">
          <LinkedTreeLogo />
        </a>
        <ul
          className={`absolute top-full right-0 w-screen overflow-visible text-3xl bg-green-400 underline underline-offset-8 ${
            hide ? "invisible translate-x-full" : "translate-x-0"
          } 
         lg:flex lg:flex-row lg:relative lg:bg-slate-200 lg:w-full lg:no-underline lg:text-base lg:translate-x-0 transition-all duration-500 ease-in-out`}
        >
          <li className="pl-5">
            <AnchorLink href="/" text="Templates" />
          </li>
          <li className="pl-5">
            <AnchorLink href="/" text="Discover" />
          </li>
          <li className="pl-5">
            <AnchorLink href="/" text="Pricing" />
          </li>
          <li className="pl-5">
            <AnchorLink href="/" text="Learn" />
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
          <a href="/signout " className="no-underline">
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
            className="hidden"
            onClick={() => setHamburger((prevState) => !prevState)}
          />
        ) : (
          <CloseIcon
            className="hidden"
            onClick={() => setHamburger((prevState) => !prevState)}
          />
        )}
      </div>
    </nav>
  );
};

export default MainNav;
