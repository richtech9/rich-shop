import { Card } from "./Card/Card";

export const Categories = ({ categories, isParent = true }) => {
  return (
    <>
      {/* <!-- BEGIN  CATEGORIES --> */}
      {categories.map((category) => (
        <>
          {category.parent_id == 0 || !isParent ? (
            <Card category={category} />
          ) : null}
        </>
      ))}
      {/* <!--  CATEGORIES EOF   --> */}
    </>
  );
};
