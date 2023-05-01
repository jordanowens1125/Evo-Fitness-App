import { exerciseItems } from "./exerciseCategories";

const Pullups = exerciseItems["Pullups"];
const Pushups = exerciseItems["Pushups"];
const Jog = exerciseItems['Jog']

export const Neck = {
  name: "Neck",
  exercises: [],
  color: '',
  image: "Image of Neck",
};

export const Chest = {
  name: "Chest",
  exercises: [Pushups],
  color: '',
  image: "Image of chest",
};

export const Shoulders = {
  name: "Shoulders",
  exercises: [],
  color: '',
  image: "Image of shoulders",
};

export const Traps = {
  name: "Traps",
  exercises: [],
  color: "",
  image: "Image of Traps",
};

export const Biceps = {
  name: "Biceps",
  exercises: [],
  color: "",
  image: "Image of Biceps",
};

export const Forearms = {
  name: "Forearms",
  exercises: [],
  color: "",
  image: "Image of Forearms",
};

export const Lats = {
  name: "Lats",
  exercises: [Pullups],
  color: '',
  image: "Image of lats",
};

export const Triceps = {
  name: "Triceps",
  exercises: [],
  color: "",
  image: "Image of Triceps",
};

export const LowerBack = {
  name: "Lower Back",
  exercises: [],
  color: '',
  image: "Image of lower back",
};

export const Abs = {
  name: "Abs",
  exercises: [],
  color: "",
  image: "Image of Abs",
};

export const Quads = {
  name: "Quads",
  exercises: [],
  color: "",
  image: "Image of Quads",
};

export const Calves = {
  name: "Calves",
  exercises: [],
  color: "",
  image: "Image of Calves",
};

export const Glutes = {
  name: "Glutes",
  exercises: [],
  color: "",
  image: "Image of Glutes",
};

export const Hamstrings = {
  name: "Hamstrings",
  exercises: [],
  color: "",
  image: "Image of Hamstrings",
};

export const Heart = {
  name: "Cardio",
  exercises: [Jog],
  color: "",
  image: "Image of Heart",
};

export const muscleGroups = [
  Neck,
  Chest,
  Shoulders,
  Traps,
  Biceps,
  Forearms,
  Lats,
  Triceps,
  LowerBack,
  Abs,
  Calves, 
  Glutes,
  Hamstrings,
];
