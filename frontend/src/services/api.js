import { fetcherWithToken } from "./fetcher";

export const API_URL = import.meta.env.VITE_API_URL;

// API functions
export const updateDevice = async (id, body) => {
  const response = await fetch(`${API_URL}/devices/${id}`, {
    method: "PUT",
    headers: await fetcherWithToken(),
    body: JSON.stringify(body),
  });
  return handleResponse(response);
};

export const fetchDeviceSensorData = async (id, from, to, body) => {
  const response = await fetch(
    `${API_URL}/devices/${id}/sensor-data/${from}/${to}`,
    {
      method: "POST",
      headers: await fetcherWithToken(),
      body: JSON.stringify(body),
    }
  );
  return handleResponse(response);
};

export const fetchDeviceHealthData = async (id, from, to, body) => {
  const response = await fetch(
    `${API_URL}/devices/${id}/health-data/${from}/${to}`,
    {
      method: "POST",
      headers: await fetcherWithToken(),
      body: JSON.stringify(body),
    }
  );
  return handleResponse(response);
};

export const fetchWirelessSensorData = async (sensorList, from, to, body) => {
  const response = await fetch(
    `${API_URL}/wireless-sensors/sensor-data/${sensorList}/${from}/${to}`,
    {
      method: "POST",
      headers: await fetcherWithToken(),
      body: JSON.stringify(body),
    }
  );
  return handleResponse(response);
};

export const fetchAllDeviceData = async (id, from, to, body) => {
  const response = await fetch(
    `${API_URL}/devices/${id}/all-data/${from}/${to}`,
    {
      method: "POST",
      headers: await fetcherWithToken(),
      body: JSON.stringify(body),
    }
  );
  return handleResponse(response);
};

export const fetchAllImages = async (id, from, to, body) => {
  const response = await fetch(
    `${API_URL}/devices/${id}/images/download/${from}/${to}`,
    {
      method: "POST",
      headers: await fetcherWithToken(),
      body: JSON.stringify(body),
    }
  );
  return handleResponse(response);
};

export const fetchUserPreferences = async () => {
  const response = await fetch(`${API_URL}/user-preferences`, {
    method: "GET",
    headers: await fetcherWithToken(),
  });
  return handleResponse(response);
};

export const updateUserPreferences = async (body) => {
  const response = await fetch(`${API_URL}/user-preferences`, {
    method: "PUT",
    headers: await fetcherWithToken(),
    body: JSON.stringify(body),
  });
  return handleResponse(response);
};

export const setDeviceWifiCredentials = async (id, body) => {
  const response = await fetch(
    `${API_URL}/devices/${id}/environment-variables`,
    {
      method: "POST",
      headers: await fetcherWithToken(),
      body: JSON.stringify(body),
    }
  );
  return handleResponse(response);
};

export const setDeviceImageCaptureInterval = async (id, body) => {
  const response = await fetch(
    `${API_URL}/devices/${id}/environment-variables`,
    {
      method: "POST",
      headers: await fetcherWithToken(),
      body: JSON.stringify(body),
    }
  );
  return handleResponse(response);
};

export const setDeviceImageCaptureTime = async (id, body) => {
  const response = await fetch(
    `${API_URL}/devices/${id}/environment-variables`,
    {
      method: "POST",
      headers: await fetcherWithToken(),
      body: JSON.stringify(body),
    }
  );
  return handleResponse(response);
};

export const resetDevice = async (id, body) => {
  const response = await fetch(
    `${API_URL}/devices/${id}/environment-variables`,
    {
      method: "POST",
      headers: await fetcherWithToken(),
      body: JSON.stringify(body),
    }
  );
  return handleResponse(response);
};

export const updateSensor = async (id, body) => {
  console.log("Updating sensor with body: ", body);
  console.log("Sensor id: ", id);
  const response = await fetch(`${API_URL}/wireless-sensors/${id}`, {
    method: "PUT",
    headers: await fetcherWithToken(),
    body: JSON.stringify(body),
  });
  return handleResponse(response);
};
