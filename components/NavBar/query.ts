import http from "../../libs/http";

export const fetchCurrentUser = () => {
  return http.get("/curerntUser");
};

export const deleteCurrentUser = (id: string) => {
  return http.delete(`/curerntUser/${id}`);
};
