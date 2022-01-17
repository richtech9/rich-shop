import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export const CheckoutStep2 = ({
  onNext,
  onPrev,
  loading,
  address,
  confrimOrder,
  fullLoading,
}) => {
  const [payment, setPayment] = useState("card");
  const [cLoading, setCloading] = useState(false);
  const router = useRouter();
  return (
    <>
      {/* <!-- BEING CHECKOUT STEP TWO -->  */}
      {fullLoading ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flex: 1,
          }}
        >
          <img src="/assets/img/icons/loading.gif" width={100} />
        </div>
      ) : (
        <div className="checkout-payment checkout-form">
          <h4>Payment Methods</h4>

          <div
            className={`checkout-payment__item ${
              payment === "cash" && "active"
            }`}
          >
            <div className="checkout-payment__item-head">
              <label onClick={() => setPayment("cash")} className="radio-box">
                cash on delivery
                <input type="radio" checked={payment === "cash"} name="radio" />
                <span className="checkmark"></span>
                <span className="radio-box__info">
                  <i className="icon-info"></i>
                  <span className="radio-box__info-content">
                    Aliqua nulla id aliqua minim ullamco adipisicing enim. Do
                    sint nisi velit qui. Ullamco Lorem aliquip dolor nostrud
                    cupidatat amet.
                  </span>
                </span>
              </label>
            </div>
          </div>
          <div
            className={`checkout-payment__item ${
              payment === "card" && "active"
            }`}
          >
            <div className="checkout-payment__item-head">
              <label onClick={() => setPayment("card")} className="radio-box">
                Pay on card
                <input type="radio" checked={payment === "card"} name="radio" />
                <span className="checkmark"></span>
                <span className="radio-box__info">
                  <i className="icon-info"></i>
                  <span className="radio-box__info-content">
                    Aliqua nulla id aliqua minim ullamco adipisicing enim. Do
                    sint nisi velit qui. Ullamco Lorem aliquip dolor nostrud
                    cupidatat amet.
                  </span>
                </span>
              </label>
            </div>
            {/* <div className="checkout-payment__item-content">
            <div className="box-field">
              <span>Card number</span>
              <input
                type="text"
                className="form-control"
                placeholder="xxxx xxxx xxxx xxxx"
                maxlength="16"
              />
            </div>
            <div className="box-field__row">
              <div className="box-field">
                <span>Expiration date</span>
                <input
                  type="text"
                  className="form-control"
                  placeholder="mm"
                  maxlength="2"
                />
              </div>
              <div className="box-field">
                <input
                  type="text"
                  className="form-control"
                  placeholder="yy"
                  maxlength="2"
                />
              </div>
              <div className="box-field">
                <span>Security code</span>
                <input
                  type="text"
                  className="form-control"
                  placeholder="CVV"
                  maxlength="3"
                />
              </div>
            </div>
          </div> */}
          </div>
          <h4>Your Shipping Address</h4>
          {loading.load && loading.type == "add" ? (
            <div style={{ display: "flex", justifyContent: "center" }}>
              <img src="/assets/img/icons/loading.gif" width={50} />
            </div>
          ) : (
            <p className="mb-0">
              {address}
              <button
                onClick={() =>
                  router.push({
                    pathname: "/profile",
                    query: { tab: "address" },
                  })
                }
                className="btn"
                style={{
                  height: "40px",
                  padding: "0 10px",
                  lineHeight: "40px",
                  fontSize: "12px",
                  marginLeft: "20px",
                }}
              >
                Change Address
              </button>
            </p>
          )}

          <div className="checkout-buttons">
            {/* <button onClick={onPrev} className='btn btn-grey btn-icon'>
            <i className='icon-arrow'></i> back
          </button> */}
            <button
              className="btn btn-icon btn-next"
              onClick={async () => {
                setCloading(true);
                await confrimOrder(payment == "card" ? true : false);
                setCloading(false);
              }}
            >
              {cLoading ? (
                <img src="/assets/img/icons/loading.gif" width={25} />
              ) : (
                <>
                  {payment == "card" ? (
                    "Pay"
                  ) : (
                    <>
                      Order <i className="icon-arrow"></i>
                    </>
                  )}
                </>
              )}
            </button>
            {/* <form method="post" action="/api/checkout_sessions">
            <button type="submit" className="btn">
              Pay
            </button>
          </form> */}
          </div>
        </div>
      )}
    </>
  );
};
