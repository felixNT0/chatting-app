import axios from "axios";

export const fetchUserById = async (id: string) => {
  try {
    const response = await axios.get(`http://localhost:8000/users/${id}`);
    return response.data;
  } catch (err) {
    console.log(err);
  }
};
