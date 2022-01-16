import productData from "data/product/product";
import { CartContext } from "pages/_app";
import { useContext } from "react";
import AppContext from "storeData/AppContext";
import { Card } from "./Card/Card";

export const CheckoutOrders = ({ dcost, loading }) => {
  const { cart } = useContext(CartContext);
  const {
    state: { cartData },
  } = useContext(AppContext);
  const total = cartData.reduce(
    (total, item) => total + Number(item.dicounted_price) * Number(item.qty),
    0
  );

  return (
    <>
      <div className="checkout-order">
        <h5>Your Order</h5>
        {cart.map((order) => (
          <Card key={order.id} order={order} />
        ))}
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
        <div className="cart-bottom__total-delivery">
          Delivery Cost
          {loading.load && loading.type == "dc" ? (
            <span>
              <img src="/assets/img/icons/loading.gif" width={20} />
            </span>
          ) : (
            <span>${dcost}</span>
          )}
        </div>
        <div className="cart-bottom__total-num">
          total:
          <span>${(total + dcost).toFixed(2)}</span>
        </div>
      </div>
    </>
  );
};
