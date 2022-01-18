import axios from "axios";
import { useEffect, useState } from "react";
import { Card } from "./Card/Card";

export const Reviews = ({ pid, allReviews, loading }) => {
  return (
    <>
      {/* <!-- BEING REVIEWS    --> */}
      <div className="product-detail__items">
        {allReviews.map((review, index) => (
          <Card key={index} review={review} />
        ))}
        {/* <a href="#" className="blog-item__link">
          show more <i className="icon-arrow-md"></i>
        </a> */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            paddingTop: "30px",
          }}
        >
          {loading ? (
            <img src="/assets/img/icons/loading.gif" width={80} />
          ) : !allReviews.length ? (
            <h4>No Review available!</h4>
          ) : null}
        </div>
      </div>
      {/* <!-- Reviews EOF   --> */}
    </>
  );
};
