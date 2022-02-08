import axios from "axios";

const edgeyApi = axios.create({
  baseURL: "https://edgey-games.herokuapp.com/api",
});

export const getReviews = () => {
  return edgeyApi.get("/reviews").then((res) => res.data);
};

export const getCategories = () => {
  return edgeyApi.get("/categories").then((res) => res.data);
};
