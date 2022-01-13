import productData from "data/product/product";
import { useContext, useEffect, useState } from "react";
import Slider from "react-slick";
import socialData from "data/social";
import { Reviews } from "../Reviews/Reviews";
import { ReviewFrom } from "../ReviewForm/ReviewFrom";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import AppContext from "storeData/AppContext";
import { add, remove, update } from "components/Cart/updateCart";
import { CartContext } from "pages/_app";

export const ProductDetails = ({ product, slug }) => {
  const router = useRouter();
  const { cart, setCart } = useContext(CartContext);

  const {
    state: { whishlist, cartData },
    dispatch,
  } = useContext(AppContext);

  const socialLinks = [...socialData];
  const products = [...productData];
  // const [product, setProduct] = useState(null);
  const [addedInCart, setAddedInCart] = useState(false);

  // useEffect(() => {
  //   if (router.query.id) {
  //     const data = products.find((pd) => pd.id === router.query.id);
  //     setProduct(data);
  //   }
  // }, [router.query.id]);

  // useEffect(() => {
  //   if (product) {
  //     setAddedInCart(Boolean(cart?.find((pd) => pd.id === product.id)));
  //   }
  // }, [product, cart]);

  const [quantity, setQuantity] = useState(1);
  const [tab, setTab] = useState(2);
  const [activeColor, setActiveColor] = useState(2);
  const [nav1, setNav1] = useState();
  const [nav2, setNav2] = useState();

  const [loading, setLoading] = useState(false);
  const [uloading, setuLoading] = useState(false);
  const currentProduct = cartData.find((v) => v.product_id == product.id);

  const handleAddToCart = async () => {
    setLoading(true);
    await add(quantity, product.variations[0].id, dispatch);
    setLoading(false);
  };
  const removeCart = async () => {
    setLoading(true);
    await remove(currentProduct.cart_id, dispatch);
    setLoading(false);
    setQuantity(1);
  };

  const addToWhishlist = () => {
    const payload = {
      id: product.id,
      name: product.name,
      price: product.base_discounted_price,
      image: product.thumbnail_image,
      slug: product.slug,
    };
    dispatch({ type: "ADD_TO_WHISHLIST", payload });
    toast.success("Successfully wishlist added!");
  };

  const inWishlist = Boolean(whishlist.find((v) => v.id == product.id));

  useEffect(() => {
    if (currentProduct) {
      setQuantity(currentProduct.qty);
    }
  }, [currentProduct]);

  if (!product) return <></>;

  return (
    <>
      {/* <!-- BEGIN PRODUCT --> */}
      <div className="product">
        <div className="wrapper">
          <div className="product-content">
            {/* <!-- Product Main Slider --> */}
            <div className="product-slider">
              <div className="product-slider__main">
                <Slider
                  fade={true}
                  asNavFor={nav2}
                  arrows={false}
                  lazyLoad={true}
                  ref={(slider1) => setNav1(slider1)}
                >
                  <div className="product-slider__main-item">
                    <div className="products-item__type">
                      {product.isSale && (
                        <span className="products-item__sale">sale</span>
                      )}
                      {product.isNew && (
                        <span className="products-item__new">new</span>
                      )}
                    </div>
                    <img src={product.thumbnail_image} alt="product" />
                  </div>
                  {product.photos.map((img, index) => (
                    <div key={index} className="product-slider__main-item">
                      <div className="products-item__type">
                        {product.isSale && (
                          <span className="products-item__sale">sale</span>
                        )}
                        {product.isNew && (
                          <span className="products-item__new">new</span>
                        )}
                      </div>
                      <img src={img} alt="product" />
                    </div>
                  ))}
                </Slider>
              </div>

              {/* <!-- Product Slide Nav --> */}
              <div className="product-slider__nav">
                <Slider
                  arrows={false}
                  asNavFor={nav1}
                  ref={(slider2) => setNav2(slider2)}
                  slidesToShow={4}
                  swipeToSlide={true}
                  focusOnSelect={true}
                >
                  <div className="product-slider__nav-item">
                    <img src={product.thumbnail_image} alt="product" />
                  </div>
                  {product.photos.map((img, index) => (
                    <div key={index} className="product-slider__nav-item">
                      <img src={img} alt="product" />
                    </div>
                  ))}
                </Slider>
              </div>
            </div>
            <div className="product-info">
              <h3>{product.name}</h3>
              {product.stock ? (
                <span className="product-stock">in stock</span>
              ) : (
                ""
              )}

              <span className="product-num">SKU: {product.productNumber}</span>
              {product.base_price != product.base_discounted_price ? (
                <span className="product-price">
                  <span>${product.base_price}</span>$
                  {product.base_discounted_price}
                </span>
              ) : (
                <span className="product-price">${product.base_price}</span>
              )}
              <p>{product.content}</p>

              {/* <!-- Social Share Link --> */}
              <div className="contacts-info__social">
                <span>Find us here:</span>
                <ul>
                  {socialLinks.map((social, index) => (
                    <li key={index}>
                      <a href={social.path}>
                        <i className={social.icon ? social.icon : ""}></i>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* <!-- Product Color info--> */}
              <div className="product-options">
                <div className="product-info__color">
                  <span>Color:</span>
                  <ul>
                    {product?.colors?.map((color, index) => (
                      <li
                        onClick={() => setActiveColor(index)}
                        className={activeColor === index ? "active" : ""}
                        key={index}
                        style={{ backgroundColor: color }}
                      ></li>
                    ))}
                  </ul>
                </div>

                {/* <!-- Order Item counter --> */}
                <div className="product-info__quantity">
                  <span className="product-info__quantity-title">
                    Quantity:
                  </span>
                  <div className="counter-box">
                    <button
                      onClick={async () => {
                        if (currentProduct) {
                          setuLoading(true);
                          await update(
                            "minus",
                            {
                              type: "DECREASE_QTY",
                              payload: { id: product.id },
                            },
                            currentProduct,
                            dispatch
                          );
                          setuLoading(false);
                        } else {
                          if (quantity > 1) {
                            setQuantity(quantity - 1);
                          }
                        }
                      }}
                      disabled={uloading}
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
                      onClick={async () => {
                        if (currentProduct) {
                          setuLoading(true);
                          await update(
                            "plus",
                            {
                              type: "INCREASE_QTY",
                              payload: { id: product.id },
                            },
                            currentProduct,
                            dispatch
                          );
                          setuLoading(false);
                        } else {
                          setQuantity(quantity + 1);
                        }
                      }}
                      disabled={uloading}
                      className="counter-link counter-link__next"
                    >
                      <i className="icon-arrow"></i>
                    </button>
                    {uloading ? (
                      <img src="/assets/img/icons/loading.gif" width={25} />
                    ) : null}
                  </div>
                </div>
              </div>
              <div className="product-buttons">
                <button
                  // disabled={currentProduct ? true : false}
                  onClick={currentProduct ? removeCart : handleAddToCart}
                  className="btn btn-icon"
                >
                  <i className="icon-cart"></i>
                  {loading ? (
                    <img src="/assets/img/icons/loading.gif" width={25} />
                  ) : currentProduct ? (
                    "remove"
                  ) : (
                    "add cart"
                  )}
                </button>
                <button
                  className="btn btn-grey btn-icon"
                  disabled={inWishlist}
                  onClick={addToWhishlist}
                >
                  <i
                    className="icon-heart"
                    style={inWishlist ? { color: "red" } : {}}
                  ></i>{" "}
                  wish
                </button>
              </div>
            </div>
          </div>

          {/* <!-- Product Details Tab --> */}
          <div className="product-detail">
            <div className="tab-wrap product-detail-tabs">
              <ul className="nav-tab-list tabs pd-tab">
                <li
                  className={tab === 1 ? "active" : ""}
                  onClick={() => setTab(1)}
                >
                  Description
                </li>
                <li
                  className={tab === 2 ? "active" : ""}
                  onClick={() => setTab(2)}
                >
                  Reviews
                </li>
              </ul>
              <div className="box-tab-cont">
                {/* <!-- Product description --> */}
                {tab === 1 && (
                  <div className="tab-cont">
                    <p>{product.description}</p>
                    <p>{product.description}</p>
                  </div>
                )}

                {tab === 2 && (
                  <div className="tab-cont product-reviews">
                    {/* <!-- Product Reviews --> */}
                    {/* <Reviews reviews={product.reviews} /> */}

                    {/* <!-- Product Review Form --> */}
                    <ReviewFrom />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        <img
          className="promo-video__decor js-img"
          src="/assets/img/promo-video__decor.jpg"
          alt=""
        />
      </div>
      {/* <!-- PRODUCT EOF   --> */}
    </>
  );
};
