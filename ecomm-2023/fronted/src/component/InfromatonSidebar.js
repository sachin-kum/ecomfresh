import React from "react";
import { CgProfile } from "react-icons/cg";
import { MdBorderColor } from "react-icons/md";
import { FaCartPlus } from "react-icons/fa";
import { AiFillHeart } from "react-icons/ai";
import { NavLink } from "react-router-dom";

const InfromatonSidebar = () => {
  return (
    <>
      <div className="profile-items">
        <nav id="profilenav">
          <NavLink className="nav-link profile-link" to="/profile">
            {" "}
            <CgProfile size={25} />
            Personal
          </NavLink>
          <NavLink className="nav-link profile-link" to="/orders">
            {" "}
            <MdBorderColor size={25} />
            Orders
          </NavLink>
          <NavLink className="nav-link profile-link" to="/cart">
            {" "}
            <FaCartPlus size={25} />
            Cart
          </NavLink>
          <NavLink className="nav-link profile-link" to="/wishlist">
            {" "}
            <AiFillHeart size={25} />
            Wishlist
          </NavLink>
        </nav>
      </div>
    </>
  );
};

export default InfromatonSidebar;
