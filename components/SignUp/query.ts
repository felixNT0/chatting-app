import http from "../../libs/http";

export const postData = () => http.get(`/users`);

export const postCurrentUser = () => {
  return http.post("/curerntUser");
};

export const fetchUser = () => {
  return http.get(`/users`);
};
