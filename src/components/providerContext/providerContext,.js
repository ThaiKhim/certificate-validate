import React, { createContext, useState } from "react";

export const ProviderContext = createContext();

export const ProviderContextProvider = ({ children }) => {
  const [provider, setProvider] = useState("");
    console.log(provider);
  return (
    <ProviderContext.Provider value={{ provider, setProvider }}>
      {children}
    </ProviderContext.Provider>
  );
};
