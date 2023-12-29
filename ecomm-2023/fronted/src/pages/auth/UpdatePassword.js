import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { UpdatePasswordAction } from "../../redux/actions/userActions";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UPDATE_PASSWORD_RESET } from "../../redux/constants/userConstant";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UpdatePassword = () => {
  const { isUpdate, error } = useSelector((state) => state.updatePassword);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [passData, setPassData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const updateData = (e) => {
    e.preventDefault();
    // setPassData(...passData);
    dispatch(UpdatePasswordAction(passData));
  };

  useEffect(() => {
    if (
      error?.message === "Old password is incorrect" &&
      error?.success == false
    ) {
      toast.error("Old Password Invalid");
    }
    if (
      error?.message === "New password and confirm password do not match" &&
      error?.success == false
    ) {
      toast.error("New password and confirm password do not match");
    }
    if (isUpdate) {
      navigate("/profile");
      dispatch({ type: UPDATE_PASSWORD_RESET });
    }
  }, [isUpdate, dispatch, error]);

  return (
    <>
      <div className="auth-widget">
        <div className="auth-widget-box">
          <h3>Update your password</h3>

          <div className="login-form">
            <form onSubmit={updateData}>
              <label htmlFor="password">Old Password</label>
              <input
                type="password"
                id="password"
                placeholder="**********"
                required
                value={passData.oldPassword}
                onChange={(e) => {
                  setPassData({ ...passData, oldPassword: e.target.value });
                }}
              />
              <label htmlFor="password">New Password</label>
              <input
                type="password"
                id="password"
                placeholder="**********"
                required
                value={passData.newPassword}
                onChange={(e) => {
                  setPassData({ ...passData, newPassword: e.target.value });
                }}
              />
              <label htmlFor="password">Confirm Password</label>
              <input
                type="password"
                id="password"
                placeholder="**********"
                value={passData.confirmPassword}
                onChange={(e) => {
                  setPassData({
                    ...passData,
                    confirmPassword: e.target.value,
                  });
                }}
                required
              />
              <input type="submit" className="button1" value="Continue" />
            </form>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default UpdatePassword;
