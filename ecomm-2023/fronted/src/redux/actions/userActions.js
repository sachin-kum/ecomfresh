import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOAD_USER_REQUEST,
  LOAD_USER_SUCCESS,
  LOAD_USER_FAIL,
  LOGOUT_SUCCESS,
  LOGOUT_FAIL,
  EDIT_PROFILE_REQUEST,
  EDIT_PROFILE_SUCCESS,
  EDIT_PROFILE_RESET,
  EDIT_PROFILE_FAIL,
  UPDATE_PASSWORD_REQUEST,
  UPDATE_PASSWORD_SUCCESS,
  UPDATE_PASSWORD_FAIL,
} from "../constants/userConstant";
import baseurl from "../../Baseurl";
import axios from "axios";
import Cookies from "js-cookie";

//login user

export const loginUser = (loginData) => async (dispatch) => {
  try {
    dispatch({
      type: LOGIN_REQUEST,
    });

    const { data } = await axios.post(`${baseurl}api/v1/login`, loginData);

    dispatch({
      type: LOGIN_SUCCESS,
      payload: data.user,
    });

    const dataa = JSON.stringify(data);

    const cook = await Cookies.set("user", dataa);
    console.log("hey ", data);
  } catch (error) {
    dispatch({
      type: LOGIN_FAIL,
      payload: error.response?.data,
    });
  }
};

//register user
export const registerUser = (registerData) => async (dispatch) => {
  try {
    dispatch({
      type: REGISTER_REQUEST,
    });

    const { data } = await axios.post(
      `${baseurl}api/v1/register`,
      registerData
    );

    dispatch({
      type: REGISTER_SUCCESS,
      payload: data.user,
    });

    const dataa = JSON.stringify(data);

    const cook = await Cookies.set("user", dataa);
  } catch (error) {
    dispatch({
      type: REGISTER_FAIL,
      payload: error.response.data.message,
    });
  }
};

//load user data

export const loadUser = (id) => async (dispatch) => {
  try {
    dispatch({
      type: LOAD_USER_REQUEST,
    });

    const { data } = await axios.post(`${baseurl}api/v1/get-profile`, {
      id,
    });

    dispatch({
      type: LOAD_USER_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: LOAD_USER_FAIL,
      payload: error.response.data.message,
    });
  }
};

//logout user

export const logoutUser = () => async (dispatch) => {
  try {
    const { data } = await axios.get(`${baseurl}api/v1/logout`);

    dispatch({
      type: LOGOUT_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: LOGOUT_FAIL,
      payload: error.response.data.message,
    });
  }
};

//update profile user
export const updateProfile = (updateData) => async (dispatch) => {
  try {
    let token = JSON.parse(Cookies.get("user"));
    dispatch({
      type: EDIT_PROFILE_REQUEST,
    });
    const config = {
      token: token.token,
    };
    const { data } = await axios.post(
      `${baseurl}api/v1/update-user-profile`,
      updateData,
      {
        headers: config,
      }
    );

    dispatch({
      type: EDIT_PROFILE_SUCCESS,
      payload: data,
    });

    // await Cookies.set("user", data?.token);
  } catch (error) {
    dispatch({
      type: EDIT_PROFILE_FAIL,
      payload: error.response.data.message,
    });
  }
};

//update user password

export const UpdatePasswordAction = (updateData) => (dispatch) => {
  let token = JSON.parse(Cookies.get("user"));
  const config = {
    token: token.token,
  };
  dispatch({
    type: UPDATE_PASSWORD_REQUEST,
  });

  axios
    .post(`${baseurl}api/v1/update-password`, updateData, {
      headers: config,
    })
    .then((response) => {
      dispatch({
        type: UPDATE_PASSWORD_SUCCESS,
        payload: response.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: UPDATE_PASSWORD_FAIL,
        payload: err.response.data,
      });
    });
};
