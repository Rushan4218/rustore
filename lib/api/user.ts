import axios from "../axios";

export const fetchUsers = async () => {
  const { data } = await axios.get("/users");
  return data.users;
};
