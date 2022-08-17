import http from "../../libs/http";

export const resetPassword = (value: { id: string; data: any }) => {
  const { id, data } = value;
  return http.patch(`/users/${id}`, data);
};
