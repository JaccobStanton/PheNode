import React, { useState, createContext, useContext, useEffect } from "react";
import { useMyDevices } from "../services/swrHooks";
import { useKeycloak } from "@react-keycloak/web"; // Import Keycloak

const AppContext = createContext(null);

const dataDownloadPref = {
  zeroValues: {},
  blankCells: {},
  errorValues: {},
  hyphens: {},
  decimalPlaces: {},
  dateAndTimeFormat: {},
};

export const AppContextProvider = ({ children }) => {
  const { keycloak } = useKeycloak(); // Access Keycloak for token
  const [deviceList, setDeviceList] = useState([]);
  const [selectedDevice, setSelectedDevice] = useState(null);
  const [wirelessSensorList, setWirelessSensorList] = useState(null);
  const [selectedWirelessSensor, setSelectedWirelessSensor] = useState(null);
  const [dataDownloadPreferences, setDataDownloadPreferences] =
    useState(dataDownloadPref);

  // Load selectedDevice from sessionStorage on component mount
  useEffect(() => {
    const storedSelectedDevice = sessionStorage.getItem("selectedDevice");
    if (storedSelectedDevice) {
      try {
        setSelectedDevice(JSON.parse(storedSelectedDevice));
      } catch (e) {
        console.log("Error parsing selected device from sessionStorage", e);
      }
    }
  }, []); // Only run this effect on mount

  // Use SWR to fetch devices and store them in the context
  const { devicesData, devicesLoading, devicesError } = useMyDevices(
    keycloak.token
  );

  // Update device list and save it to sessionStorage
  useEffect(() => {
    if (devicesData && Array.isArray(devicesData.devices)) {
      setDeviceList(devicesData.devices);
      sessionStorage.setItem("deviceList", JSON.stringify(devicesData.devices));
    } else {
      setDeviceList([]);
      sessionStorage.setItem("deviceList", JSON.stringify([]));
    }
  }, [devicesData]);

  // Load deviceList from sessionStorage when the app starts
  useEffect(() => {
    const storedDevicesList = sessionStorage.getItem("deviceList");
    if (storedDevicesList) {
      try {
        setDeviceList(JSON.parse(storedDevicesList));
      } catch (e) {
        console.log("Error parsing device list from sessionStorage", e);
      }
    } else {
      console.log("Setting empty device list");
    }
  }, []);

  // Save selectedDevice to sessionStorage whenever it changes
  useEffect(() => {
    if (selectedDevice) {
      sessionStorage.setItem("selectedDevice", JSON.stringify(selectedDevice));
    }
  }, [selectedDevice]);

  /* Wireless sensor section */
  // Load wirelessSensorList from sessionStorage
  useEffect(() => {
    const storedWirelessSensorList =
      sessionStorage.getItem("wirelessSensorList");
    if (storedWirelessSensorList) {
      try {
        setWirelessSensorList(JSON.parse(storedWirelessSensorList));
      } catch (e) {
        console.log(
          "Error parsing wireless sensor list from sessionStorage",
          e
        );
      }
    } else {
      console.log("Setting empty wireless sensor list");
    }
  }, []);

  // Save wirelessSensorList to sessionStorage
  useEffect(() => {
    if (wirelessSensorList) {
      sessionStorage.setItem(
        "wirelessSensorList",
        JSON.stringify(wirelessSensorList)
      );
    }
  }, [wirelessSensorList]);

  // Load selectedWirelessSensor from sessionStorage
  useEffect(() => {
    const storedSelectedWirelessSensor = sessionStorage.getItem(
      "selectedWirelessSensor"
    );
    if (storedSelectedWirelessSensor) {
      try {
        setSelectedWirelessSensor(JSON.parse(storedSelectedWirelessSensor));
      } catch (e) {
        console.log(
          "Error parsing selected wireless sensor from sessionStorage",
          e
        );
      }
    }
  }, []);

  // Save selectedWirelessSensor to sessionStorage
  useEffect(() => {
    if (selectedWirelessSensor) {
      sessionStorage.setItem(
        "selectedWirelessSensor",
        JSON.stringify(selectedWirelessSensor)
      );
    }
  }, [selectedWirelessSensor]);

  return (
    <AppContext.Provider
      value={{
        devices: deviceList || [], // Pass deviceList to the context
        devicesLoading,
        devicesError,
        selectedDevice, // Provide selectedDevice to the context
        setSelectedDevice, // Provide setSelectedDevice to the context
        wirelessSensorList,
        setWirelessSensorList,
        selectedWirelessSensor,
        setSelectedWirelessSensor,
        dataDownloadPreferences,
        setDataDownloadPreferences,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);

export default AppContext;
