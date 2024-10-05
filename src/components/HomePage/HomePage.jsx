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

      <button onClick={() => history.push(`/my-recipes`)}>My Recipes</button>
      <button onClick={() => history.push(`/browse-recipes`)}>Browse Recipes</button>
      <button onClick={() => history.push(`/account`)}>Account</button>

    </div>
  );
}

export default HomePage;
