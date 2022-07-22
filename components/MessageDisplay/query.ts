import axios from "axios";

export const fetchMessages = async (page: any) => {
  try {
    const response = await axios.get(`http://localhost:8000/messages`);
    return response.data;
  } catch (err) {
    console.log(err);
  }
};

export const fetchMessagesById = async (id: string) => {
  try {
    const response = await axios.get(`http://localhost:8000/messages/${id}`);
    return response.data;
  } catch (err) {
    console.log(err);
  }
};

export const deleteMessages = async (id: string) => {
  try {
    return await axios.delete(`http://localhost:8000/messages/${id}`);
  } catch (err) {
    console.log(err);
  }
};

export const editMessage = async (value: { id: string; data: any }) => {
  try {
    const { id, data } = value;
    return await axios.patch(`http://localhost:8000/messages/${id}`, data);
  } catch (err) {
    console.log(err);
  }
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
