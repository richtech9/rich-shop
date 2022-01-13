import productData from "data/product/product";
import { Card } from "./Card/Card";
import Link from "next/link";
import { useContext } from "react";
import AppContext from "storeData/AppContext";

export const Wishlist = () => {
  // const wishItems = [...productData].slice(0, 2);
  // wishItems[1].isStocked = false;
  const {
    state: { whishlist },
    dispatch,
  } = useContext(AppContext);

  return (
    <>
      {/* <!-- BEGIN WISHLIST --> */}
      <div className="wishlist">
        <div className="wrapper">
          <div className="cart-table">
            <div className="cart-table__box">
              <div className="cart-table__row cart-table__row-head">
                <div className="cart-table__col">Product</div>
                <div className="cart-table__col">Price</div>
                {/* <div className='cart-table__col'>status</div> */}
                <div className="cart-table__col">Add to cart</div>
              </div>

              {whishlist.map((wish) => (
                <Card key={wish.id} wish={wish} />
              ))}
            </div>
          </div>
          <div className="wishlist-buttons">
            <a
              onClick={() => {
                if (confirm("Are You Sure!")) {
                  localStorage.removeItem("whishlist");
                  dispatch({ type: "SET_WHISHLIST_DATA", payload: [] });
                }
              }}
              className="btn btn-grey"
              style={{ cursor: "pointer" }}
            >
              clear Wishlist
            </a>
            <Link href="/shop">
              <a className="btn">go shopping</a>
            </Link>
          </div>
        </div>
        <img
          className="promo-video__decor js-img"
          data-src="/assets/img/promo-video__decor.jpg"
          alt=""
        />
      </div>
      {/* <!-- WISHLIST EOF   --> */}
    </>
  );
};
