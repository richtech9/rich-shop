import productData from "data/product/product";
import { CartContext } from "pages/_app";
import { useContext, useEffect, useState } from "react";
import AppContext from "storeData/AppContext";
import { Card } from "./Card/Card";

export const CheckoutOrders = ({ dcost, loading, discount }) => {
  const { cart } = useContext(CartContext);
  const [info, setInfo] = useState({ info: 0, total: 0, discount: 0 });
  const {
    state: { cartData },
  } = useContext(AppContext);

  useEffect(() => {
    const total = cartData.reduce(
      (total, item) => total + Number(item.dicounted_price) * Number(item.qty),
      0
    );
    setInfo({ dcost, total, discount: discount ? discount : 0 });
  }, [dcost]);

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
          <span>${info.total.toFixed(2)}</span>
        </div>
        <div className="cart-bottom__total-promo">
          Discount on promo code
          <span>${discount}</span>
        </div>
        <div className="cart-bottom__total-delivery">
          Delivery Cost
          {loading.load && loading.type == "dc" ? (
            <span>
              <img src="/assets/img/icons/loading.gif" width={20} />
            </span>
          ) : (
            <span>${info.dcost}</span>
          )}
        </div>
        <div className="cart-bottom__total-num">
          total:
          <span>${(info.total + info.dcost - info.discount).toFixed(2)}</span>
        </div>
      </div>
    </>
  );
};
