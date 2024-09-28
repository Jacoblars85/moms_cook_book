import React, { useState, forwardRef } from "react";
import { Link } from "react-router-dom";
import LogOutButton from "../LogOutButton/LogOutButton";
import "./Nav.css";
import { useSelector, useDispatch } from "react-redux";
import Box from "@mui/material/Box";

function Nav(props) {
  const dispatch = useDispatch();

  const user = useSelector((store) => store.user.userReducer);

  return (
    <div className="nav">
      <Link to="/home">
        <h2 className="nav-title">Auth React Starter</h2>
      </Link>
      {/* If no user is logged in, show these links */}
      {!user.id && (
        // If there's no user, show login/registration links
        <Link className="navLink" to="/login">
          Login / Register
        </Link>
      )}

      {/* If a user is logged in, show these links */}
      {user.id && (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <h2>{user.username}</h2>
          <LogOutButton />
        </Box>
      )}
    </div>
  );
}

export default Nav;
