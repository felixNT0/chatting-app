import http from "../../libs/http";

export const fetchUser = () => http.get(`/users`);

export const postCurrentUser = (data: any) => http.post(`/curerntUser`, data);
