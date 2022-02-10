import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getCategories, getReviews } from "../utils/api-utils";

// utils
import { sanitizeCategory } from "../utils/sanitizeCategory";
import { formatDate } from "../utils/formatDate";

export const Reviews = () => {
  const [loading, setLoading] = useState();
  const [categories, setCategories] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [categoryFilter, setCategoryFilter] = useState("");
  const [order, setOrder] = useState(null);
  const [sortBy, setSortBy] = useState(null);

  useEffect(() => {
    setReviews([]);
    setLoading(true);

    getCategories().then((data) => setCategories(data.categories));

    getReviews(order, sortBy)
      .then((data) => {
        if (categoryFilter === "") {
          setReviews(data.reviews);
        } else {
          const categoryFiltered = data.reviews.filter(
            (review) => review.category === categoryFilter
          );
          setReviews(categoryFiltered);
        }
      })
      .then(() => {
        setLoading(false);
      });
  }, [categoryFilter, order, sortBy]);

  const handleChange = (event) => {
    setCategoryFilter(event.target.value);
  };

  return (
    <main className="Reviews">
      <section className="filter">
        <br />
        <select id="category" onChange={handleChange}>
          <option selected disabled>
            Filter By...
          </option>
          <option value="">All Categories</option>
          {categories.map((category) => {
            return (
              <option key={category.slug} value={category.slug}>
                {sanitizeCategory(category.slug)}
              </option>
            );
          })}
        </select>
        <select
          id="order"
          onChange={(e) => {
            setOrder(e.target.value);
          }}
        >
          <option selected disabled>
            Order By...
          </option>
          <option value="desc" key="desc">
            Descending
          </option>
          <option value="asc" key="asc">
            Ascending
          </option>
        </select>

        <select
          id="sort_by"
          onChange={(e) => {
            setSortBy(e.target.value);
          }}
        >
          <option selected disabled>
            Sort By...
          </option>
          <option value="created_at" key="created_at">
            Creation Date
          </option>
          <option value="category" key="category">
            Category
          </option>
          <option value="title" key="title">
            Title
          </option>
          <option value="owner" key="owner">
            Author
          </option>
          <option value="designer" key="designer">
            Game Designer
          </option>
          <option value="votes" key="votes">
            Upvotes
          </option>
          <option value="comment_count" key="comment_count">
            Comments
          </option>
        </select>
      </section>

      <div className={`loading ${loading ? "" : " hidden"}`}>
        <h1>Loading </h1>

        <div className="lds-ellipsis">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>

      <ul>
        {reviews.map((review) => {
          return (
            <li className="box" key={review.review_id}>
              <Link to={`${review.review_id}`}>
                <img src={review.review_img_url} />
              </Link>
              <br />
              <Link to={`${review.review_id}`} className="reviewLink">
                {review.title}
              </Link>
              <hr />
              <h2>{review.owner}</h2>
              <h3>on {formatDate(review.created_at)}</h3>
              <h3>Category: {sanitizeCategory(review.category)}</h3>
              <h3>Game designer: {review.designer}</h3>
              <h3>Upvotes: {review.votes}</h3>
              <h3>Comments: {review.comment_count}</h3>
            </li>
          );
        })}
      </ul>
    </main>
  );
};
