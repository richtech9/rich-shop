import { useContext, useEffect, useState } from "react";
import { CheckoutOrders } from "./CheckoutOrder/CheckoutOrders";
import { CheckoutStep1 } from "./CheckoutSteps/CheckoutStep1";
import { CheckoutStep2 } from "./CheckoutSteps/CheckoutStep2";
import { CheckoutStep3 } from "./CheckoutSteps/CheckoutStep3";
import withAuth from "auth/withAuth";
import axios from "axios";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import AppContext from "storeData/AppContext";
import { loadStripe } from "@stripe/stripe-js";

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
let stripePromise = null;
const getStripe = () => {
  if (!stripePromise) {
    stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);
  }
  return stripePromise;
};

const detailBlocks = [
  {
    step: "Step 1",
    title: "Order Details",
    icon: "icon-step1",
  },
  {
    step: "Step 2",
    title: "Confirm Order",
    icon: "icon-step2",
  },
  {
    step: "Step 3",
    title: "Finish!",
    icon: "icon-step3",
  },
];

const Checkout = () => {
  const [activeStep, setActiveStep] = useState(2);
  const {
    state: { cartData, user },
    dispatch,
  } = useContext(AppContext);
  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };
  const handlePrev = () => {
    setActiveStep(activeStep - 1);
  };

  const router = useRouter();
  const { session_id, canceled, aid } = router.query;

  const [loading, setdLoading] = useState({ type: "all", load: true });
  const [fullLoading, setFullloading] = useState(false);
  const [address, setAddress] = useState(null);
  const [addressid, setAddressid] = useState(null);
  const [dcost, setDcost] = useState(0);
  const [orderId, setOrderId] = useState(null);
  const getDeliveryCost = async (id) => {
    setdLoading({ type: "dc", load: true });
    try {
      const res = await axios.get("checkout/get-shipping-cost/" + id);
      setDcost(res.data.standard_delivery_cost);
    } catch (error) {
      console.log(error);
    }
    setdLoading({ type: "dc", load: false });
  };

  const getAllAddress = async () => {
    setdLoading({ type: "add", load: true });
    try {
      const res = await axios.get("user/addresses");
      if (res.data.success) {
        if (!res.data.data.length) {
          toast.warning("Add address first!");
          router.push({
            pathname: "/profile",
            query: { pathname: "/checkout", tab: "addressadd" },
          });
        }
        res.data.data.map((v) => {
          if (v.default_shipping) {
            setAddressid(v.id);
            setAddress(
              `${v.phone} - ${v.address}, ${v.city} - ${v.state}, ${v.postal_code}, ${v.country}`
            );
            getDeliveryCost(v.id);
          }
        });
      }
    } catch (error) {
      console.log(error);
    }
    setdLoading({ type: "add", load: false });
  };

  const sendOrder = async (online) => {
    const cart_item_ids = [];
    cartData.map((v) => {
      cart_item_ids.push(v.cart_id);
    });
    try {
      const res = await axios.post("checkout/order/store", {
        cart_item_ids,
        shipping_address_id: addressid ? addressid : aid,
        billing_address_id: addressid ? addressid : aid,
        delivery_type: "standard",
        payment_type: online ? "stripe" : "cash_on_delivery",
      });
      console.log(res);
      if (res.data.success) {
        setOrderId(res.data.order_code);
        toast.success(res.data.message);
        dispatch({ type: "SET_CART_DATA", payload: [] });
        localStorage.removeItem("cartdata");
        setActiveStep(3);
      } else {
        router.push("/cart");
        toast.warning(res.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const confrimOrder = async (isPay = false) => {
    if (isPay) {
      const lineItems = [];
      cartData.map((v) => {
        lineItems.push({
          price_data: {
            currency: "usd",
            product_data: {
              name: v.name,
              images: [v.thumbnail],
            },
            unit_amount: v.dicounted_price * 100,
          },
          quantity: v.qty,
        });
      });
      const body = { aid: addressid, lineItems };
      const res = await fetch("/api/checkout_sessions", {
        method: "post",
        body: JSON.stringify(body),
      });
      const data = await res.json();

      const stripe = await getStripe();
      await stripe.redirectToCheckout({ sessionId: data.id });
    } else {
      sendOrder();
    }
  };

  useEffect(() => {
    // Check to see if this is a redirect back from Checkout

    if (session_id) {
      fetch(`/api/checkout_sessions/${session_id}`)
        .then((v) => v.json())
        .then(async (data) => {
          if (data.payment_status == "paid" && data.status == "complete") {
            setFullloading(true);
            await sendOrder(true);
            setFullloading(false);
          } else {
            toast.error("Something wrong try again!");
          }
        })
        .catch((e) => toast.error("Something wrong try again!"));
      console.log("Order placed! You will receive an email confirmation.");
    }

    if (canceled) {
      console.log(
        "Order canceled -- continue to shop around and checkout when you’re ready."
      );
      toast.error("Something wrong try again!");
    }
  }, [session_id, canceled]);

  useEffect(() => {
    if (user) {
      getAllAddress();
    }
  }, [user]);

  return (
    <>
      <div className="wrapper">
        {/* <!-- BEGIN DETAIL MAIN BLOCK --> */}
        <div className="detail-block__items">
          {detailBlocks.map((block, index) => (
            <div
              key={index}
              className={`detail-block__item ${
                activeStep <= index && "detail-block__item-inactive"
              }`}
            >
              <div className="detail-block__item-icon">
                <img
                  src={
                    activeStep <= index
                      ? "/assets/img/main-text-decor2.svg"
                      : "/assets/img/main-text-decor.svg"
                  }
                  className="js-img"
                  alt=""
                />
                <i className={block.icon}></i>
              </div>
              <div className="detail-block__item-info">
                <h6>{block.step}</h6>
                {block.title}
              </div>
            </div>
          ))}
        </div>
        {/* <!-- DETAIL MAIN BLOCK EOF --> */}
      </div>

      {/* <!-- BEGIN CHECKOUT --> */}
      <div className={`checkout ${activeStep == 2 && "checkout-step2"}`}>
        <div className="wrapper">
          <div className="checkout-content">
            {(() => {
              switch (activeStep) {
                case 1:
                  return <CheckoutStep1 onNext={handleNext} />;
                case 2:
                  return (
                    <CheckoutStep2
                      onNext={handleNext}
                      onPrev={handlePrev}
                      loading={loading}
                      address={address}
                      confrimOrder={confrimOrder}
                      fullLoading={fullLoading}
                    />
                  );
                case 3:
                  return <CheckoutStep3 orderId={orderId} />;

                default:
                  return null;
              }
            })()}
            <div className="checkout-info">
              <CheckoutOrders dcost={dcost} loading={loading} />
            </div>
          </div>
        </div>
        {/* <img
          className="promo-video__decor js-img"
          src="/assets/img/promo-video__decor.jpg"
          alt=""
        /> */}
      </div>
      {/* <!-- CHECKOUT EOF   --> */}
    </>
  );
};

export default withAuth(Checkout);
