import { ProductsCarousel } from "components/Product/Products/ProductsCarousel";
import { SectionTitle } from "components/shared/SectionTitle/SectionTitle";
import { useContext, useEffect, useState } from "react";
import productData from "data/product/product";
import axios from "axios";
import AppContext from "storeData/AppContext";

export const Trending = () => {
  const trendingProducts = [...productData];
  const {
    state: { category, allProducts },
  } = useContext(AppContext);
  const [products, setProducts] = useState(trendingProducts);
  const [filterItem, setFilterItem] = useState("makeup");
  const [filterList, setFilterList] = useState([
    {
      name: "Make Up",
      value: "makeup",
    },
    {
      name: "SPA",
      value: "spa",
    },
    {
      name: "Perfume",
      value: "perfume",
    },
    {
      name: "Nails",
      value: "nail",
    },
    {
      name: "Skin care",
      value: "skin",
    },
    {
      name: "Hair care",
      value: "hair",
    },
  ]);

  // const getCategory = async () => {
  //   const res = await axios.get("all-categories");
  //   if (res.data) {
  //     if (res.data.success) {
  //       setFilterList(res.data.data);
  //     }
  //   }
  // };

  useEffect(() => {
    setFilterList(category);
    setFilterItem(category[0]?.id);
  }, [category]);
  useEffect(() => {
    if (allProducts.length) {
      const newItems = allProducts.filter((pd) =>
        pd.category.find((v) => v.id == filterItem)
      );
      //console.log(newItems);
      setProducts(newItems);
    }
  }, [filterItem, allProducts]);

  return (
    <>
      {/* <!-- BEGIN TRENDING --> */}
      <section className="trending">
        <div className="trending-content">
          <SectionTitle
            //subTitle="Cosmetics"
            title="Trending products"
            body="Nourish your skin with toxin-free cosmetic products. With the offers that you can’t refuse."
          />
          <div className="tab-wrap trending-tabs">
            <ul className="nav-tab-list tabs">
              {filterList.map((item, key) => (
                <>
                  {item.parent_id == 0 ? (
                    <li
                      key={item.id}
                      onClick={() => setFilterItem(item.id)}
                      className={item.id === filterItem ? "active" : ""}
                    >
                      {item.name}
                    </li>
                  ) : null}
                </>
              ))}
            </ul>
            <div className="products-items">
              <ProductsCarousel products={products} />
            </div>
          </div>
        </div>
      </section>
      {/* <!-- TRENDING EOF   --> */}
    </>
  );
};
