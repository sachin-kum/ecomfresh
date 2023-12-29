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
  UPDATE_PASSWORD_RESET,
} from "../constants/userConstant";

export const userReducer = (state = { user: [] }, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
    case REGISTER_REQUEST:
    case LOAD_USER_REQUEST:
      return {
        loading: true,
        isAunthenticated: false,
      };
    case LOGIN_SUCCESS:
    case REGISTER_SUCCESS:
    case LOAD_USER_SUCCESS:
      return {
        loading: false,
        isAunthenticated: true,
        user: action.payload,
      };
    case LOGOUT_SUCCESS:
      return {
        loading: false,
        user: null,
        isAunthenticated: false,
      };
    case LOGIN_FAIL:
    case REGISTER_FAIL:
      return {
        ...state,
        loading: false,
        isAunthenticated: false,
        user: null,
        error: action.payload,
      };
    case LOAD_USER_FAIL:
      return {
        ...state,
        loading: false,
        isAunthenticated: false,
        user: null,
        error: action.payload,
      };
    case LOGOUT_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const editProfileReducer = (state = { user: [] }, action) => {
  switch (action.type) {
    case EDIT_PROFILE_REQUEST:
      return {
        loading: true,
      };
    case EDIT_PROFILE_SUCCESS:
      return {
        loading: false,
        isUpdated: true,
        profile: action.payload,
      };

    case EDIT_PROFILE_RESET:
      return {
        ...state,
        isUpdate: false,
      };

    case EDIT_PROFILE_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export const editPasswordReducer = (state = { user: [] }, action) => {
  switch (action.type) {
    case UPDATE_PASSWORD_REQUEST:
      return {
        loading: true,
      };

    case UPDATE_PASSWORD_SUCCESS:
      return {
        loading: false,
        isUpdate: true,
        updataPassword: action.payload,
      };

    case UPDATE_PASSWORD_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case UPDATE_PASSWORD_RESET:
      return {
        ...state,
        isUpdate: false,
      };

    default:
      return state;
  }
};
