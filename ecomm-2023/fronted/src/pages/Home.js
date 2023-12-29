import React, { useEffect, useState } from "react";
import "../css/Home.css";
import shopImage from "../asset/shopping.webp";
import MetaData from "../component/MetaData";
import { getProdcut, getDetailsProdcut } from "../redux/actions/productAction";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../Loader";
import Rating from "@mui/material/Rating";
import { Pagination } from "@mui/material";
import { NavLink, useNavigate } from "react-router-dom";
import { loadUser } from "../redux/actions/userActions";
const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { products, error, loading } = useSelector((state) => state.products);

  const [currentPage, setCurrentPage] = useState(1);
  let postPerPage = 10;
  const pageCount = Math.ceil(products?.totalProducts / postPerPage);
  const handleChange = (e, value) => {
    setCurrentPage(value);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  useEffect(() => {
    dispatch(getProdcut({ page: currentPage, limit: 10 }));
  }, [dispatch, currentPage]);

  // const getSingleProduct = (id) => {
  //   navigate(`/product/${id}`);
  // };

  return (
    <>
      <MetaData title="Product Page" />
      {loading ? (
        <Loader />
      ) : (
        <section>
          <div className="container">
            <h2 className="text-center mt-4">FIND AMAZING PRODUCTS BELOW</h2>
            <div className="row g-4 py-5">
              {products?.products &&
                products?.products?.map((res) => {
                  return (
                    <div className="col-md-4 col-xl-3 ">
                      <div className="product-single-card">
                        <div className="product-top-area">
                          {/* <div className="product-discount">$55.00</div> */}
                          <NavLink to={`/product/${res?._id}`}>
                            <div className="product-img">
                              <div className="first-view">
                                <img
                                  src={res?.images[0].url}
                                  alt="logo"
                                  className="img-fluid"
                                />
                              </div>
                              <div className="hover-view">
                                <img
                                  src={res?.images[0].url}
                                  alt="logo"
                                  className="img-fluid"
                                />
                              </div>
                            </div>
                          </NavLink>
                          <div className="sideicons">
                            <button className="sideicons-btn">
                              <i className="fa-solid fa-cart-plus"></i>
                            </button>
                            <NavLink to={`/product/${res?._id}`}>
                              <button className="sideicons-btn">
                                <i className="fa-solid fa-eye"></i>
                              </button>
                            </NavLink>
                            <button className="sideicons-btn">
                              <i className="fa-solid fa-heart"></i>
                            </button>
                            <button className="sideicons-btn">
                              <i className="fa-solid fa-shuffle"></i>
                            </button>
                          </div>
                        </div>
                        <div className="product-info">
                          <h6 className="product-category">{res?.category}</h6>
                          <h6 className="product-title text-truncate">
                            {res?.name}
                          </h6>
                          <div className="d-flex align-items-center">
                            <div className="review-star me-1">
                              <Rating
                                name="read-only"
                                value={res?.ratings}
                                readOnly
                                precision={0.5}
                              />
                            </div>

                            <span className="review-count">
                              {res?.numOfReviews}
                            </span>
                          </div>
                          <div className="d-flex flex-wrap align-items-center py-2">
                            <div className="new-price">₹ {res?.price}</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>

            {products?.totalProducts > 10 && (
              <Pagination
                count={pageCount}
                page={currentPage}
                color="primary"
                onChange={handleChange}
              />
            )}
          </div>
        </section>
      )}
    </>
  );
};

export default Home;
