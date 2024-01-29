import { useState, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../../Context/AuthContext";
import UserAuth from "../../Services/auth";
import SubmitButton from "../../components/buttons/SubmitButton";
import VerticalForm from "../../components/form/VerticalForm";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const auth = useAuth();
  const navigate = useNavigate();

  const handleLogin = async () => {
    auth.login(email, password);
  };

  return (
    <div className="pl-2 pr-2">
      <VerticalForm>
        <label>
          Email:{" "}
          <input
            className="outline outline-2 outline-slate-200 rounded-sm m-3"
            type="text"
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <label>
          Password:{" "}
          <input
            className="outline outline-2 outline-slate-200 rounded-sm m-3"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <SubmitButton text="Log in" onClick={handleLogin} />
      </VerticalForm>
    </div>
  );
};

export default Login;
