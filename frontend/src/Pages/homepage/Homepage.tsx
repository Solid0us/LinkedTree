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
      <div className="bg-linktr-dark-green text-linktr-lime min-h-screen flex flex-col pl-6 pr-pl-6 pt-40 lg:pt-52 xl:pt-96 items-center">
        <div className="flex flex-wrap gap-x-56 gap-y-20 justify-center">
          <div className="flex flex-wrap max-w-2xl justify-center">
            <IntroText />
            <QuickSignup />
          </div>
          <Figure />
        </div>
      </div>
    </>
  );
};

export default HomePage;
