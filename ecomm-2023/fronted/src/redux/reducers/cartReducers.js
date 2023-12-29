import {
  ADD_TO_CART,
  ADD_TO_CART_FAIL,
  DELETE_TO_CART,
  DELETE_TO_CART_FAIL,
  DELETE_TO_CART_RESET,
  GET_TO_CART,
  GET_TO_CART_FAIL,
  ADD_TO_CART_RESET,
} from "../constants/cartConstant";

export const cartReducers = (state = { cartItems: [] }, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      return {
        ...state,
        isAdd: true,
        cartItems: action.payload,
      };

    case ADD_TO_CART_FAIL:
      return {
        ...state,
        isAdd: false,
        cartItems: action.payload,
      };
    case ADD_TO_CART_RESET:
      return {
        ...state,
        isAdd: false,
      };
    default:
      return state;
  }
};

export const getCartReducers = (state = { allCart: [] }, action) => {
  switch (action.type) {
    case GET_TO_CART:
      return {
        ...state,
        success: true,
        allCart: action.payload,
      };

    case GET_TO_CART_FAIL:
      return {
        ...state,
        sucess: false,
        allCart: action.payload,
      };
    default:
      return state;
  }
};

export const deleteCartReducers = (state = { deleteCart: [] }, action) => {
  switch (action.type) {
    case DELETE_TO_CART:
      return {
        ...state,
        isDelete: true,
        success: true,
        deleteCart: action.payload,
      };

    case DELETE_TO_CART_FAIL:
      return {
        ...state,
        sucess: false,
        deleteCart: action.payload,
      };
    case DELETE_TO_CART_RESET:
      return {
        ...state,
        isDelete: false,
        sucess: false,
        deleteCart: action.payload,
      };

    default:
      return state;
  }
};
