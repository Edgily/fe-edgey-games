import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import {
  getReviewById,
  getCommentsById,
  postCommentById,
  deleteComment,
  patchReviewVotes,
} from "../utils/api-utils";

import { sanitizeCategory } from "../utils/sanitizeCategory";

import { UserContext } from "../contexts/UserProvider";
import { formatDate } from "../utils/formatDate";

export const SingleReview = (props) => {
  const { user } = useContext(UserContext);

  const { review_id } = useParams();

  const [routeOkay, setRouteOkay] = useState(true);

  const [loading, setLoading] = useState();

  const [review, setReview] = useState();
  const [reviewVotes, setReviewVotes] = useState();
  const [clicked, setClicked] = useState(false);

  const [comments, setComments] = useState([]);
  const [commentState, setCommentState] = useState("");

  useEffect(() => {
    setLoading(true);

    getReviewById(review_id)
      .then((data) => {
        setReview(data.review);
        setReviewVotes(data.review.votes);
      })
      .catch((err) => {
        if (err) {
          setRouteOkay(false);
        }
      });

    getCommentsById(review_id)
      .then((data) => {
        if (data.comments) {
          setComments(data.comments);
        } else {
          setComments([]);
        }
      })
      .then(() => setLoading(false));
  }, [review_id]);

  const handleChange = (event) => {
    setCommentState(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    postCommentById(review_id, { username: user.username, body: commentState })
      .then((res) => {
        setComments((currComments) => {
          const newComments = [...currComments, res.comment];
          return newComments;
        });
      })
      .then(() => setCommentState(""));
  };

  const handleDelete = (event, comment_id, author) => {
    event.preventDefault();

    if (user.username === author) {
      deleteComment(comment_id).then((data) => {
        getCommentsById(review_id).then((data) => {
          if (data.comments) {
            setComments(data.comments);
          } else {
            setComments([]);
          }
        });
      });
    } else {
      console.log("Cheeki breeki!!!");
    }
  };

  const handleReviewUpvote = (review_id) => {
    let body = {};

    if (clicked) {
      body = { inc_votes: -1 };
      setClicked(false);
      setReviewVotes((currVotes) => currVotes - 1);
    } else {
      body = { inc_votes: 1 };
      setClicked(true);
      setReviewVotes((currVotes) => currVotes + 1);
    }

    patchReviewVotes(review_id, body);
  };

  // conditional display of page elements
  const displayReview = () => {
    if (!review) {
      return <h1>Something went wrong...</h1>;
    } else {
      return (
        <article className="box">
          <img src={review.review_img_url} alt={review.title + " image"} />
          <h1>{review.title}</h1>
          <hr />
          <h3>Category: {sanitizeCategory(review.category)}</h3>
          <h3>Game designer: {review.designer}</h3>
          <h3>Review author: {review.owner}</h3>
          <hr />
          <p>{review.review_body}</p>
          <hr />
          <h3>Created: {formatDate(review.created_at)}</h3>
          <h3>
            Upvotes: {reviewVotes}&nbsp;
            <button
              className={user.username ? "reviewUpvote" : "reviewUpvote hidden"}
              onClick={(event) => handleReviewUpvote(review.review_id)}
            >
              {!clicked ? "👍" : "👎"}
            </button>
          </h3>

          <h3>Comments: {review.comment_count}</h3>
        </article>
      );
    }
  };

  const displayAddComment = () => {
    return (
      <section
        className={user.username ? "submitComment" : "submitComment hidden"}
      >
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="*Your comment here*"
            maxLength={150}
            value={commentState}
            required
            onChange={handleChange}
          />
          <button>Add Comment</button>
        </form>
      </section>
    );
  };

  const displayComments = () => {
    if (!comments) {
      return <h1>Something went wrong...</h1>;
    } else {
      return (
        <section className="comments">
          <ul>
            {comments.map((comment) => {
              const isAuthor = user.username === comment.author;

              return (
                <li className="box" key={comment.comment_id}>
                  <h2>
                    {comment.author} <br />
                    <p>
                      commented on
                      <br />
                      {formatDate(comment.created_at)}
                    </p>
                  </h2>
                  <hr />
                  <p>{comment.body}</p>
                  <hr />

                  <form
                    className={isAuthor ? "" : "hidden"}
                    onSubmit={(event) =>
                      handleDelete(event, comment.comment_id, comment.author)
                    }
                  >
                    <button>Delete</button>
                  </form>
                </li>
              );
            })}
          </ul>
        </section>
      );
    }
  };

  return (
    <main className="SingleReview">
      <div className={routeOkay ? "hidden" : ""}>
        <h1>404: Not Found</h1>
      </div>
      <div className={`loading ${loading && routeOkay ? "" : " hidden"}`}>
        <h1>Loading </h1>

        <div className="lds-ellipsis">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>

      <div className={loading ? " hidden" : ""}>
        {displayReview()}

        {displayAddComment()}

        {displayComments()}
      </div>
    </main>
  );
};
