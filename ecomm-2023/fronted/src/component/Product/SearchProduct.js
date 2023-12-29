import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { getProdcut } from "../../redux/actions/productAction";
import MetaData from "../../component/MetaData";
import Loader from "../../Loader";
import Rating from "@mui/material/Rating";
import { Pagination } from "@mui/material";
import { NavLink } from "react-router-dom";
import Slider from "@mui/material/Slider";

const SearchProduct = () => {
  const dispatch = useDispatch();
  const { products, error, loading, totalProducts } = useSelector(
    (state) => state.products
  );

  // const [keyword, setKeyword] = useState("");
  // const searchSubmitHandler = (e) => {
  //   e.preventDefault();
  //   if (keyword.trim()) {
  //     history.push(`/products/${keyword}`);
  //   } else {
  //     history.push("/products");
  //   }
  // };
  const location = useLocation();
  const query = new URLSearchParams(location.search);
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
    dispatch(
      getProdcut({ page: currentPage, limit: 10, search: query.get("search") })
    );
  }, [dispatch, currentPage, query.get("search")]);

  function valuetext(value) {
    return `₹ ${value} `;
  }

  const minDistance = 10;
  const [value1, setValue1] = React.useState([1, 10000]);
  const handleChange1 = (event, newValue, activeThumb) => {
    if (!Array.isArray(newValue)) {
      return;
    }

    if (activeThumb === 0) {
      setValue1([Math.min(newValue[0], value1[1] - minDistance), value1[1]]);
    } else {
      setValue1([value1[0], Math.max(newValue[1], value1[0] + minDistance)]);
    }
    if (value1[0] < 1) {
      return false;
    } else {
      dispatch(
        getProdcut({
          page: currentPage,
          limit: 10,
          search: query.get("search"),
          from: event.target.value[0],
          end: event.target.value[1],
        })
      );
    }
  };

  const [checkboxes, setCheckboxes] = useState({
    checkbox1: false,
    checkbox2: false,
    checkbox3: false,
  });

  const clearFilter = () => {
    dispatch(
      getProdcut({ page: currentPage, limit: 10, search: query.get("search") })
    );
    setValue1([1, 10000]);
    setCheckboxes({
      checkbox1: false,
      checkbox2: false,
      checkbox3: false,
    });
  };
  return (
    <div>
      <>
        <MetaData title="Product Page" />

        <section>
          <div className="container">
            <h2 className="text-center mt-4">FIND AMAZING PRODUCTS BELOW</h2>
            <div className="row">
              <div className="col-3">
                <div class="sidebar  px-0">
                  {/* <h1 class="border-bottom filter-header d-flex d-md-none p-3 mb-0 align-items-center">
                      <span class="mr-2 filter-close-btn">X</span>
                      Filters
                      <span class="ml-auto text-uppercase">Reset Filters</span>
                    </h1> */}
                  <div class="sidebar__inner ">
                    <div class="filter-body">
                      <div>
                        <h2 class="border-bottom filter-title">
                          Filter Products
                        </h2>
                        <div class="mb-30 filter-options">
                          <div class="custom-control custom-checkbox mb-3">
                            <label
                              class="custom-control-label"
                              for="Indoor"
                              onClick={clearFilter}
                            >
                              Clear Filter
                            </label>
                          </div>
                        </div>

                        <h2 class="font-xbold body-font border-bottom filter-title">
                          Price Range
                        </h2>
                        <div className="price-range-val d-flex justify-content-between">
                          <p>₹{value1[0]}</p>
                          <p>₹{value1[1]}</p>
                        </div>
                        <Slider
                          getAriaLabel={() => "Minimum distance"}
                          value={value1}
                          onChange={handleChange1}
                          valueLabelDisplay="auto"
                          getAriaValueText={valuetext}
                          min={0}
                          step={100}
                          max={10000}
                          disableSwap
                        />

                        <h2 class="border-bottom filter-title">Ratings</h2>
                        <div class="mb-3 filter-options" id="services-options">
                          <div class="custom-control custom-checkbox mb-3">
                            <input
                              type="checkbox"
                              name="4"
                              value="4"
                              checked={checkboxes.checkbox1}
                              onChange={(e) => {
                                // handleCheckboxChange("3", e.target.checked);
                                setCheckboxes({
                                  ...checkboxes,
                                  checkbox1: e.target.checked,
                                });
                                dispatch(
                                  getProdcut({
                                    page: currentPage,
                                    limit: 10,
                                    search: query.get("search"),
                                    ratings: e.target.checked
                                      ? e.target.value
                                      : null,
                                  })
                                );
                              }}
                            />
                            <label class="custom-control-label" for="Lunch">
                              4 * & above
                            </label>
                          </div>
                          <div class="custom-control custom-checkbox mb-3">
                            <input
                              type="checkbox"
                              name="3"
                              value="3"
                              checked={checkboxes.checkbox2}
                              onChange={(e) => {
                                // handleCheckboxChange("3", e.target.checked);
                                setCheckboxes({
                                  ...checkboxes,
                                  checkbox2: !checkboxes.checkbox2,
                                });
                                dispatch(
                                  getProdcut({
                                    page: currentPage,
                                    limit: 10,
                                    search: query.get("search"),
                                    ratings: e.target.checked
                                      ? e.target.value
                                      : null,
                                  })
                                );
                              }}
                            />
                            <label class="custom-control-label" for="Donner">
                              3 * & above
                            </label>
                          </div>
                          <div class="custom-control custom-checkbox mb-3">
                            <input
                              type="checkbox"
                              name="2"
                              value={2}
                              checked={checkboxes.checkbox3}
                              onChange={(e) => {
                                // handleCheckboxChange("3", e.target.checked);
                                setCheckboxes({
                                  ...checkboxes,
                                  checkbox3: !checkboxes.checkbox3,
                                });

                                dispatch(
                                  getProdcut({
                                    page: currentPage,
                                    limit: 10,
                                    search: query.get("search"),
                                    ratings: e.target.checked
                                      ? e.target.value
                                      : null,
                                  })
                                );
                              }}
                            />
                            <label class="custom-control-label" for="Cafe">
                              2 * & above
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-9">
                <div className="row g-4 py-5">
                  {products?.products && products?.products.length ? (
                    products?.products?.map((res) => {
                      return (
                        <div className="col-md-4">
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
                              <h6 className="product-category">
                                {res?.category}
                              </h6>
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
                    })
                  ) : (
                    <h1 className="text-center my-4">No Result Found</h1>
                  )}
                </div>
              </div>
            </div>

            {totalProducts > 10 && (
              <Pagination
                count={pageCount}
                page={currentPage}
                color="primary"
                onChange={handleChange}
              />
            )}
          </div>
        </section>
      </>
    </div>
  );
};

export default SearchProduct;
