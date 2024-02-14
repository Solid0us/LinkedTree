import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../Context/AuthContext";
import SubmitButton from "../../components/buttons/SubmitButton";
import VerticalForm from "../../components/form/VerticalForm";
import GenericFormInput from "../../components/form/inputs/GenericFormInput";
import LinkedTreeLogo from "../../layouts/navbar/components/LinkedTreeLogo";
import SignupFigureLink from "../signup/components/SignupFigureLink";
import ForestTwoToneIcon from "@mui/icons-material/ForestTwoTone";
import AccountCircleSharpIcon from "@mui/icons-material/AccountCircleSharp";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const auth = useAuth();
  const navigate = useNavigate();

  const handleLogin = async () => {
    auth.login(email, password);
  };

  return (
    <div className="flex flex-row h-screen max-lg:flex-col">
      <div className="w-3/4 max-xl:w-full">
        <a href="/" className="no-underline text-black">
          <div className="p-4">
            <LinkedTreeLogo />
          </div>
        </a>
        <div className="flex flex-col items-center m-4">
          <div className="flex flex-col items-center">
            <h1 className="font-extrabold">Welcome Back</h1>
            <h5 className="text-gray-500">Log in to your LinkedTree</h5>
          </div>
          <VerticalForm>
            <GenericFormInput
              setState={setEmail}
              type="text"
              placeholder="Email"
              value={email}
            />
            <GenericFormInput
              setState={setPassword}
              type="password"
              placeholder="Password"
              value={password}
            />
            <SubmitButton text="Log in" onClick={handleLogin} />
          </VerticalForm>
        </div>
      </div>
      <div className="flex bg-fuchsia-200 w-1/2 max-lg:hidden items-center">
        {/* <div className="bg-purple-900 w-64 h-96 rounded-3xl m-auto flex flex-col items-center p-2">
          <AccountCircleSharpIcon className="text-white scale-300 mt-4 mb-5" />
          <SignupFigureLink text="YouTube" />
          <div className="bg-fuchsia-600 w-44 h-44 top-7  rounded-3xl relative -left-24 flex items-center">
            <div className="bg-white rounded-full w-full p-2 flex flex-row ">
              <ForestTwoToneIcon />
              <span>/LinkedTreeEnjoyer</span>
            </div>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default Login;
