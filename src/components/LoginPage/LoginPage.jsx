import React from "react";
import LoginForm from "../LoginForm/LoginForm";
import { useHistory } from "react-router-dom";

function LoginPage() {
  const history = useHistory();

  return (
    <div>
      <center>
        <h1>Mom's Cookbook</h1>

        <LoginForm />
      </center>
    </div>
  );
}

export default LoginPage;
