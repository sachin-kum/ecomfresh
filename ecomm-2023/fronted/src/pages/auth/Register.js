import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { registerUser } from "../../redux/actions/userActions";

const Register = () => {
  // const [selectedImg, setSelected] = useState();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAunthenticated } = useSelector((state) => state.user);
  console.log(isAunthenticated);
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
    selectedImg: null,
  });

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0]; // Get the first selected file

    if (selectedFile) {
      // Update the state with the selected file
      setUserData({ ...userData, selectedImg: selectedFile });
    }
  };

  const submitUserData = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", userData.name);
    formData.append("email", userData.email);

    formData.append("password", userData.password);

    formData.append("image", userData.selectedImg);

    dispatch(registerUser(formData));
  };
  useEffect(() => {
    if (isAunthenticated) {
      navigate("/");
    }
  }, [isAunthenticated]);
  return (
    <div>
      <>
        {/* <div className="register-from">
          <div className="main-login">
            <form className="login" onSubmit={submitUserData}>
              <h2>Welcome, User!</h2>
              <p>Please Register Here</p>
              <input
                type="text"
                placeholder=" Name"
                value={userData.name}
                onChange={(e) => {
                  setUserData({ ...userData, name: e.target.value });
                }}
              />
              <input
                type="email"
                placeholder="Email"
                value={userData.email}
                onChange={(e) => {
                  setUserData({ ...userData, email: e.target.value });
                }}
              />

              <input
                type="password"
                placeholder="Password"
                value={userData.password}
                onChange={(e) => {
                  setUserData({ ...userData, password: e.target.value });
                }}
              />

              <div className="upload-avatar">
               

                <div class="upload-btn-wrapper">
                  <button class="btn">Upload a file</button>
                  <input type="file" name="image" onChange={handleFileChange} />
                </div>
                <div className="profile-pic">
                  <img
                    src={
                      userData?.selectedImg
                        ? URL.createObjectURL(userData.selectedImg)
                        : "https://d30y9cdsu7xlg0.cloudfront.net/png/138926-200.png"
                    }
                    alt="Preview"
                  />
                </div>
              </div>
              <input type="submit" value="Log In" />
              <div className="links">
                <NavLink to="/login">Back</NavLink>
              </div>
            </form>
          </div>
        </div> */}

        <div className="auth-widget">
          <div className="auth-widget-box">
            <h3>Welcome</h3>
            <p>Sign Up to Hike Fashion</p>
            <div className="login-form">
              <form onSubmit={submitUserData}>
                <label htmlFor="clientid">Name</label>
                <input
                  type="text"
                  placeholder="Name"
                  value={userData.name}
                  onChange={(e) => {
                    setUserData({ ...userData, name: e.target.value });
                  }}
                  required
                />
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  placeholder="Email"
                  value={userData.email}
                  onChange={(e) => {
                    setUserData({ ...userData, email: e.target.value });
                  }}
                />
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  placeholder="Password"
                  value={userData.password}
                  onChange={(e) => {
                    setUserData({ ...userData, password: e.target.value });
                  }}
                  required
                />

                <div className="upload-avatar">
                  {/* <input type="file" /> */}

                  <div class="upload-btn-wrapper col-8">
                    <button class="btn">Upload a file</button>
                    <input
                      type="file"
                      name="image"
                      onChange={handleFileChange}
                    />
                  </div>
                  <div className="profile-pic col-4">
                    <img
                      src={
                        userData?.selectedImg
                          ? URL.createObjectURL(userData.selectedImg)
                          : "https://d30y9cdsu7xlg0.cloudfront.net/png/138926-200.png"
                      }
                      alt="Preview"
                    />
                  </div>
                </div>
                <div className="remember-forgot row">
                  <div className="col-6 left">
                    <label
                      style={{ textDecoration: "underline", margin: "10px 0 " }}
                    >
                      {" "}
                      <NavLink to="/login">Login</NavLink>
                    </label>
                  </div>
                  {/* <div className="col-6 right">
                    <label>
                      <NavLink to="/forgot-password">Forgot Password?</NavLink>
                    </label>
                  </div> */}
                </div>
                <input type="submit" value="Sign In" />
              </form>
            </div>
          </div>
        </div>
      </>
    </div>
  );
};

export default Register;
