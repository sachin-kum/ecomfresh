import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getDetailsProdcut } from "../../redux/actions/productAction";
import { useDispatch, useSelector } from "react-redux";
import Rating from "@mui/material/Rating";
import "../../css/DetailsPage.css";
import ReviewCard from "./ReviewCard";
import {
  addToCART,
  addToRESET,
  getToCART,
} from "../../redux/actions/cartActions";
import "react-toastify/dist/ReactToastify.css";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { ToastContainer } from "react-toastify";
import { toast } from "react-toastify";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const GetDetailsProduct = () => {
  const [open, setOpen] = React.useState(false);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getDetailsProdcut(id));
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [dispatch, id]);

  const { details } = useSelector((state) => state?.productDetailsReducer);
  const { isAdd } = useSelector((state) => state.cart);
  const { isAunthenticated } = useSelector((state) => state.user);

  console.log("isAdd", isAdd);

  const [qty, setQty] = useState(1);

  const incrsQty = () => {
    if (details?.product?.Stock <= qty) return;
    setQty(qty + 1);
  };
  const decrsQty = () => {
    if (1 >= qty) {
      return;
    } else {
      setQty(qty - 1);
    }
  };

  const addTOCartHandler = (_id, qty) => {
    if (isAunthenticated == true) {
      dispatch(addToCART(_id, qty));
    } else {
      toast.error("Plese Login");
    }
  };

  useEffect(() => {
    if (isAdd == true) {
      setOpen(true);
      dispatch(addToRESET());
      dispatch(getToCART());
    }
  }, [isAdd]);
  return (
    <>
      <div className="card-wrapper">
        <div className="card">
          <div className="product-imgs">
            <div className="img-display">
              <div className="img-showcase">
                <img src={details?.product?.images[0].url} alt="shoe image" />
              </div>
            </div>
          </div>

          <div className="product-content">
            <h2 className="product-title">{details?.product?.name}</h2>

            <div className="">
              <Rating
                name="read-only"
                value={details?.product?.ratings}
                readOnly
                precision={0.5}
              />
            </div>
            <p> ( {details?.product?.numOfReviews})</p>

            <div className="product-price">
              <p className="new-price">
                Price: ₹ <span>{details?.product?.price}</span>
              </p>
            </div>

            <div className="product-detail">
              <h2>about this item: </h2>
              <p>{details?.product?.description}</p>

              <ul>
                <li>
                  Stock:
                  <span
                    classNameName={
                      details?.product?.Stock > 0 ? "text-info" : "text-danger"
                    }
                  >
                    {details?.product?.Stock > 0 ? "In Stock" : "Out of Stock"}
                  </span>
                </li>
                <li>
                  Category: <span>{details?.product?.category}</span>
                </li>
                <li>
                  Shipping Area: <span>All over the world</span>
                </li>
                <li>
                  Shipping Fee: <span>Free</span>
                </li>
              </ul>
            </div>

            <div className="main-product-add">
              <div className="purchase-info row">
                <div class=" col-6 qty-boxz">
                  <div class="quantity">
                    <button
                      class="minus"
                      aria-label="Decrease"
                      onClick={decrsQty}
                    >
                      -
                    </button>
                    <input
                      type="number"
                      class="input-box"
                      min="1"
                      max="10"
                      value={qty}
                    />
                    <button
                      disabled={details?.product?.Stock == 0 ? true : false}
                      class="plus"
                      aria-label="Increase"
                      onClick={incrsQty}
                    >
                      +
                    </button>
                  </div>
                </div>
                <div className="col-6 addtocart-boxz">
                  <button
                    type="button"
                    className="btn2"
                    onClick={() => {
                      addTOCartHandler(details?.product._id, qty);
                    }}
                  >
                    Add to Cart <i className="fas fa-shopping-cart"></i>
                  </button>
                </div>
              </div>
            </div>

            <div className="social-links">
              <p>Share At: </p>
              <a href="#">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="#">
                <i className="fab fa-whatsapp"></i>
              </a>
              <a href="#">
                <i className="fab fa-pinterest"></i>
              </a>
            </div>
          </div>
        </div>
      </div>

      {details?.product?.reviews.length ? (
        <h1 className="text-center my-2">Reviews</h1>
      ) : null}
      {details?.product?.reviews.length ? (
        details?.product?.reviews.map((review) => {
          return <ReviewCard reviews={review} />;
        })
      ) : (
        <p style={{ fontSize: "30px", textAlign: "center", margin: "2% 0" }}>
          No review yet
        </p>
      )}
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          This is a success message!
        </Alert>
      </Snackbar>
      <ToastContainer />
    </>
  );
};

export default GetDetailsProduct;
