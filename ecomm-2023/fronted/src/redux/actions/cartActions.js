import Cookies from "js-cookie";
import baseurl from "../../Baseurl";
import {
  ADD_TO_CART,
  ADD_TO_CART_FAIL,
  ADD_TO_CART_RESET,
  DELETE_TO_CART,
  DELETE_TO_CART_FAIL,
  DELETE_TO_CART_RESET,
  GET_TO_CART,
  GET_TO_CART_FAIL,
} from "../constants/cartConstant";
import axios from "axios";

export const addToCART = (id, quantity) => (dispatch, getState) => {
  let token = JSON.parse(Cookies.get("user"));

  let userId = token.user._id;
  const config = {
    token: token.token,
  };

  axios
    .post(
      `${baseurl}api/v1/add-cart`,
      {
        productid: id,
        userid: userId,
        quantity: quantity,
      },
      {
        headers: config,
      }
    )
    .then((res) => {
      dispatch({
        type: ADD_TO_CART,
        payload: res?.data,
      });
    })
    .catch((error) => {
      console.log(error);
      dispatch({
        type: ADD_TO_CART_FAIL,
        payload: error.response,
      });
    });
  // localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

export const getToCART = () => (dispatch) => {
  let token = JSON.parse(Cookies.get("user"));
  let userid = token.user._id;
  const config = {
    token: token.token,
  };

  axios
    .post(
      `${baseurl}api/v1/get-cart-data`,
      {
        userid: userid,
      },
      {
        headers: config,
      }
    )
    .then((res) => {
      dispatch({
        type: GET_TO_CART,
        payload: res?.data,
      });
    })
    .catch((error) => {
      console.log(error);
      dispatch({
        type: GET_TO_CART_FAIL,
        payload: error.response,
      });
    });
};

export const deleteToCART = (id) => (dispatch) => {
  let token = JSON.parse(Cookies.get("user"));

  const config = {
    token: token.token,
  };

  axios
    .post(
      `${baseurl}api/v1/remove-cart-data`,
      {
        id: id,
      },
      {
        headers: config,
      }
    )
    .then((res) => {
      dispatch({
        type: DELETE_TO_CART,
        payload: res?.data,
      });
      addToRESET();
    })
    .catch((error) => {
      console.log(error);
      dispatch({
        type: DELETE_TO_CART_FAIL,
        payload: error.response,
      });
    });
};

export const deleteToRESET = (id) => (dispatch) => {
  dispatch({
    type: DELETE_TO_CART_RESET,
    payload: [],
  });
};
export const addToRESET = () => (dispatch) => {
  dispatch({
    type: ADD_TO_CART_RESET,
  });
};
