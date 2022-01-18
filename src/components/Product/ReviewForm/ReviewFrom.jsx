import axios from "axios";
import { useRouter } from "next/router";
import { useContext, useState } from "react";
import { Rating } from "react-simple-star-rating";
import { toast } from "react-toastify";
import AppContext from "storeData/AppContext";

export const ReviewFrom = ({ pid, getReview }) => {
  const {
    state: { user },
  } = useContext(AppContext);
  const router = useRouter();

  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);

  // Catch Rating value
  const handleRating = (rate) => {
    setRating(rate);
    console.log(rate / 20);
  };

  const submitReview = async (e) => {
    e.preventDefault();
    if (user) {
      if (!rating) {
        return toast.warning("Select your rating!");
      }
      if (!comment) {
        return toast.warning("Enter your review!");
      }
      setLoading(true);
      const res = await axios.post("user/review/submit", {
        product_id: pid,
        rating: rating / 20,
        comment,
      });
      if (res.data.success) {
        toast.success(res.data.message);
        getReview();
      }

      setLoading(false);
    } else {
      toast.warning("Please Login Frist!");
      router.push({
        pathname: "/login",
        query: { pathname: router.asPath },
      });
    }
  };
  return (
    <>
      {/* <!-- Product Review Form --> */}
      <div className="product-detail__form post-comment__form">
        {/* <div className="subscribe-form__img">
          <img src="/assets/img/subscribe-img.png" />
        </div> */}
        <form onSubmit={submitReview}>
          <h4>leave a review</h4>
          <p>Your email address will not be published.</p>
          <div className="rating" data-id="rating_1">
            <Rating
              onClick={handleRating}
              ratingValue={rating}
              fillColor="#cfc819"
              size="20px"
              emptyColor="#fff"
            />
          </div>
          {/* <div className='box-field'>
            <input
              type='text'
              className='form-control'
              placeholder='Enter your name'
            />
          </div>
          <div className='box-field'>
            <input
              type='email'
              className='form-control'
              placeholder='Enter your email'
            />
          </div> */}
          <div className="box-field box-field__textarea">
            <textarea
              required
              className="form-control"
              placeholder="Enter your review"
              onChange={(e) => setComment(e.target.value)}
            ></textarea>
          </div>
          <button
            className="btn"
            type="submit"
            disabled={loading}
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {loading ? (
              <img src="/assets/img/icons/loading.gif" width={30} />
            ) : (
              "send"
            )}
          </button>
        </form>
      </div>
    </>
  );
};
