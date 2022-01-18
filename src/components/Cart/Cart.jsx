import { Card } from "./Card/Card";
import socialData from "data/social";
import { CartContext } from "pages/_app";
import { useContext, useEffect, useState } from "react";
import Link from "next/link";
import AppContext from "storeData/AppContext";
import { update } from "./updateCart";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import axios from "axios";

export const Cart = () => {
  const { cart, setCart } = useContext(CartContext);
  const [loading, setLoading] = useState({ load: false });
  const {
    state: { cartData, user },
    dispatch,
  } = useContext(AppContext);
  const [count, setCount] = useState(0);
  const [promoCode, setPromoCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const socialLinks = [...socialData];
  const router = useRouter();
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

  const submitPromo = async (e) => {
    e.preventDefault();
    if (user) {
      const cart_item_ids = [];
      cartData.map((v) => {
        cart_item_ids.push(v.cart_id);
      });
      setLoading({ type: "promo", load: true });
      const res = await axios.post("checkout/coupon/apply", {
        coupon_code: promoCode,
        cart_item_ids,
      });
      console.log(res);
      if (res.data.success) {
        toast.success(res.data.message);
        if (res.data.coupon_details.discount_type == "amount") {
          setDiscount(res.data.coupon_details.discount);
        } else {
          const d = res.data.coupon_details.discount / 100;
          const t = total - total * d;
          setDiscount(total - t);
        }
      } else {
        toast.warning(res.data.message);
      }

      setLoading({ type: "promo", load: false });
    } else {
      toast.warning("Please Login Frist!");
      router.push({
        pathname: "/login",
        query: { pathname: router.asPath },
      });
    }
  };

  useEffect(() => {
    setCart(cart);
  }, [cart, count, cartData]);

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
              <form className="cart-bottom__promo-form" onSubmit={submitPromo}>
                <div className="box-field__row">
                  <div className="box-field">
                    <input
                      required
                      type="text"
                      className="form-control"
                      placeholder="Enter promo code"
                      onChange={(e) => setPromoCode(e.target.value)}
                    />
                  </div>

                  <button
                    className="btn btn-grey"
                    type="submit"
                    disabled={loading.load}
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    {loading.load && loading.type == "promo" ? (
                      <img src="/assets/img/icons/loading.gif" width={30} />
                    ) : (
                      "apply code"
                    )}
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
                <span>${discount}</span>
              </div>
              <div className="cart-bottom__total-num">
                total:
                <span>${(total - discount).toFixed(2)}</span>
              </div>
              <Link href={`/checkout?discount=${discount}&pcode=${promoCode}`}>
                <a
                  className="btn"
                  onClick={() => {
                    if (!cartData.length) {
                      toast.warning(
                        "Your cart is empty, please add some product!"
                      );
                      router.push("/shop");
                    }
                  }}
                >
                  Checkout
                </a>
              </Link>
            </div>
          </div>
        </div>
        {/* <img
          className="promo-video__decor js-img"
          src="assets/img/promo-video__decor.jpg"
          alt=""
        /> */}
      </div>
      {/* <!-- CART EOF   --> */}
    </>
  );
};
