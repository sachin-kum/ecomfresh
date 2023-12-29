import "./css/App.css";
import "./css/Responsive.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./component/Navbar";
import Footer from "./component/Footer";
import Home from "./pages/Home";
import GetDetailsProduct from "./component/Product/GetDetailsProduct";
import SearchProduct from "./component/Product/SearchProduct";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import { useEffect, useState } from "react";
import { loadUser } from "./redux/actions/userActions";
import store from "./redux/store/store";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "js-cookie";
import Profile from "./pages/Profile";
import WishList from "./pages/WishList";
import Order from "./pages/order/Order";
import Cart from "./pages/Cart";
import UpdatePassword from "./pages/auth/UpdatePassword";
// import Checkout from "./pages/order/ShippingInfo";
import ShippingInfo from "./pages/order/ShippingInfo";
import ConfrimOrder from "./pages/order/ConfrimOrder";
import PaymentDetails from "./pages/order/PaymentDetails";
import axios from "axios";
import baseurl from "./Baseurl";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import SucessOrder from "./pages/order/SucessOrder";

function App() {
  const cookies = Cookies.get("user");

  var token;
  let cookieData;
  var config;
  if (cookies) {
    cookieData = JSON.parse(cookies);
    token = JSON.parse(Cookies.get("user"));
    config = {
      token: token.token,
    };
  }

  const [stripeApiKey, setStripeAPiKey] = useState();

  const dispatch = useDispatch();
  useEffect(() => {
    if (cookies) {
      dispatch(loadUser(cookieData?.user?._id));
    }
  }, [cookies]);
  // useEffect(() => {});
  const { user } = useSelector((state) => state?.user);
  const getStripeKey = () => {
    axios
      .get(`${baseurl}api/v1/stripeapikey`, {
        headers: config,
      })
      .then((res) => {
        setStripeAPiKey(res?.data?.stripeApiKey);
      })
      .catch((err) => {});
  };
  useEffect(() => {
    getStripeKey();
  }, [cookies]);
  const stripePromise = loadStripe(stripeApiKey);
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          {/* {stripeApiKey && (
            <Elements stripe={stripePromise}>
              <Route path="/payment-detailas" element={<PaymentDetails />} />
            </Elements>
          )} */}
          <Route
            path="/payment-details"
            element={
              <Elements stripe={loadStripe(stripeApiKey)}>
                <PaymentDetails />
              </Elements>
            }
          />
          <Route path="/" element={<Home />} />
          <Route path="product/:id" element={<GetDetailsProduct />} />
          <Route path="search" element={<SearchProduct />} />

          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/wishlist" element={<WishList />} />
          <Route path="/update-password" element={<UpdatePassword />} />
          <Route path="/orders" element={<Order />} />

          <Route path="/cart" element={<Cart />} />
          <Route path="/shipping-info" element={<ShippingInfo />} />
          <Route path="/confirm-order" element={<ConfrimOrder />} />
          <Route path="/sucess-order" element={<SucessOrder />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
