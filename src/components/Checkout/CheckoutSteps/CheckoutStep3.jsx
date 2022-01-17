import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export const CheckoutStep3 = ({ orderId }) => {
  const [loading, setLoading] = useState(false);
  const [orderDetails, setOrderDetails] = useState({});
  const router = useRouter();
  const getOrderDetails = async () => {
    setLoading(true);
    try {
      const res = await axios.get("user/order/" + orderId);
      console.log(res);
      if (res.data.success) {
        setOrderDetails(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    getOrderDetails();
  }, []);
  return (
    <>
      {/* <!-- BEING CHECKOUT STEP Three -->  */}
      <div className="checkout-purchase checkout-form">
        <h4>
          BeShop thanks
          <br />
          you for your purchase!
        </h4>
        <p>
          Consequat minim ipsum aliquip quis ullamco aliquip consequat aliquip
          sit eu enim duis qui. Velit minim tempor non aliquip officia cillum.
          Irure Lorem do enim sint in commodo. Ea ea nostrud labore mollit nisi.
          Cupidatat esse minim mollit qui velit esse voluptate. Excepteur ad
          officia dolore amet magna ipsum dolor incididunt excepteur ad non. Ea
          ea qui irure excepteur est consectetur amet est exercitation in.
        </p>
        {loading ? (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <img src="/assets/img/icons/loading.gif" width={70} />
          </div>
        ) : (
          <ul className="checkout-purchase__list">
            {/* "payment_type": "stripe",
        "delivery_type": "standard",
        "delivery_status": "order_placed",
        "payment_status": "paid",
        "grand_total": 45,
        "coupon_discount": 0,
        "shipping_cost": 5,
        "subtotal": 40,
        "tax": 0, */}
            <li>
              <span>Order number</span>
              {orderDetails.code}
            </li>
            <li>
              <span>Order status</span>Order Placed
            </li>
            <li>
              <span>Reserved for</span>
              {orderDetails.date}
            </li>
            <li>
              <span>Payment status</span>
              {orderDetails.payment_status}
            </li>
            <li>
              <span>Payment type</span>
              {orderDetails.payment_type}
            </li>
          </ul>
        )}

        <div className="checkout-buttons">
          <button
            onClick={() => router.push("/profile")}
            className="btn btn-next"
          >
            Order List
          </button>
          <button onClick={() => router.push("/")} className="btn btn-grey">
            Home page
          </button>
        </div>
        <a href="#" className="checkout-purchase__link">
          print a document -
        </a>
      </div>
      {/* <!-- CHECKOUT STEP TWO EOF -->  */}
    </>
  );
};
