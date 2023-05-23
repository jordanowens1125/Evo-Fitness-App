import { createContext } from "react";
import dummyData from "../Data/dummyData";

export const DataContext = createContext(dummyData.byDay);

export const DataProvider = ({ children }) => {
  const data = [dummyData.byDay];
  const { Provider } = DataContext;
  return <Provider value={data}>{children}</Provider>;
};
