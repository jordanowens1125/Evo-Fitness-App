import axios from "axios";
const baseURL = process.env.REACT_APP_BASE_URL + "exercises";

export const getExercises = async () => 
  await axios.get(baseURL).then((response) => {
    return response.data;
});

export const createExercise = async(newExercise) =>
  await axios.post(`${baseURL}/create`, newExercise).then((response) => {
    return response.data;
});

const exerciseApi = {
  getExercises: getExercises,
  createExercise: createExercise,
};

export default exerciseApi;
