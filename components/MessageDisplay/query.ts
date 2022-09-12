import axios from "axios";
import http from "../../libs/http";

export const searchMessages = async (message: string) => {
  try {
    const response = await axios.get(
      `http://localhost:8000/messages?q=${message}`
    );
    return response.data;
  } catch (err) {
    console.log(err);
  }
};

export const fetchMessages = () => http.get(`/messages`);

export const fetchMessagesById = (id: string) => http.get(`/messages/${id}`);

export const deleteMessages = (id: string) => {
  return http.delete(`/messages/${id}`);
};

export const editMessage = (value: { id: string; data: any }) => {
  const { id, data } = value;
  return http.patch(`/messages/${id}`, data);
};

export const likeMessage = async (data: any) => {
  try {
    return await axios.post("http://localhost:8000/likes", data);
  } catch (error) {
    console.log(error);
  }
};

export const fetchLikes = async () => {
  try {
    const response = await axios.get("http://localhost:8000/likes");
    return response.data;
  } catch (err) {
    console.log(err);
  }
};

export const fetchLikesById = async (id: string) => {
  try {
    const response = await axios.get(`http://localhost:8000/likes/${id}`);
    return response.data;
  } catch (err) {
    console.log(err);
  }
};

export const deleteLikes = async (id: string) => {
  try {
    return await axios.delete(`http://localhost:8000/likes/${id}`);
  } catch (err) {
    console.log(err);
  }
};
