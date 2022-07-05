import axios from "axios";

export const deleteCurrentUser = async (id: any) => {
  try {
    return await axios.delete(`http://localhost:8000/curerntUser/${id}`);
  } catch (error) {
    console.log(error);
  }
};

export const fetchCurrentUser = async () => {
  try {
    const response = await axios.get("http://localhost:8000/curerntUser");
    return response.data;
  } catch (err) {
    console.log(err);
  }
};
