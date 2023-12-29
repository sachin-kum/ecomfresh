import React, { useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import MetaData from "../../component/MetaData";
import Checkout from "../../component/Cart/CheckOut";
import { Typography } from "@mui/material";
import {
  CardNumberElement,
  CardCvcElement,
  CardExpiryElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";

import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import Cookies from "js-cookie";
import baseurl from "../../Baseurl";
import { createOrder } from "../../redux/actions/orderActions";
import { useState } from "react";

// import { CreditCardIcon } from "@material-ui/icons";
// import { EventIcon } from "@material-ui/icons";
// import { VpnKeyIcon } from "@material-ui/icons";

const PaymentDetails = () => {
  const loacation = useLocation();
  let lcnData = loacation.state;
  const navigate = useNavigate();
  console.log(loacation.state);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const { data } = useSelector((state) => state?.getCart?.allCart);
  console.log("arijit", data);
  const stripe = useStripe();
  const elements = useElements();
  const payBtn = useRef(null);

  let token = JSON.parse(Cookies.get("user"));
  let config = {
    token: token.token,
  };
  const paymentData = {
    amount: Math.round(loacation.state?.data?.totalpay * 100),
  };

  const [orderItemsData, setOrderItemsData] = useState();
  var orderCartData = data?.map((e) => {
    return {
      product: e._id,
      name: e.productid?.name,
      price: e.productid?.price,
      image: e.productid?.images[0].url,
      quantity: e?.quantity,
    };
  });

  const order = {
    shippingInfo: lcnData.lacationData,
    orderItems: orderCartData,
    itemsPrice: lcnData?.data.subtotal,
    taxPrice: lcnData?.data.tax,
    shippingPrice: lcnData?.data.shippingCharge,
    totalPrice: lcnData?.data.totalpay,
  };
  const submitHandler = async (e) => {
    e.preventDefault();

    payBtn.current.disabled = true;
    try {
      const { data } = await axios.post(
        `${baseurl}api/v1/payment/process`,
        paymentData
      );
   
      const client_secret = data.client_secret;

      if (!stripe || !elements) return;

      const result = await stripe.confirmCardPayment(client_secret, {
        payment_method: {
          card: elements.getElement(CardNumberElement),
          billing_details: {
            name: user.name,
            email: user.email,
            address: {
              line1: loacation.state?.lacationData.address,
              city: loacation.state?.lacationData.city,
              state: loacation.state?.lacationData.state,
              postal_code: loacation.state?.lacationData.pinCode,
              country: loacation.state?.lacationData.country,
            },
          },
        },
      });

      if (result.error) {
        payBtn.current.disabled = false;

        alert.error(result.error.message);
      } else {
        if (result.paymentIntent.status === "succeeded") {
          order.paymentInfo = {
            id: result.paymentIntent.id,
            status: result.paymentIntent.status,
          };

          dispatch(createOrder(order));

          navigate("/sucess-order", { replace: true });
        } else {
          alert.error("There's some issue while processing payment ");
        }
      }
    } catch (error) {
      payBtn.current.disabled = false;
      // alert(error.response.data.message);
    }
  };
  return (
    <>
      <MetaData title="Payment" />

      <div className="paymentContainer container pt-5">
        <Checkout activeStep={2} />
        <div className="credit-card-form">
          <h2>PAYMENT Details</h2>
          <img
            className="Image1"
            src="https://i.ibb.co/hgJ7z3J/6375aad33dbabc9c424b5713-card-mockup-01.png"
            alt="6375aad33dbabc9c424b5713-card-mockup-01"
            border="0"
          />

          <form onSubmit={(e) => submitHandler(e)}>
            <div className="form-group">
              <label for="card-number " className="text-start">
                Card Number
              </label>
              <CardNumberElement
                className="paymentInput"
                options={{
                  showIcon: true,
                }}
              />
            </div>

            <div className="form-row">
              <div className="form-group form-column">
                <CardExpiryElement className="paymentInput" />
              </div>
              <div className="form-group form-column">
                <CardCvcElement className="paymentInput" />
              </div>
            </div>
            <button type="submit" className="click-button" ref={payBtn}>
              PAY NOW( ₹ {loacation.state?.data?.totalpay})
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default PaymentDetails;
