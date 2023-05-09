import axios from "axios";
const baseURL = process.env.REACT_APP_BASE_URL + "users";

export const getUser = async (id) =>
  await axios.get(`${baseURL}/${id}`).then((response) => {
    return response.data;
  });

export const createUser = async (newUser) =>
  await axios.post(`${baseURL}/create`, newUser).then((response) => {
    return response.data;
  });

export const updateUser = async (updateUser) =>
  await axios.put(`${baseURL}/update`, updateUser).then((response) => {
    return response.data;
  });

const userApi = {
  getUser: getUser,
  createUser: createUser,
};

export default userApi;
