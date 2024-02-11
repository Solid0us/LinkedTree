import React from "react";
import Table from "react-bootstrap/Table";
import { useAuth } from "../../Context/AuthContext";

const Admin = () => {
  const auth = useAuth();
  console.log(auth.user);
  return (
    <>
      <h1>Welcome {auth.user.name}</h1>
    </>
  );
};

export default Admin;
