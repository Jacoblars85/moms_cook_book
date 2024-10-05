import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import "./HomePage.css";
import Nav from "../Nav/Nav";

function HomePage() {
  const history = useHistory();
  const dispatch = useDispatch();

  const user = useSelector((store) => store.user.userReducer);

  return (
    <div>
      <Nav />

      <h1>Welcome to Mom's Cookbook</h1>

      <button>My Recipes</button>
      <button>Account</button>
      <button>Browse Recipes</button>

    </div>
  );
}

export default HomePage;
