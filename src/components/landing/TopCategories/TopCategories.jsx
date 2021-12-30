import { Categories } from "components/Category/Categories/Categories";
import { SectionTitle } from "components/shared/SectionTitle/SectionTitle";
import categoriesData from "data/category/category";
import { useContext } from "react";
import AppContext from "storeData/AppContext";

export const TopCategories = () => {
  //const categories = [...categoriesData].slice(0, 3);
  const {
    state: { category },
  } = useContext(AppContext);
  return (
    <>
      {/* <!-- BEGIN TOP CATEGORIES --> */}
      <section className="top-categories">
        <SectionTitle
          subTitle="Popular collections"
          title="top categories"
          body="Nourish your skin with toxin-free cosmetic products. With the offers that you can’t refuse."
        />
        <div className="top-categories__items">
          {<Categories categories={category} />}
        </div>
      </section>
      {/* <!-- TOP CATEGORIES EOF   --> */}
    </>
  );
};
