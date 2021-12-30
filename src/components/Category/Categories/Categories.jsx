import { Card } from "./Card/Card";

export const Categories = ({ categories, isParent = true }) => {
  return (
    <>
      {/* <!-- BEGIN  CATEGORIES --> */}
      {categories.map((category) => (
        <>
          {category.parent_id == 0 || !isParent ? (
            <Card key={category.id} category={category} />
          ) : null}
        </>
      ))}
      {/* <!--  CATEGORIES EOF   --> */}
    </>
  );
};
