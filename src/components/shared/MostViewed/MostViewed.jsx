import { ProductsCarousel } from "components/Product/Products/ProductsCarousel";
import { SectionTitle } from "components/shared/SectionTitle/SectionTitle";
import productData from "data/product/product";
import { useContext, useEffect, useState } from "react";
import AppContext from "storeData/AppContext";

export const MostViewed = ({ additionalClass, pid }) => {
  const mostViewed = [...productData].slice(0, 6);
  const {
    state: { allProducts },
  } = useContext(AppContext);

  const [products, setProducts] = useState([]);

  useEffect(() => {
    const cid = allProducts.find((v) => v.id == pid)?.category[0].id;
    const newItems = allProducts.filter((pd) =>
      pd?.category.find((v) => v.id == cid)
    );
    //console.log(newItems);
    setProducts(newItems);
  }, [pid, allProducts]);
  return (
    <>
      {/* <!-- BEGIN MOST VIEWED --> */}
      <section className={`arrivals ${additionalClass ? additionalClass : ""}`}>
        <SectionTitle
          subTitle="Cosmetics"
          title="Related Products"
          body="Nourish your skin with toxin-free cosmetic products. With the offers that you can’t refuse."
        />

        <div className="products-items">
          <ProductsCarousel products={products} />
        </div>
      </section>
      {/* <!-- MOST VIEWED EOF --> */}
    </>
  );
};
