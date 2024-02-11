import { useState } from "react";
import { useAuth } from "../../Context/AuthContext";
import AccountCircleSharpIcon from "@mui/icons-material/AccountCircleSharp";
import SubmitButton from "../../components/buttons/SubmitButton";
import VerticalForm from "../../components/form/VerticalForm";
import LinkedTreeLogo from "../../layouts/navbar/components/LinkedTreeLogo";
import GenericFormInput from "../../components/form/inputs/GenericFormInput";
import SignupFigureLink from "./components/SignupFigureLink";
import ForestTwoToneIcon from "@mui/icons-material/ForestTwoTone";

console.log(import.meta.env);

const Signup = () => {
  const params = new URLSearchParams(document.location.search);
  const [username, setUsername] = useState(
    `${params.get("username") ? params.get("username") : ""}`
  );
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const auth = useAuth();

  const handleSignup = async () => {
    await auth.signup(
      username,
      firstName,
      lastName,
      email,
      password,
      confirmPassword
    );
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
            <h1 className="font-extrabold">Join LinkedTree</h1>
            <h5 className="text-gray-500">Sign up for free!</h5>
          </div>
          <div className="pl-2 pr-2 w-full">
            <VerticalForm>
              <GenericFormInput
                setState={setUsername}
                type="text"
                placeholder="Username"
                value={username}
              />
              <div className="flex flex-row justify-between">
                <GenericFormInput
                  setState={setFirstName}
                  type="text"
                  placeholder="First Name"
                  value={firstName}
                />
                <GenericFormInput
                  setState={setLastName}
                  type="text"
                  placeholder="Last Name"
                  value={lastName}
                />
              </div>
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
              <GenericFormInput
                setState={setConfirmPassword}
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
              />

              <SubmitButton text="Create account" onClick={handleSignup} />
            </VerticalForm>
          </div>
        </div>
      </div>
      <div className="flex bg-yellow-600 w-1/2 max-lg:hidden items-center">
        <div className="bg-amber-900 w-64 h-96 rounded-3xl m-auto flex flex-col items-center p-2">
          <AccountCircleSharpIcon className="text-white scale-300 mt-4 mb-5" />
          <SignupFigureLink text="YouTube" />
          <div className="bg-fuchsia-600 w-44 h-44 top-7  rounded-3xl relative -left-24 flex items-center">
            <div className="bg-white rounded-full w-full p-2 flex flex-row ">
              <ForestTwoToneIcon />
              <span>/LinkedTreeEnjoyer</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
