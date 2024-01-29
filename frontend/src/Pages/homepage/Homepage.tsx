import { useAuth } from "../../Context/AuthContext";
import { CookiesProvider, useCookies } from "react-cookie";
import MainNav from "../../layouts/navbar/Navbar";
import IntroText from "./components/IntroText";
import QuickSignup from "./components/QuickSignup";
import Figure from "./components/Figure";

const HomePage = () => {
  const auth = useAuth();
  const [cookies, setCookie] = useCookies(["token"]);
  return (
    <>
      <MainNav />
      <div className="bg-linktr-dark-green text-linktr-lime min-h-screen flex flex-col pt-96 items-center">
        <div className="flex flex-wrap gap-56">
          <div className="flex flex-col max-w-2xl">
            <IntroText />
            <QuickSignup />
          </div>
          <div className="flex flex-wrap items-center">
            <Figure />
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;
