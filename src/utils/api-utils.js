import axios from "axios";

const edgeyApi = axios.create({
  baseURL: "https://edgey-games.herokuapp.com/api",
});

// reviews?sort_by=designer&order=desc&category=social%deduction
export const getReviews = (order, sort_by) => {
  let queries = {
    params: {
      order: "desc",
      sort_by: "created_at",
    },
  };

  if (order) {
    queries.params.order = order;
  }

  if (sort_by) {
    queries.params.sort_by = sort_by;
  }

  return edgeyApi.get(`/reviews`, queries).then((res) => res.data);
};

export const getCategories = () => {
  return edgeyApi.get("/categories").then((res) => res.data);
};

export const getReviewById = (review_id) => {
  return edgeyApi.get(`/reviews/${review_id}`).then((res) => res.data);
};

export const patchReviewVotes = (review_id, body) => {
  return edgeyApi.patch(`/reviews/${review_id}`, body).then((res) => res.data);
};

export const getCommentsById = (review_id) => {
  return edgeyApi.get(`/reviews/${review_id}/comments`).then((res) => res.data);
};

export const postCommentById = (review_id, body) => {
  return edgeyApi
    .post(`/reviews/${review_id}/comments`, body)
    .then((res) => res.data);
};

export const deleteComment = (comment_id) => {
  return edgeyApi.delete(`/comments/${comment_id}`).then((res) => res.data);
};

export const getUsers = () => {
  return edgeyApi.get("/users").then((res) => res.data);
};

export const postUser = (body) => {
  return edgeyApi.post("users", body).then((res) => res.body);
};
