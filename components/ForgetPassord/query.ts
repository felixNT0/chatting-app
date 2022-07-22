import axios from "axios";

export const resetPassword = async (value: { id: string; data: any }) => {
  try {
    const { id, data } = value;
    return await axios.patch(`http://localhost:8000/users/${id}`, data);
  } catch (err) {
    console.log(err);
  }
};
