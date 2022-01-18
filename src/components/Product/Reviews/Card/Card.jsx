export const Card = ({ review }) => {
  const { user, time, rating, comment } = review;
  return (
    <>
      {/* Being Product Review */}
      <div className="review-item">
        <div className="review-item__head">
          <div className="review-item__author">
            <img
              src="/assets/img/comment-author1.jpg"
              className="js-img"
              alt="author"
            />
            <span className="review-item__name">{user.name}</span>
            <span className="review-item__date">{time}</span>
          </div>
          <div className="review-item__rating">
            <ul className="star-rating">
              {[...Array(rating)].map((star, index) => {
                return (
                  <li key={index}>
                    <i className="icon-star"></i>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
        <div className="review-item__content">{comment}</div>
      </div>
    </>
  );
};
