import axios from "axios";

export const fetchMessages = async () => {
  try {
    const response = await axios.get("http://localhost:8000/messages");
    return response.data;
  } catch (err) {
    console.log(err);
  }
};

export const deleteMessages = async (id: any) => {
  try {
    return await axios.delete(`http://localhost:8000/messages/${id}`);
  } catch (err) {
    console.log(err);
  }
};
