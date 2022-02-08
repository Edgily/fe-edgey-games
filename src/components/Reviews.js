import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getCategories, getReviews } from "../utils/api-utils";

// utils
import { sanitizeCategory } from "../utils/sanitizeCategory";

export const Reviews = () => {
  const [loading, setLoading] = useState();
  const [categories, setCategories] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    setReviews([]);
    setLoading(true);

    getCategories().then((data) => setCategories(data.categories));

    getReviews()
      .then((data) => {
        if (filter === "" || filter === "All Categories") {
          return setReviews(data.reviews);
        } else {
          const filtered = data.reviews.filter(
            (review) => review.category === filter
          );
          return setReviews(filtered);
        }
      })
      .then(() => {
        return setLoading(false);
      });
  }, [filter]);

  const handleChange = (event) => {
    setFilter(event.target.value);
  };

  return (
    <main className="Reviews">
      <h2>All Reviews:</h2>

      <label htmlFor="catagory">Filter by category:</label>
      <select id="category" onChange={handleChange}>
        <option>All Categories</option>
        {categories.map((category) => {
          return (
            <option key={category.slug} value={category.slug}>
              {sanitizeCategory(category.slug)}
            </option>
          );
        })}
      </select>

      <div className={`loading ${loading ? "" : " hidden"}`}>
        <h1>Loading </h1>

        <div class="lds-ellipsis">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>

      <ul>
        {reviews.map((review) => {
          return (
            <li key={review.review_id}>
              <Link to={`${review.review_id}`}>
                <img src={review.review_img_url} alt="Review image" />
              </Link>
              <br />
              <Link to={`${review.review_id}`} className="reviewLink">
                {review.title}
              </Link>
              <h3>Category: {sanitizeCategory(review.category)}</h3>
              <h3>Review author: {review.owner}</h3>
              <h3>Upvotes: {review.votes}</h3>
              <h3>Comments: {review.comment_count}</h3>
            </li>
          );
        })}
      </ul>
    </main>
  );
};
