import React, { useState, createContext, useContext, useEffect } from "react";
import {
  useMyDevices,
  useMySensors,
  useWirelessSensor,
} from "../services/swrHooks";
import { useKeycloak } from "@react-keycloak/web"; // Import Keycloak
import { mapSensors } from "../utils/mapSensors"; // Import the updated mapSensors function

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
  const { keycloak } = useKeycloak(); // Access Keycloak
  const [deviceList, setDeviceList] = useState([]);
  const [selectedDevice, setSelectedDevice] = useState(null);
  const [wirelessSensorList, setWirelessSensorList] = useState([]);
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
  const { devicesData, devicesLoading, devicesError } = useMyDevices();

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

  /* WIRELESS SENSOR SELECTION START */
  // Use SWR to fetch sensors
  const { sensorsData, sensorsLoading, sensorsError } = useMySensors();

  // Map sensors and update sensor list
  useEffect(() => {
    if (sensorsData && Array.isArray(sensorsData.sensors)) {
      const mappedSensors = mapSensors(sensorsData.sensors);

      setWirelessSensorList(mappedSensors);
      sessionStorage.setItem(
        "wirelessSensorList",
        JSON.stringify(mappedSensors)
      );

      // Automatically select the first sensor if none is selected
      if (!selectedWirelessSensor && mappedSensors.length > 0) {
        setSelectedWirelessSensor(mappedSensors[0]);
      }
    } else {
      setWirelessSensorList([]);
      sessionStorage.setItem("wirelessSensorList", JSON.stringify([]));
    }
  }, [sensorsData]);

  // Load selectedWirelessSensor from sessionStorage
  useEffect(() => {
    const storedSelectedWirelessSensor = sessionStorage.getItem(
      "selectedWirelessSensor"
    );
    if (storedSelectedWirelessSensor) {
      try {
        const parsedSensor = JSON.parse(storedSelectedWirelessSensor);

        // No need to manually assign id here since mapSensors already did it
        setSelectedWirelessSensor(parsedSensor);
      } catch (e) {
        console.log(
          "Error parsing selected wireless sensor from sessionStorage",
          e
        );
      }
    }
  }, []);

  // Save selectedWirelessSensor to sessionStorage whenever it changes
  useEffect(() => {
    if (selectedWirelessSensor) {
      sessionStorage.setItem(
        "selectedWirelessSensor",
        JSON.stringify(selectedWirelessSensor)
      );
    }
  }, [selectedWirelessSensor]);

  // Use SWR to fetch detailed data for the selected sensor
  const { sensorData, sensorLoading, sensorError } = useWirelessSensor(
    selectedWirelessSensor?.externalSensorId
  );

  return (
    <AppContext.Provider
      value={{
        devices: deviceList || [],
        devicesLoading,
        devicesError,
        selectedDevice,
        setSelectedDevice,
        wirelessSensorList,
        sensorsLoading,
        sensorsError,
        sensorData, // Provide detailed sensor data to the context
        sensorLoading,
        sensorError,
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
