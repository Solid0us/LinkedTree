import { useState, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../../Context/AuthContext";
import UserAuth from "../../Services/auth";
import SubmitButton from "../../components/buttons/SubmitButton";
import VerticalForm from "../../components/form/VerticalForm";
import LinkedTreeLogo from "../../layouts/navbar/components/LinkedTreeLogo";
import GenericFormInput from "../../components/form/inputs/GenericFormInput";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const auth = useAuth();
  const navigate = useNavigate();

  const handleLogin = async () => {
    auth.login(email, password);
  };
  return (
    <div className="flex flex-row h-screen">
      <div className="main w-3/4 md:w-full">
        <div className="p-4">
          <LinkedTreeLogo />
        </div>
        <div className="flex flex-col items-center m-4 ">
          <div className="flex flex-col items-center">
            <h1 className="font-extrabold">Join LinkedTree</h1>
            <h5 className="text-gray-500">Sign up for free!</h5>
          </div>
          <div className="pl-2 pr-2 w-full">
            <VerticalForm>
              <GenericFormInput
                setState={setEmail}
                type="text"
                placeholder="Email"
              />
              <GenericFormInput
                setState={setPassword}
                type="password"
                placeholder="Password"
              />
              <GenericFormInput
                setState={setConfirmPassword}
                type="password"
                placeholder="Confirm Password"
              />

              <SubmitButton text="Create account" onClick={handleLogin} />
            </VerticalForm>
          </div>
        </div>
      </div>
      <div className="sideArt bg-yellow-600 w-1/2 max-lg:hidden"></div>
    </div>
  );
};

export default Signup;
