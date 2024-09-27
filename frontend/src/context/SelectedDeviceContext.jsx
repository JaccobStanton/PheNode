//This context will manage the selected device state, which will be shared between the Navbar and PheNode components.
import React, { createContext, useContext, useState } from "react";

const SelectedDeviceContext = createContext();

export const useSelectedDevice = () => useContext(SelectedDeviceContext);

export const SelectedDeviceProvider = ({ children }) => {
  const [selectedDevice, setSelectedDevice] = useState(null); // Stores the selected device

  return (
    <SelectedDeviceContext.Provider
      value={{ selectedDevice, setSelectedDevice }}
    >
      {children}
    </SelectedDeviceContext.Provider>
  );
};
