import { ProductsCarousel } from "components/Product/Products/ProductsCarousel";
import { SectionTitle } from "components/shared/SectionTitle/SectionTitle";
import productData from "data/product/product";
import { useContext } from "react";
import AppContext from "storeData/AppContext";

export const NewArrivals = () => {
  const {
    state: { allProducts },
  } = useContext(AppContext);

  return (
    <>
      {/* <!-- BEGIN NEW ARRIVALS --> */}
      <section className="arrivals">
        <SectionTitle
          subTitle="Cosmetics"
          title="New arrivals"
          body="Nourish your skin with toxin-free cosmetic products. With the offers that you can’t refuse."
        />

        <div className="products-items">
          <ProductsCarousel products={allProducts} />
        </div>
      </section>
      {/* <!-- NEW ARRIVALS EOF --> */}
    </>
  );
};
