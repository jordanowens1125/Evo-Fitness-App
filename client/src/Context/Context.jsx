import { createContext } from "react";
import dummyData from "../data/dummyData";

export const DataContext = createContext(dummyData.byDay);

export const DataProvider = ({ children }) => {
  const data = [dummyData.byDay];
  const { Provider } = DataContext;
  return <Provider value={data}>{children}</Provider>;
};
