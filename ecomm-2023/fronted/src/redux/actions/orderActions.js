import Cookies from "js-cookie";
import {
  CREATE_ORDER_REQUEST,
  CREATE_ORDER_SUCCESS,
  CREATE_ORDER_FAIL,
  MY_ORDERS_REQUEST,
  MY_ORDERS_SUCCESS,
  MY_ORDERS_FAIL,
} from "../constants/orderConstant";
import axios from "axios";
import baseurl from "../../Baseurl";

export const createOrder = (order) => async (dispatch) => {
  let token = JSON.parse(Cookies.get("user"));

  //  let userId = token.user._id;
  const config = {
    token: token.token,
  };

  try {
    dispatch({ type: CREATE_ORDER_REQUEST });

    const { data } = await axios.post(`${baseurl}api/v1/order/new`, order, {
      headers: config,
    });

    dispatch({ type: CREATE_ORDER_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: CREATE_ORDER_FAIL,
      payload: error.response.data.message,
    });
  }
};

// My Orders
export const myOrders = () => async (dispatch) => {
  try {
    dispatch({ type: MY_ORDERS_REQUEST });

    const { data } = await axios.get(`${baseurl}api/v1/orders/me`);

    dispatch({ type: MY_ORDERS_SUCCESS, payload: data.orders });
  } catch (error) {
    dispatch({
      type: MY_ORDERS_FAIL,
      payload: error.response.data.message,
    });
  }
};
