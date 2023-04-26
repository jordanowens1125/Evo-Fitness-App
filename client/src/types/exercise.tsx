import { detail } from "./detail";

interface muscleGroupType {
  name: string;
  image: string;
  exercises?: [];
  color?: string;
  segment?: string;
}

interface sets {
  Repetition?: [Number];
  Weight?: [Number];
  Distance?: [Number];
  Time?: [Number];
}

interface exerciseType {
  name: string;
  kind: string;
  segment: string;
  muscleGroup: muscleGroupType;
  details: [detail];
  defaultSets: sets;
  sets?: sets;
}

export type {exerciseType, muscleGroupType};
