import http from "../../libs/http";

export const addMessage = (data: any) => http.post(`/messages`, data);
