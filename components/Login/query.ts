import axios from "axios";

export const postCurrentUser = async (data: any) => {
  try {
    return await axios.post("http://localhost:8000/curerntUser", data);
  } catch (error) {
    console.log(error);
  }
};

export const fetchUser = async () => {
  try {
    const response = await axios.get("http://localhost:8000/users");
    return response.data;
  } catch (err) {
    console.log(err);
  }
};
