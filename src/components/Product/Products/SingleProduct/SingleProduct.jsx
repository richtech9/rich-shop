import { add } from "components/Cart/updateCart";
import Link from "next/link";
import { useContext, useState } from "react";
import { toast } from "react-toastify";
import AppContext from "storeData/AppContext";

export const SingleProduct = ({
  product,
  onAddToWish,
  onAddToCart,
  addedInCart,
  addedInWish,
}) => {
  const {
    name,
    base_price: oldPrice,
    base_discounted_price: price,
    thumbnail_image: image,
    isSale,
    isNew,
    stock,
    slug: id,
  } = product;
  const {
    state: { cartData },
    dispatch,
  } = useContext(AppContext);
  const [loading, setLoading] = useState(false);
  const currentProduct = cartData.find((v) => v.product_id == product.id);

  const addCart = async () => {
    setLoading(true);
    if (stock) {
      await add(1, product.variations[0].id, dispatch);
    } else {
      toast.warning("Stock out");
    }
    setLoading(false);
  };
  return (
    <div className="products-item">
      <div className="products-item__type">
        {isSale && <span className="products-item__sale">sale</span>}
        {isNew && <span className="products-item__new">new</span>}
      </div>
      <div className="products-item__img">
        <img src={image} className="js-img" alt="" />
        <div className="products-item__hover">
          <Link href={`/product/${id}`}>
            <a>
              <i className="icon-search"></i>
            </a>
          </Link>
          <div className="products-item__hover-options">
            <button
              className="addList"
              onClick={addedInWish ? null : () => onAddToWish(product)}
            >
              <i
                className="icon-heart"
                style={addedInWish ? { color: "red" } : {}}
              ></i>
            </button>
            <button
              disabled={currentProduct ? true : false}
              className={`addList ${currentProduct ? "added" : ""}`}
              onClick={addCart}
            >
              {loading ? (
                <img src="/assets/img/icons/loading.gif" />
              ) : (
                <i className="fas fa-shopping-bag"></i>
              )}
            </button>
          </div>
        </div>
      </div>
      <div className="products-item__info">
        <Link href={`/product/${id}`}>
          <a>
            <span className="products-item__name">{name}</span>
          </a>
        </Link>
        <span className="products-item__cost">
          <span>{oldPrice != price ? `$${oldPrice}` : null}</span> ${price}
        </span>
      </div>
    </div>
  );
};
