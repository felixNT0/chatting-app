import http from "../../libs/http";

export const fetchUserById = (id: string) => {
  return http.get(`/users/${id}`);
};
