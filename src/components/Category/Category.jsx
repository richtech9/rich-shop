import categoryData from "data/category/category";
import { useContext } from "react";
import AppContext from "storeData/AppContext";
import { Categories } from "./Categories/Categories";

export const Category = () => {
  const {
    state: { category },
  } = useContext(AppContext);
  return (
    <>
      {/* <!-- BEGIN TOP CATEGORIES --> */}
      <section className="all-categories">
        <div className="top-categories__items">
          <Categories categories={category} isParent={false} />
        </div>
      </section>
      {/* <!-- TOP CATEGORIES EOF --> */}
    </>
  );
};
