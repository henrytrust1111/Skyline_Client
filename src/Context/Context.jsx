import React from "react";
import { createContext } from "react";

export const MyContext = createContext(null);
const Context = ({ children }) => {

  return (
    <MyContext.Provider value={{}}>
      {children}
    </MyContext.Provider>
  );
};

export default Context;
