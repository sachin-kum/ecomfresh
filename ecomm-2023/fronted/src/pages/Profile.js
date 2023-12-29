import React from "react";
import InfromatonSidebar from "../component/InfromatonSidebar";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { useEffect } from "react";
import { loadUser, updateProfile } from "../redux/actions/userActions";
import Cookies from "js-cookie";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { CircularProgress } from "@mui/material";
import { NavLink } from "react-router-dom";

const Profile = () => {
  const cookies = Cookies.get("user");
  let cookieData;
  if (cookies) {
    cookieData = JSON.parse(cookies);
  }

  const [avatar, setAvatar] = useState();
  const [avatar1, setAvatar1] = useState();
  const [editData, setEditData] = useState();

  const dispatch = useDispatch();
  const { isAunthenticated, user } = useSelector((state) => state.user);

  const { isUpdated, loading } = useSelector((state) => state.profile);

  console.log("user", user);

  useEffect(() => {
    if (isUpdated) {
      dispatch(loadUser(cookieData?.user?._id));
      toast.success("Profile Update Sucessfully");
    }
  }, [isUpdated]);

  useEffect(() => {
    if (user) {
      setEditData(user?.data);

      setAvatar1(editData?.avatar?.url);
    }
  }, [user]);

  const handleImgChange = (e) => {
    setAvatar(e.target.files[0]);
  };
  const editSubmitData = (e) => {
    e.preventDefault();

    const myForm = new FormData();
    myForm.set("name", editData?.name);
    myForm.set("email", editData?.email);

    myForm.set("image", avatar);

    dispatch(updateProfile(myForm));
  };

  return (
    <>
      <div className="container profile-box-parent">
        <div className="row">
          <div className="col-lg-3 position-relative p-0">
            <InfromatonSidebar />
          </div>
          <div
            className="col-lg-8"
            data-bs-spy="scroll"
            data-bs-target="#profilenav"
            data-bs-offset="0"
            tabIndex="0"
          >
            <form onSubmit={editSubmitData}>
              <div id="personal-i">
                <div className="profile-one-row per-h3 d-flex justify-content-between">
                  <h3>Personal Info</h3>
                  <h3>
                    <NavLink to="/update-password">Update Password</NavLink>
                  </h3>
                </div>
                <form enctype="multiple/form-data" className="profile-one-row">
                  <label>Avatar</label>
                  <label
                    htmlFor="image"
                    id="img-label"
                    style={{ display: "inline-block", cursor: "pointer" }}
                  >
                    <input
                      type="file"
                      onChange={handleImgChange}
                      // disabled={!editProfile}
                      name="image"
                      id="image"
                      accept="image/*"
                      style={{ display: "none" }}
                    />
                    <img
                      alt="Preview"
                      className="avatar-image"
                      src={
                        avatar
                          ? URL.createObjectURL(avatar)
                          : editData?.avatar?.url
                      }
                    />
                  </label>
                </form>
                <div className="profile-one-row">
                  <div className="row">
                    <div className="col-lg-6">
                      <label htmlFor="fullname">Name</label>
                      <input
                        type="text"
                        name="name"
                        value={editData?.name}
                        onChange={(e) => {
                          setEditData({
                            ...editData,
                            [e.target.name]: e.target.value,
                          });
                        }}
                      />
                    </div>
                    <div className="col-lg-6">
                      <div>
                        <label htmlFor="email">Email</label>
                        <input
                          type="email"
                          name="email"
                          value={editData?.email}
                          onChange={(e) => {
                            setEditData({
                              ...editData,
                              [e.target.name]: e.target.value,
                            });
                          }}
                        />
                      </div>
                    </div>
                    {loading ? (
                      <CircularProgress />
                    ) : (
                      <button type="submit" className="update-btn-pro">
                        Update
                      </button>
                    )}
                  </div>
                </div>
                {/* <div className="profile-one-row">
                <div className="row">
                  <div className="col-lg-6">
                    <label htmlFor="address">address</label>
                    <input
                      type="text"
                      value="First Name"
                      readOnly
                      name="address"
                      placeholder="S-5 Amba Bari, Jaipur, Rajasthan, India"
                    />
                  </div>
                </div>
              </div> */}
                {/* <div className="profile-one-row">
                <div className="row">
                  <div className="col-lg-6">
                    <label htmlFor="pan">PAN</label>
                    <input
                      type="text"
                      value="First Name"
                      name="pan"
                      placeholder="AUBPA6000F"
                      readOnly
                    />
                  </div>
                </div>
              </div> */}
              </div>
            </form>
            {/* <div id="dp-details-i">
              <div className="profile-one-row per-h3">
                <h3>Dp Details</h3>
              </div>
              <div className="profile-one-row">
                <div className="row">
                  <div className="col-lg-6">
                    <label htmlFor="DP-ID">DP ID</label>
                    <input
                      type="text"
                      value={profile ? profile.DPID : ""}
                      name="DP-ID"
                      placeholder="Aditya Agarwal"
                      readOnly
                    />
                  </div>
                  <div className="col-lg-6">
                    <label htmlFor="client-id">client ID</label>
                    <input
                      type="text"
                      value={profile ? profile.ClientCode : ""}
                      name="client-id"
                      placeholder="9348793487"
                      readOnly
                    />
                  </div>
                </div>
              </div>

              <div className="profile-one-row">
                <div className="row">
                  <div className="col-lg-6">
                    <label htmlFor="demat">demat Account Number</label>
                    <input
                      type="number"
                      value={profile ? profile.DematAccountNo : ""}
                      name="demat"
                      placeholder="9348793487"
                      readOnly
                    />
                  </div>
                  <div className="col-lg-6">
                    <label htmlFor="dp-name">Dp Name</label>
                    <input
                      type="text"
                      value={"AC Agarwal Share Brokers Pvt. Ltd."}
                      name="dp-name"
                      placeholder="S-5 Amba Bari, Jaipur, Rajasthan, India"
                      readOnly
                    />
                  </div>
                </div>
              </div>
            </div>
            <div id="bank-details-i">
              <div className="profile-one-row per-h3">
                <h3>Bank Account Details</h3>
              </div>
              <div className="profile-one-row">
                <div className="row">
                  <div className="col-lg-6">
                    <label htmlFor="bank-name">Bank Name</label>
                    <input
                      type="text"
                      value={profile ? profile.BankName : ""}
                      name="bank-name"
                      placeholder="HDFC BANK LTD"
                      readOnly
                    />
                  </div>
                  <div className="col-lg-6">
                    <label htmlFor="acc-num">Account Number</label>
                    <input
                      type="number"
                      value={profile ? profile.BankAccountNo : ""}
                      name="acc-num"
                      placeholder="50100220715817"
                      readOnly
                    />
                  </div>
                </div>
              </div>

              <div className="profile-one-row">
                <div className="row">
                  <div className="col-lg-6">
                    <label htmlFor="ifsc">IFSC</label>
                    <input
                      type="text"
                      value={profile ? profile.IFSC : ""}
                      name="ifsc"
                      placeholder="HDFC0004110"
                      readOnly
                    />
                  </div>
                  <div className="col-lg-6">
                    <label htmlFor="micr">MICR</label>
                    <input
                      type="number"
                      value={profile ? profile.MICR : ""}
                      name="micr"
                      placeholder="110240403"
                      readOnly
                    />
                  </div>
                </div>
              </div>
            </div>
            <div id="ac-agarwal-i">
              <div className="profile-one-row per-h3">
                <h3>AC Agarwal</h3>
              </div>
              <div className="profile-one-row">
                <div className="row">
                  <div className="col-lg-6">
                    <label>Customer Support</label>
                    <h4>
                      <a href="tel:+911414920999">(+91)141- 4920999</a>
                      <br />
                      <a href="tel:+911414049663">(+91)141- 4049663</a>
                    </h4>
                  </div>
                  <div className="col-lg-6">
                    <label>Email ID</label>
                    <h5>
                      <a href="mailto:customercare@acagarwal.com">
                        customercare@acagarwal.com
                      </a>
                      <br />
                      <a href="mailto:support@acagarwal.com">
                        support@acagarwal.com
                      </a>
                    </h5>
                  </div>
                </div>
              </div>
            </div> */}
          </div>
          <div className="col-lg-1"></div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default Profile;
