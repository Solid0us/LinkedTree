import { useState } from "react";
import { useAuth } from "../../Context/AuthContext";
import RequireAuthChildrenComponents from "../../components/auth/RequireAuthChildrenComponents";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import LinkedTreeLogo from "./components/LinkedTreeLogo";
import AnchorLink from "./components/AnchorLink";
import NavBarSkeleton from "./components/NavBarSkeleton";

const MainNav = () => {
  const auth = useAuth();
  const [hamburger, setHamburger] = useState(true);
  const [hide, setHide] = useState(true);
  const toggleSideNav = () => {
    setHide((prevState) => !prevState);
  };
  const toggleHamburger = () => {
    setHamburger((prevState) => !prevState);
    toggleSideNav();
  };
  const logout = () => {
    auth.logout();
  };
  return (
    <>
      <NavBarSkeleton>
        <div className="md:px-10  md:flex justify-between items-center">
          <a href="/" className="no-underline text-black">
            <LinkedTreeLogo />
          </a>
          <ul
            className={`hidden lg:visible
         lg:flex lg:flex-row lg:relative lg:bg-white lg:w-full lg:no-underline lg:text-base lg:translate-x-0 transition-all duration-500 ease-in-out`}
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
          <a
            href={`${auth.user ? "/admin" : "/login"}`}
            className="no-underline"
          >
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
          <div className="flex lg:hidden">
            {hamburger ? (
              <MenuIcon className="hidden" onClick={toggleHamburger} />
            ) : (
              <CloseIcon className="hidden" onClick={toggleHamburger} />
            )}
          </div>
        </div>
      </NavBarSkeleton>

      <div
        className={`fixed top-0 right-0 bg-green-400 w-screen h-screen ${
          hide ? "translate-x-full" : "translate-x-0"
        } transition-all duration-500 ease-in-out z-100 lg:translate-x-full`}
      >
        <ul className="flex flex-col mt-32 text-3xl">
          <li className="">
            <AnchorLink href="/" text="Templates" />
          </li>
          <div className="border-solid border border-black bg-black w-11/12 h-0.5"></div>
          <li className="">
            <AnchorLink href="/" text="Discover" />
          </li>
          <div className="border-solid border border-black bg-black w-11/12 h-0.5"></div>
          <li className="">
            <AnchorLink href="/" text="Pricing" />
          </li>
          <div className="border-solid border border-black bg-black w-11/12 h-0.5"></div>
          <li className="">
            <AnchorLink href="/" text="Learn" />
          </li>
          <div className="border-solid border border-black bg-black w-11/12 h-0.5"></div>
        </ul>
      </div>
    </>
  );
};

export default MainNav;
