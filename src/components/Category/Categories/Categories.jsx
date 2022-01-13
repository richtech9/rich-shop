import { Card } from "./Card/Card";

export const Categories = ({ categories, isParent = true }) => {
  return (
    <>
      {/* <!-- BEGIN  CATEGORIES --> */}
      {categories.map((category) => (
        <div key={category.id}>
          {category.parent_id == 0 || !isParent ? (
            <Card category={category} />
          ) : null}
        </div>
      ))}
      {/* <!--  CATEGORIES EOF   --> */}
    </>
  );
};
