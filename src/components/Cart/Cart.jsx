import { Card } from "./Card/Card";
import socialData from "data/social";
import { CartContext } from "pages/_app";
import { useContext, useEffect, useState } from "react";
import Link from "next/link";
import AppContext from "storeData/AppContext";
import { update } from "./updateCart";

export const Cart = () => {
  const { cart, setCart } = useContext(CartContext);
  const [loading, setLoading] = useState({ load: false });
  const {
    state: { cartData },
    dispatch,
  } = useContext(AppContext);
  const [count, setCount] = useState(0);
  const socialLinks = [...socialData];

  const total = cartData.reduce(
    (total, item) => total + Number(item.dicounted_price) * Number(item.qty),
    0
  );

  const handleProductQuantity = (change, quantity, id) => {
    console.log(change, quantity, id);
    if (change === "increment") {
      cart.find((item) => item.id === id).quantity = quantity + 1;
      setCount(count + 1);
    }
    if (change === "decrement" && quantity > 1) {
      cart.find((item) => item.id === id).quantity = quantity - 1;
      setCount(count + 1);
    }
  };

  useEffect(() => {
    setCart(cart);
  }, [cart, count]);

  return (
    <>
      {/* <!-- BEGIN CART --> */}
      <div className="cart">
        <div className="wrapper">
          <div className="cart-table">
            <div className="cart-table__box">
              <div className="cart-table__row cart-table__row-head">
                <div className="cart-table__col">Product</div>
                <div className="cart-table__col">Price</div>
                <div className="cart-table__col">Quantity</div>
                <div className="cart-table__col">Total</div>
              </div>

              {cartData.map((cart) => (
                <Card
                  onChangeQuantity={async (type, payload) => {
                    setLoading({ load: true, id: cart.slug });
                    try {
                      await update(type, payload, cart, dispatch);
                    } catch (error) {
                      console.log(error);
                      setLoading({ load: false });
                    }
                    setLoading({ load: false });
                  }}
                  key={cart.cart_id}
                  cart={cart}
                  loading={loading}
                />
              ))}
            </div>
          </div>
          <div className="cart-bottom">
            <div className="cart-bottom__promo">
              <form className="cart-bottom__promo-form">
                <div className="box-field__row">
                  <div className="box-field">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter promo code"
                    />
                  </div>
                  <button type="submit" className="btn btn-grey">
                    apply code
                  </button>
                </div>
              </form>
              <h6>How to get a promo code?</h6>
              <p>
                Follow our news on the website, as well as subscribe to our
                social networks. So you will not only be able to receive
                up-to-date codes, but also learn about new products and
                promotional items.
              </p>
              <div className="contacts-info__social">
                <span>Find us here:</span>
                <ul>
                  {socialLinks.map((social, index) => (
                    <li key={index}>
                      <a href={social.path} target="_blank">
                        <i className={social.icon}></i>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="cart-bottom__total">
              <div className="cart-bottom__total-goods">
                Goods on
                <span>${total.toFixed(2)}</span>
              </div>
              <div className="cart-bottom__total-promo">
                Discount on promo code
                <span>No</span>
              </div>
              <div className="cart-bottom__total-num">
                total:
                <span>${total.toFixed(2)}</span>
              </div>
              <Link href="/checkout">
                <a className="btn">Checkout</a>
              </Link>
            </div>
          </div>
        </div>
        <img
          className="promo-video__decor js-img"
          src="assets/img/promo-video__decor.jpg"
          alt=""
        />
      </div>
      {/* <!-- CART EOF   --> */}
    </>
  );
};
