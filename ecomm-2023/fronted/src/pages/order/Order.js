import React from "react";
import InfromatonSidebar from "../../component/InfromatonSidebar";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { myOrders } from "../../redux/actions/orderActions";

const Order = () => {
  const dispatch = useDispatch();
  const { loading, error, orders } = useSelector((state) => state.myOrders);
  const { user } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(myOrders());
  }, [dispatch]);
  return (
    <>
      <div className="container profile-box-parent">
        <div className="row">
          <div className="col-lg-3 position-relative order-div-main p-0">
            <InfromatonSidebar />
          </div>
          <div
            className="col-lg-8"
            data-bs-spy="scroll"
            data-bs-target="#profilenav"
            data-bs-offset="0"
            tabIndex="0"
          >
            <div className="row">
              <div className="col-3 ">Product Image</div>
              <div className="col-3">Name</div>
              <div className="col-3">Price</div>

              <div className="col-3">Status</div>
            </div>
            <div className="row my-2">
              <div className="col-3 order-product-image product-status-m">
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSlkRt7oJelbj4MuVmDV0-kC4NcJ2pLie7VNg&usqp=CAU"
                  alt="product"
                />
              </div>
              <div className="col-3 product-name-order product-status-m">
                Phone
              </div>
              <div className="col-3 product-price-order product-status-m">
                5000
              </div>
              <div className="col-3 product-statue-order product-status-m">
                Confirmd
              </div>
            </div>
            <div className="row my-2">
              <div className="col-3 order-product-image product-status-m">
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSlkRt7oJelbj4MuVmDV0-kC4NcJ2pLie7VNg&usqp=CAU"
                  alt="product"
                />
              </div>
              <div className="col-3 product-name-order product-status-m">
                Phone
              </div>
              <div className="col-3 product-price-order product-status-m">
                5000
              </div>
              <div className="col-3 product-statue-order product-status-m">
                Confirmd
              </div>
            </div>
            <div className="row my-2">
              <div className="col-3 order-product-image product-status-m">
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSlkRt7oJelbj4MuVmDV0-kC4NcJ2pLie7VNg&usqp=CAU"
                  alt="product"
                />
              </div>
              <div className="col-3 product-name-order product-status-m">
                Phone
              </div>
              <div className="col-3 product-price-order product-status-m">
                5000
              </div>
              <div className="col-3 product-statue-order product-status-m">
                Confirmd
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Order;
