import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { loginUser } from "../../redux/actions/userActions";
import { useEffect } from "react";
import { createBrowserHistory } from "history";
import Cookies from "js-cookie";
import { Alert } from "@mui/material";
import { getToCART } from "../../redux/actions/cartActions";

const Login = () => {
  // const toast = useToast();
  const history = createBrowserHistory();

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const loginSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser(loginData));
  };

  const { isAunthenticated, loading, error } = useSelector(
    (state) => state?.user
  );

  console.log("error", error);
  useEffect(() => {
    if (isAunthenticated == true) {
      navigate("/");
      dispatch(getToCART());
    }
  }, [isAunthenticated, error]);

  return (
    <>
      {/* <div className="main-login">
        <form className="login" onSubmit={loginSubmit}>
          <h2>Welcome, User!</h2>
          <p>Please log in</p>
          <input
            type="text"
            placeholder="Email"
            value={loginData.email}
            onChange={(e) => {
              setLoginData({ ...loginData, email: e.target.value });
            }}
          />

          <input
            type="password"
            placeholder="Password"
            value={loginData.password}
            onChange={(e) => {
              setLoginData({ ...loginData, password: e.target.value });
            }}
          />
          <input type="submit" value="Log In" />
          <div className="links">
            <a href="#">Forgot password</a>
            <NavLink to="/register">Register</NavLink>
          </div>
        </form>
      </div> */}

      <div className="auth-widget">
        <div className="auth-widget-box">
          <h3>Welcome</h3>
          <p>Login to Hike Fashion</p>
          {error?.success == false &&
            error?.message == "Incorrect password" && (
              <Alert severity="error">Invalid Passowrd</Alert>
            )}
          {error?.success == false && error?.message == "User not found" && (
            <Alert severity="error">User Not Found</Alert>
          )}
          <div className="login-form">
            <form onSubmit={loginSubmit}>
              <label htmlFor="clientid">Email ID</label>
              <input
                type="text"
                id="clientid"
                placeholder="Email"
                value={loginData.email}
                onChange={(e) => {
                  setLoginData({ ...loginData, email: e.target.value });
                }}
                required
              />
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                placeholder="Password"
                value={loginData.password}
                onChange={(e) => {
                  setLoginData({ ...loginData, password: e.target.value });
                }}
                required
              />
              <div className="remember-forgot row">
                <div className="col-6 left">
                  <label
                    style={{ textDecoration: "underline", margin: "10px 0 " }}
                  >
                    {" "}
                    <NavLink to="/register">Sign Up</NavLink>
                  </label>
                </div>
                <div className="col-6 right">
                  <label>
                    <NavLink to="/forgot-password">Forgot Password?</NavLink>
                  </label>
                </div>
              </div>
              <input type="submit" value="Log In" />
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
