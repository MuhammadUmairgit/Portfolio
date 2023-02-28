import { apiServices } from "./Api.services";

const postServiceUrl = {
  GET: "/posts",
};

const getPost = (data) => {
  const response = apiServices.get(postServiceUrl.GET, data);
  return response;
};
const deletePostById = (postId) => {
  const response = apiServices.delete(`${postServiceUrl.GET}/${postId}`);
  return response;
};

const addPost = (payload) => {
  const response = apiServices.post(postServiceUrl.GET, payload);
  return response;
};

const updataPostById = (categoryId, payload) => {
  const response = apiServices.put(
    `${postServiceUrl.GET}/${categoryId}`,
    payload
  );
  return response;
};

export const postsService = {
  getPost,
  deletePostById,
  addPost,
  updataPostById,
};
