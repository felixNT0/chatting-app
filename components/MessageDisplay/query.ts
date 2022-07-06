import axios from "axios";

export const fetchMessages = async () => {
  try {
    const response = await axios.get("http://localhost:8000/messages");
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
