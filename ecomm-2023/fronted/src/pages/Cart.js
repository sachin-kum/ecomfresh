import React, { useState } from "react";
import InfromatonSidebar from "../component/InfromatonSidebar";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCART,
  deleteToCART,
  deleteToRESET,
  getToCART,
} from "../redux/actions/cartActions";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const navigate = useNavigate();
  const { data } = useSelector((state) => state?.getCart?.allCart);
  const { isDelete } = useSelector(
    (state) => state?.deleteCart
  );
  const quantity = useSelector(
    (state) => state?.cart?.cartItems?.data?.quantity
  );
  const { totalAllCartAmount, totalItem } = useSelector(
    (state) => state?.getCart?.allCart
  );

  const [cartQty, setcartQty] = useState();

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getToCART());
  }, [dispatch, quantity]);
  // console.log(totalAllCartAmount, "totalAllCartAmount");
  useEffect(() => {
    if (isDelete == true) {
      dispatch(getToCART());
      dispatch(deleteToRESET());
    }
  }, [isDelete]);

  const iCartQyt = (_id, quantity, stock) => {
    const newQty = quantity + 1;
    if (stock <= quantity) {
      return;
    }
    dispatch(addToCART(_id, newQty));
    setcartQty(newQty);
    // await dispatch(getToCART());
  };
  const dCartQyt = (_id, quantity) => {
    const newQty = quantity - 1;
    if (1 >= quantity) {
      return;
    }
    dispatch(addToCART(_id, newQty));
    // await dispatch(getToCART());
  };

  const deleteCart = (id) => {
    dispatch(deleteToCART(id));
  };
  return (
    <>
      <div className="container profile-box-parent">
        <div className="row">
          <div className="col-lg-3 position-relative p-0">
            <InfromatonSidebar />
          </div>
          <div
            className="col-lg-9"
            data-bs-spy="scroll"
            data-bs-target="#profilenav"
            data-bs-offset="0"
            tabIndex="0"
          >
            <div class="shopping-cart">
              <div class="title">Shopping Bag</div>

              {data &&
                data.map((res) => {
                  return (
                    <div class="item">
                      <div class="buttons">
                        <span
                          class="delete-btn"
                          onClick={() => {
                            deleteCart(res?._id);
                          }}
                        ></span>
                        <span class="like-btn"></span>
                      </div>

                      <div class="image product-cart-image">
                        <img src={res?.productid?.images[0].url} alt="" />
                      </div>

                      <div class="description">
                        <span>{res?.productid?.name}</span>
                        <span>{res?.productid?.description}</span>
                      </div>

                      <div class="quantity-cart">
                        <button
                          class="minus-btn"
                          type="button"
                          name="button"
                          onClick={() => {
                            dCartQyt(res?.productid?._id, res?.quantity);
                          }}
                        >
                          <img
                            src="https://designmodo.com/demo/shopping-cart/minus.svg"
                            alt=""
                          />
                        </button>
                        <input
                          type="number"
                          name="name"
                          value={res?.quantity}
                          readOnly
                          className="inputForCartIn"
                        />

                        <button
                          class="plus-btn"
                          type="button"
                          name="button"
                          onClick={() => {
                            iCartQyt(
                              res?.productid?._id,
                              res?.quantity,
                              res?.productid?.Stock
                            );
                          }}
                        >
                          <img
                            src="https://designmodo.com/demo/shopping-cart/plus.svg"
                            alt=""
                          />
                        </button>
                      </div>

                      <div class="total-price">₹ {res?.totalamount}</div>
                    </div>
                  );
                })}

              <div className="totalAmt">
                <div className="totalAmt-innerbox">
                  <p>Total Amount({totalItem} Items)</p>
                  <p> ₹ {totalAllCartAmount}</p>
                  <button
                    onClick={() => {
                      navigate("/shipping-info");
                    }}
                  >
                    Checkout
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Cart;
