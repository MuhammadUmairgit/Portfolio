import { apiServices } from "./Api.services";

const userServiceUrl = {
  login: "/login",
  register: "/register",
};

const login = (data) => {
  const response = apiServices.post(userServiceUrl.login, data);
  return response;
};
const register = (data) => {
  const response = apiServices.post(userServiceUrl.register, data);
  return response;
};

export const userServices = {
  login,
  register,
};
