import React from "react";
import InfromatonSidebar from "../component/InfromatonSidebar";

const WishList = () => {
  return (
    <>
      <div className="container profile-box-parent">
        <div className="row">
          <div className="col-lg-3 position-relative p-0">
            <InfromatonSidebar />
          </div>
          <div
            className="col-lg-8"
            data-bs-spy="scroll"
            data-bs-target="#profilenav"
            data-bs-offset="0"
            tabIndex="0"
          >
            <div class="shopping-cart">
              <div class="title">Shopping Bag</div>

              <div class="item">
                <div class="buttons">
                  <span class="delete-btn"></span>
                  <span class="like-btn"></span>
                </div>

                <div class="image">
                  <img
                    src="https://designmodo.com/demo/shopping-cart/item-1.png"
                    alt=""
                  />
                </div>

                <div class="description">
                  <span>Common Projects</span>
                  <span>Bball High</span>
                  <span>White</span>
                </div>

                <div class="quantity">
                  <button class="plus-btn" type="button" name="button">
                    <img
                      src="https://designmodo.com/demo/shopping-cart/plus.svg"
                      alt=""
                    />
                  </button>
                  <input type="text" name="name" value="1" />
                  <button class="minus-btn" type="button" name="button">
                    <img
                      src="https://designmodo.com/demo/shopping-cart/minus.svg"
                      alt=""
                    />
                  </button>
                </div>

                <div class="total-price">$549</div>
              </div>

              <div class="item">
                <div class="buttons">
                  <span class="delete-btn"></span>
                  <span class="like-btn"></span>
                </div>

                <div class="image">
                  <img
                    src="https://designmodo.com/demo/shopping-cart/item-2.png"
                    alt=""
                  />
                </div>

                <div class="description">
                  <span>Maison Margiela</span>
                  <span>Future Sneakers</span>
                  <span>White</span>
                </div>

                <div class="quantity">
                  <button class="plus-btn" type="button" name="button">
                    <img
                      src="https://designmodo.com/demo/shopping-cart/plus.svg"
                      alt=""
                    />
                  </button>
                  <input type="text" name="name" value="1" />
                  <button class="minus-btn" type="button" name="button">
                    <img
                      src="https://designmodo.com/demo/shopping-cart/minus.svg"
                      alt=""
                    />
                  </button>
                </div>

                <div class="total-price">$870</div>
              </div>

              <div class="item">
                <div class="buttons">
                  <span class="delete-btn"></span>
                  <span class="like-btn"></span>
                </div>

                <div class="image">
                  <img
                    src="https://designmodo.com/demo/shopping-cart/item-3.png"
                    alt=""
                  />
                </div>

                <div class="description">
                  <span>Our Legacy</span>
                  <span>Brushed Scarf</span>
                  <span>Brown</span>
                </div>

                <div class="quantity">
                  <button class="plus-btn" type="button" name="button">
                    <img
                      src="https://designmodo.com/demo/shopping-cart/plus.svg"
                      alt=""
                    />
                  </button>
                  <input type="text" name="name" value="1" />
                  <button class="minus-btn" type="button" name="button">
                    <img
                      src="https://designmodo.com/demo/shopping-cart/minus.svg"
                      alt=""
                    />
                  </button>
                </div>

                <div class="total-price">$349</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default WishList;
