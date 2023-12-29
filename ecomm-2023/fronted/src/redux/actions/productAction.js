import axios from "axios";
import { useSelector } from "react-redux";

import {
  ALL_PRODUCT_REQUEST,
  ALL_PRODUCT_SUCCESS,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_DETAILS_FAIL,
  ALL_PRODUCT_FAIL,
  CLEAR_ERROR,
} from "../constants/productConstant";
import baseurl from "../../Baseurl";

export const getProdcut = (pageData) => async (dispatch) => {
  try {
    dispatch({ type: ALL_PRODUCT_REQUEST });

    const { data } = await axios.post(`${baseurl}api/v1/products`, pageData);

    dispatch({
      type: ALL_PRODUCT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ALL_PRODUCT_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const getDetailsProdcut = (id) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_DETAILS_REQUEST });

    const { data } = await axios.post(`${baseurl}api/v1/products/${id}`);

    // console.lop("data", data);
    dispatch({
      type: PRODUCT_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: PRODUCT_DETAILS_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const clearError = () => async (dispatch) => {
  dispatch({
    type: CLEAR_ERROR,
  });
};
