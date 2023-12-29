import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  productDetailsReducer,
  productReducer,
} from "../reducers/productReducers";
import {
  editPasswordReducer,
  editProfileReducer,
  userReducer,
} from "../reducers/userReducers";
import {
  cartReducers,
  deleteCartReducers,
  getCartReducers,
} from "../reducers/cartReducers";
import { myOrdersReducer, newOrderReducer } from "../reducers/orderReducers";

const reducer = combineReducers({
  products: productReducer,
  productDetailsReducer: productDetailsReducer,
  user: userReducer,
  profile: editProfileReducer,
  updatePassword: editPasswordReducer,
  cart: cartReducers,
  getCart: getCartReducers,
  deleteCart: deleteCartReducers,
  order: newOrderReducer,
  myOrders: myOrdersReducer,
});
const initialState = {};

// Check if the "cartItems" key exists in local storage
// const cartItemsFromLocalStorage = localStorage.getItem("cartItems");
// const initialState = {
//   cart: {
//     cartItems:
//       cartItemsFromLocalStorage !== "undefined"
//         ? JSON.parse(cartItemsFromLocalStorage)
//         : [],
//   },
// };

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
