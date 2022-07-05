import axios from "axios";

export const addMessage = async (data: any) => {
  try {
    return await axios.post("http://localhost:8000/messages", data);
  } catch (error) {
    console.log(error);
  }
};
