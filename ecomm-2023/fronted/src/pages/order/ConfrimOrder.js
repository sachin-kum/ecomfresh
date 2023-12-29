import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Checkout from "../../component/Cart/CheckOut";
import { Helmet } from "react-helmet";
import { useDispatch, useSelector } from "react-redux";
import { Typography } from "@mui/material";
import { getToCART } from "../../redux/actions/cartActions";

const ConfrimOrder = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const lacationData = location?.state;
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state?.user);
  const { data } = useSelector((state) => state?.getCart?.allCart);

  const quantity = useSelector(
    (state) => state?.cart?.cartItems?.data?.quantity
  );

  useEffect(() => {
    dispatch(getToCART());
  }, [dispatch, quantity]);

  const subtotal = data?.reduce((acc, item) => {
    return acc + item.totalamount;
    // console.log(item?.totalamount);
  }, 0);
  const shippingCharge = subtotal > 1000 ? 0 : 100;
  const tax = subtotal * 0.18;
  const totalpay = subtotal + shippingCharge + tax;

  const proceedToPay = () => {
    const data = {
      subtotal,
      shippingCharge,
      tax,
      totalpay,
    };

    navigate("/payment-details", { state: { lacationData, data } });
  };
  return (
    <div>
      <Helmet title="Confirm Order" />
      <div className="container py-5">
        <Checkout activeStep={1} />
        <div className="confirmOrderPage">
          <div className="confirmshippingArea">
            <Typography className="pt-4">Shipping Info</Typography>
            <div className="confirmshippingAreaBox pt-4">
              <div className="row">
                <div className="col-8">
                  <div className="user-shipi-info">
                    <p>Name:</p>
                    <span>{user?.data?.name}</span>
                  </div>
                  <div className="user-shipi-info">
                    <p>Phone:</p>
                    <span>{location.state?.phoneNo}</span>
                  </div>
                  <div className="user-shipi-info">
                    <p>Address:</p>
                    <span>{location?.state.address}</span>
                  </div>
                  <div className="user-shipi-info">
                    <p>City:</p>
                    <span>{location?.state.city}</span>
                  </div>
                  <div className="user-shipi-info">
                    <p>State & Country:</p>
                    <span>
                      {location?.state.state},{location?.state.country}
                    </span>
                  </div>
                  <div className="user-shipi-info">
                    <p>Pin Code:</p>
                    <span>{location?.state.pinCode}</span>
                  </div>

                  <div class="shopping-cart">
                    <div class="title">Your Cart Items</div>

                    {data &&
                      data.map((res) => {
                        return (
                          <div class="item">
                            <div class="image product-cart-image">
                              <img src={res?.productid?.images[0].url} alt="" />
                            </div>

                            <div class="description">
                              <span>{res?.productid?.name}</span>
                              <span>{res?.productid?.description}</span>
                            </div>

                            <div class="quantity-cart">
                              <p className="m-auto">
                                {res?.quantity} X {res?.productid.price}
                              </p>
                            </div>

                            <div class="total-price">₹ {res?.totalamount}</div>
                          </div>
                        );
                      })}
                  </div>
                </div>

                <div className="col-4 order-proces-main text-center">
                  <h2>Order Summary</h2>
                  <br />
                  <div className="payment-proceed-box">
                    <div className="proceed-row">
                      <p>Subtotal</p>
                      <p> ₹ {subtotal}</p>
                    </div>
                    <div className="proceed-row">
                      <p>Shipping Charges</p>
                      <p>₹ {shippingCharge}</p>
                    </div>
                    <div className="proceed-row">
                      <p>GST</p>
                      <p>₹ {tax}</p>
                    </div>
                  </div>
                  <div
                    className="proceed-row pt-3"
                    style={{ color: "#000000fa", fontWeight: "bold" }}
                  >
                    <p>Total</p>
                    <p>{totalpay}</p>
                  </div>
                  <button
                    className="payment-procees-btn"
                    onClick={proceedToPay}
                  >
                    Payment Proceed
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfrimOrder;
