import React, { createContext, useState } from "react";

export const ProviderContext = createContext();

export const ProviderContextProvider = ({ children }) => {
  const [useData, setUserData] = useState("");
  return (
    <ProviderContext.Provider value={{ useData, setUserData }}>
      {children}
    </ProviderContext.Provider>
  );
};
