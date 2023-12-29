import React, { useState } from "react";
import "../../css/Cart.css";
import { Country, State } from "country-state-city";
import Checkout from "../../component/Cart/CheckOut";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
const ShippingInfo = () => {
  const navigate = useNavigate();
  const [country, setCountry] = useState();
  const [state, setState] = useState();
  const [address, setAddress] = useState();
  const [city, setCity] = useState();
  const [pinCode, setPinCode] = useState();
  const [phoneNo, setPhoneNo] = useState();
  const shippingSubmit = (e) => {
    e.preventDefault();
    // if (phoneNo.length < 10 || phoneNo.length > 10) {
    //   alert.error("Phone Number should be 10 digits Long");
    //   return;
    // }
    console.log(country, state, address, pinCode, phoneNo);
    navigate("/confirm-order", {
      state: {
        country,
        state,
        address,
        pinCode,
        phoneNo,
        city,
      },
    });
  };

  return (
    <>
      <Helmet title="shipping-info" />

      <div className="container mt-5">
        <Checkout activeStep={0} />
      </div>
      <main className="main page__main container">
        <form className="form" onSubmit={shippingSubmit}>
          <div className="form__cards">
            <div className="form__main-card">
              <div className="form__row form__main-content">
                <div className="form__col">
                  <h3 className="form__title">Shipping Details</h3>

                  <div className="form__row">
                    <div className="form__col">
                      <div className="form__linput">
                        <label className="form__txt-label" for="address">
                          <i className="fa-regular fa-address-card"></i>Address
                        </label>
                        <input
                          className="form__txt-input"
                          id="address"
                          type="text"
                          name="address"
                          placeholder="542 W. 15th Street"
                          value={address}
                          onChange={(e) => setAddress(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="form__col">
                      <div className="form__linput">
                        <label className="form__txt-label" for="city">
                          <i className="fa-solid fa-building-columns"></i>City
                        </label>
                        <input
                          className="form__txt-input"
                          id="city"
                          type="text"
                          name="city"
                          placeholder="City Name"
                          value={city}
                          onChange={(e) => setCity(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="form__row">
                    <div className="form__col">
                      <div className="form__linput">
                        <label className="form__txt-label" for="address">
                          <i class="fa-solid fa-location-pin"></i> Pin Code
                        </label>
                        <input
                          className="form__txt-input"
                          id="pincode"
                          type="text"
                          name="pincode"
                          placeholder="302039"
                          value={pinCode}
                          onChange={(e) => setPinCode(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="form__col">
                      <div className="form__linput">
                        <label className="form__txt-label" for="city">
                          <i class="fa-solid fa-phone"></i>Phone Number
                        </label>
                        <input
                          className="form__txt-input"
                          id="phone"
                          type="number"
                          name="phone"
                          placeholder="Phone Number"
                          value={phoneNo}
                          onChange={(e) => setPhoneNo(e.target.value)}
                          size="10"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="form__row">
                    <div className="form__col">
                      <div className="form__linput">
                        <label className="form__txt-label" for="state">
                          <i class="fa-solid fa-earth-americas"></i> Country
                        </label>
                        <select
                          className="cntry-select"
                          required
                          value={country}
                          onChange={(e) => setCountry(e.target.value)}
                        >
                          <option value="">Country</option>
                          {Country &&
                            Country.getAllCountries().map((item) => (
                              <option key={item.isoCode} value={item.isoCode}>
                                {item.name}
                              </option>
                            ))}
                        </select>
                      </div>
                    </div>

                    <div className="form__col">
                      {" "}
                      {country && (
                        <div className="form__linput">
                          <label className="form__txt-label" for="state">
                            <i class="fa-light fa-tree-city"></i> State
                          </label>

                          <div>
                            {/* <TransferWithinAStationIcon /> */}

                            <select
                              className="state-slct"
                              required
                              value={state}
                              onChange={(e) => setState(e.target.value)}
                            >
                              <option value="">State</option>
                              {State &&
                                State.getStatesOfCountry(country).map(
                                  (item) => (
                                    <option
                                      key={item.isoCode}
                                      value={item.isoCode}
                                    >
                                      {item.name}
                                    </option>
                                  )
                                )}
                            </select>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <button
                className="primary-btn "
                type="submit"
                style={{ width: "30%", margin: "auto" }}
                disabled={state ? false : true}
              >
                Continue to checkout
              </button>
            </div>
          </div>
        </form>
      </main>
    </>
  );
};

export default ShippingInfo;
