import Link from "next/link";
import { useContext, useState } from "react";
import AppContext from "storeData/AppContext";
import { remove } from "../updateCart";

export const Card = ({ cart, onChangeQuantity, loading }) => {
  const {
    name,
    thumbnail: image,
    slug: id,
    stock: isStocked,
    productNumber,
    product_id,
    regular_price: oldPrice,
    dicounted_price: price,
    qty: quantity,
    cart_id,
  } = cart;
  const { dispatch } = useContext(AppContext);
  return (
    <>
      <div className="cart-table__row">
        <div className="cart-table__col">
          <Link href={`/product/${id}`}>
            <a className="cart-table__img">
              <img src={image} className="js-img" alt="" />
            </a>
          </Link>
          <div className="cart-table__info">
            <Link href={`/product/${id}`}>
              <a className="title5">{name}</a>
            </Link>
            {isStocked ? (
              <span className="cart-table__info-stock">in stock</span>
            ) : null}
            {/* <span className="cart-table__info-num">SKU: {productNumber}</span> */}
          </div>
        </div>
        <div className="cart-table__col">
          {oldPrice !== price ? (
            <span className="cart-table__price">
              <span>${oldPrice}</span>${price}
            </span>
          ) : (
            <span className="cart-table__price">${price}</span>
          )}
        </div>
        <div className="cart-table__col">
          <div className="cart-table__quantity">
            <div className="counter-box">
              <button
                onClick={() =>
                  onChangeQuantity("minus", {
                    type: "DECREASE_QTY",
                    payload: { id: product_id },
                  })
                }
                disabled={loading.load}
                className="counter-link counter-link__prev"
              >
                <i className="icon-arrow"></i>
              </button>
              <input
                type="text"
                className="counter-input"
                disabled
                value={quantity}
              />
              <button
                onClick={() =>
                  onChangeQuantity("plus", {
                    type: "INCREASE_QTY",
                    payload: { id: product_id },
                  })
                }
                disabled={loading.load}
                className="counter-link counter-link__next"
              >
                <i className="icon-arrow"></i>
              </button>
              {loading.id == id && loading.load ? (
                <img src="/assets/img/icons/loading.gif" width={25} />
              ) : null}
            </div>
          </div>
        </div>
        <div className="cart-table__col">
          <span className="cart-table__total">
            ${(price * quantity).toFixed(2)}
          </span>
          <button
            onClick={() => remove(cart_id, dispatch)}
            className="btn"
            style={{
              height: "30px",
              padding: "0 8px",
              lineHeight: "30px",
              fontSize: "12px",
              marginLeft: "10px",
            }}
          >
            X
          </button>
        </div>
      </div>
    </>
  );
};
