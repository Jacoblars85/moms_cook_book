import React from "react";
import LoginForm from "../LoginForm/LoginForm";
import { useHistory } from "react-router-dom";

function LoginPage() {
  const history = useHistory();

  return (
      <div>

          <h1>Mom's Cookbook</h1>

        <LoginForm />

        <center>
          <button
            type="button"
            className="btn btn_asLink"
            onClick={() => {
              history.push("/registration");
            }}
          >
            Register
          </button>
        </center>
      </div>
  );
}

export default LoginPage;
