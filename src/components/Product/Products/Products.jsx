import { CartContext } from "pages/_app";
import { useContext } from "react";
import { toast } from "react-toastify";
import AppContext from "storeData/AppContext";
import { SingleProduct } from "./SingleProduct/SingleProduct";

export const Products = ({ products }) => {
  const { cart, setCart } = useContext(CartContext);

  const {
    dispatch,
    state: { whishlist },
  } = useContext(AppContext);

  const handleAddToCart = (id) => {
    const newProduct = products?.find((pd) => pd.id === id);
    setCart([...cart, { ...newProduct, quantity: 1 }]);
  };
  const addToWhishlist = (data) => {
    const payload = {
      id: data.id,
      name: data.name,
      price: data.base_discounted_price,
      image: data.thumbnail_image,
      slug: data.slug,
    };
    dispatch({ type: "ADD_TO_WHISHLIST", payload });
    toast.success("Successfully wishlist added!");
  };
  return (
    <>
      {products.map((product) => (
        <SingleProduct
          addedInCart={Boolean(cart?.find((pd) => pd.id === product.id))}
          key={product.id}
          product={product}
          onAddToWish={addToWhishlist}
          onAddToCart={handleAddToCart}
          addedInWish={Boolean(whishlist.find((v) => v.id == product.id))}
        />
      ))}
    </>
  );
};
