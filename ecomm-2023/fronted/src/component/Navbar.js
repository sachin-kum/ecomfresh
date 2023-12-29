import React, { useEffect, useState } from "react";
import Notifications from "react-notifications-menu";
import { NavLink, useNavigate } from "react-router-dom";
import Logo from "../asset/logo.jpg";
import { Button } from "react-bootstrap";
import { Modal } from "react-bootstrap";
import Bell from "../asset/bell.svg";
import { useDispatch, useSelector } from "react-redux";
import Avatar from "../asset/avatar.png";
import Cookies from "js-cookie";
import axios from "axios";
import baseurl from "../Baseurl";
import LogoutIcon from "@mui/icons-material/Logout";
import { logoutUser } from "../redux/actions/userActions";
import { BsFillCartPlusFill } from "react-icons/bs";
import { Badge } from "@mui/material";
import { getToCART } from "../redux/actions/cartActions";
function Navbar() {
  const dispatch = useDispatch();
  const cookies = Cookies.get("user");
  const [token, setToken] = useState();

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  useEffect(() => {
    if (cookies) {
      setToken(cookies);
    }
  }, [cookies]);

  const { isAunthenticated, loading, user } = useSelector(
    (state) => state.user
  );
  const { totalItem } = useSelector((state) => state?.getCart?.allCart);
  // console.log("user", user.role);
  const logout = () => {
    dispatch(logoutUser());

    if (isAunthenticated) {
      Cookies.remove("user");
      setToken("");
      handleClose();
      navigate("/");
    }
  };
  useEffect(() => {
    if (isAunthenticated == true) {
      dispatch(getToCART());
    }
  }, []);
  const navigate = useNavigate();
  const [search, setsearch] = useState("");
  return (
    <>
      <div className="headnav d-lg-block  nav-desktop">
        <div className="container">
          <div className="row ">
            <div className="col-lg-2 ">
              <img
                alt=" "
                className="img-fluid"
                src={Logo}
                onClick={() => {
                  navigate("/");
                }}
              />
            </div>
            <div className="col-lg-8 navcol">
              <ul>
                <li className="goals">
                  <NavLink className="" to="/  ">
                    Products
                  </NavLink>
                </li>
                <li className="reports dropdown">
                  <div className="dropdown">
                    {user && user?.data?.role == "admin" && (
                      <NavLink to="/admin" className="dropbtn">
                        Admin
                      </NavLink>
                    )}
                    {/* <div className="dropdown-content">
                      <NavLink to="/reports-ledger">Ledger</NavLink>
                      <NavLink to="/reports-dp-holdings">DP Holding</NavLink>
                      <NavLink to="/reports-profit-and-loss">
                        Profit and Loss
                      </NavLink>
                      <NavLink to="/reports-outstandings">Out Standing</NavLink>
                      <NavLink to="/reports-margin">Margin Report</NavLink>
                    </div> */}
                  </div>
                </li>
                {/* <li className="goals">
                  <NavLink className="" to="/  "></NavLink>
                </li> */}
                <li className="goals">
                  <NavLink className="" to={user?.data ? `/cart` : "/login"}>
                    <Badge badgeContent={totalItem} color="primary">
                      <BsFillCartPlusFill size={25} />
                    </Badge>
                    &nbsp;&nbsp; Cart
                  </NavLink>
                </li>
                <li className="fund">
                  <div class="search-box">
                    <form
                      onSubmit={(e) => {
                        e.preventDefault();
                        if (search.trim()) {
                          navigate({
                            pathname: "/search",
                            search: `search=${search}`,
                          });
                        } else {
                          navigate("/");
                          setsearch("");
                        }
                      }}
                    >
                      <input
                        class="search-input"
                        type="text"
                        placeholder="Search products."
                        onChange={(e) => {
                          setsearch(e.target.value);
                        }}
                      />
                      <button class="search-btn">
                        <i class="fas fa-search"></i>
                      </button>
                    </form>
                  </div>
                </li>
              </ul>
            </div>
            <div className="col-lg-2 avatarcol">
              <ul>
                {!token ? (
                  <li className="goals">
                    <NavLink className="" to="/login">
                      Login
                    </NavLink>
                  </li>
                ) : (
                  <>
                    <li className="avatar-logout">
                      <LogoutIcon
                        style={{ marginRight: "10px", cursor: "pointer" }}
                        // onClick={logout}
                        onClick={handleShow}
                      />
                      <NavLink to="/profile" className="profile_image">
                        <img
                          alt=""
                          style={{ maxWidth: "100px", height: "50px" }}
                          className="img-fluid"
                          src={user && user?.data?.avatar?.url}
                        />
                      </NavLink>
                    </li>
                  </>
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>

      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          {/* <Modal.Title>Modal heading</Modal.Title> */}
        </Modal.Header>
        <Modal.Body>Are You Sure You Want to Logout !</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={logout}>
            Sure
          </Button>
        </Modal.Footer>
      </Modal>

      <div className="headnav d-lg-none nav-mobile">
        <div className="container">
          <div className="row nav-wrapper">
            <div className="col-6  logo-container">
              <div className="logocol">
                <img alt=" " className="img-fluid" src={Logo} />
              </div>
            </div>
            <div className="col-6 navcol">
              <div className="col-3">
                <nav>
                  <div className="wrapper">
                    <input type="radio" name="slider" id="menu-btn" />
                    <input type="radio" name="slider" id="close-btn" />
                    <ul className="nav-links">
                      <label htmlFor="close-btn" className="btn close-btn">
                        <i className="fas fa-times"></i>
                      </label>
                      <li>
                        <NavLink className="" to="/">
                          Dashboard
                        </NavLink>
                      </li>
                      <li>
                        <NavLink className="" to="/goals">
                          Goals
                        </NavLink>
                      </li>
                      <li className="nav-drop">
                        <NavLink to="/reports" className="desktop-item dropbtn">
                          Reports
                        </NavLink>
                        <input type="checkbox" id="showDrop" />
                        <label htmlFor="showDrop" className="mobile-item">
                          Reports
                        </label>
                        {/* <img alt=" " className="img-fluid" />
                        <ul className="drop-menu">
                          <li>
                            <NavLink to="/reports">Personal</NavLink>
                          </li>
                          <li>
                            <NavLink to="/reports-family">Family</NavLink>
                          </li>
                          <li>
                            <NavLink to="/reports-ledger">Ledger</NavLink>
                          </li>
                          <li>
                            <NavLink to="/reports-dp-holdings">
                              DP Holding
                            </NavLink>
                          </li>
                          <li>
                            <NavLink to="/reports-profit-and-loss">
                              Profit and Loss
                            </NavLink>
                          </li>
                          <li>
                            <NavLink to="/reports-outstandings">
                              Out Standing
                            </NavLink>
                          </li>
                          <li>
                            <NavLink to="/reports-margin">
                              Margin Report
                            </NavLink>
                          </li>
                        </ul> */}
                      </li>
                      <li>
                        <NavLink className="" to="/fund-transfer">
                          Fund Transfer
                        </NavLink>
                      </li>

                      <li>
                        <NavLink className="" to="">
                          Logout
                          <LogoutIcon
                            style={{
                              marginRight: "10px",
                              cursor: "pointer",
                              marginLeft: "10px",
                            }}
                          />
                        </NavLink>
                      </li>
                    </ul>
                    <label htmlFor="menu-btn" className="btn menu-btn">
                      <i className="fas fa-bars"></i>
                    </label>
                  </div>
                </nav>
              </div>
              <div className="col-3">
                <Notifications
                  header={{
                    title: "Notifications",
                    option: {
                      text: "View All",
                      onClick: () => console.log("Clicked"),
                    },
                  }}
                  markAsRead={(data) => {}}
                  icon={Bell}
                />
              </div>
              <div className="col-2">
                <NavLink to="/profile">
                  <img alt="" className="img-fluid" src={Avatar} />
                </NavLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Navbar;
