import { fetcherWithToken } from "./fetcher";

export const API_URL = import.meta.env.VITE_API_URL;
export const DASHBOARD_ID = import.meta.env.VITE_APP_GRAFANA_DASHBOARD;
export const WIRELESS_DASHBOARD_ID = import.meta.env
  .VITE_APP_GRAFANA_WIRELESS_DASHBOARD;
export const KEYCLOAK_REALM = import.meta.env.VITE_REALM;
export const KEYCLOAK_CLIENT_ID = import.meta.env.VITE_CLIENT_ID;
export const TOKEN_EXPIRATION =
  Number(import.meta.env.VITE_APP_TOKEN_EXPIRATION) || 4 * 60;

export const updateDevice = async (id, body) => {
  const response = await fetch(`${API_URL}/devices/${id}`, {
    method: "PUT",
    headers: await fetcherWithToken(),
    body: JSON.stringify(body),
  });
  return handleResponse(response);
};
//
//
//
//
////!IMAGING PAGE------------------------------------------------------------
//
//
//
//-----------------Fetching all images in device database----------------------------------
export const fetchAllDeviceImages = async (id, body) => {
  const response = await fetch(`${API_URL}/devices/${id}/images/`, {
    method: "PUT",
    headers: await fetcherWithToken(),
    body: JSON.stringify(body),
  });

  // Check if response is JSON, otherwise handle the error
  if (!response.ok) {
    console.error("Error fetching images:", response.statusText);
    throw new Error(`Failed to fetch images: ${response.statusText}`);
  }

  const contentType = response.headers.get("content-type");
  if (contentType && contentType.includes("application/json")) {
    return response.json(); // Parse JSON response
  } else {
    console.error(
      "Expected JSON response, but received HTML or another format"
    );
    throw new Error("Invalid response format");
  }
};
//---------
//
//
//
//--------------------Function to Delete Images from database----------------
export const deleteDeviceImage = async (deviceId, imageId, token) => {
  try {
    const response = await fetch(
      `${API_URL}/devices/${deviceId}/images/${imageId}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to delete image: ${response.statusText}`);
    }

    return true; // Return success status
  } catch (error) {
    console.error("Error deleting image:", error);
    throw error; // Rethrow the error so it can be caught in the component
  }
};
//--------
//
//
////!DATA DOWNLOADS PAGE---------------------------------
//
//
//
//-----------------Fetching environmental data from the phenode device----------
export const fetchDeviceSensorData = async (
  deviceId,
  token,
  from,
  to,
  body = {}
) => {
  const url = `${API_URL}/devices/${deviceId}/sensor-data`; // Remove dates from URL
  console.log("Constructed URL:", url); // For debugging

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ ...body, from, to }), // Include dates in the body
  });

  if (!response.ok) {
    let errorMessage = "Failed to fetch device sensor data";
    try {
      const errorData = await response.json();
      errorMessage = errorData.message || errorMessage;
    } catch (error) {
      // If response is not JSON, keep default error message
    }
    console.error("Error:", errorMessage);
    throw new Error(errorMessage);
  }

  return await response.json();
};
//-------
//
//
//-----------------Fetching Diagnostic Logs for Phenode Device-------------------
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
//--------
//
//
//-----------------Fetching WirelessSensor Data to download at certain data-------------------
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
//---------
//
//
//-----------------Fetching Phenode device Data to download at certain date-------------------
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
//----------------
//
//
//
//-------------function used to see how many wireless sensors are associated with a phenode device
export const fetchConnectedSensors = async (deviceId) => {
  const response = await fetch(
    `${API_URL}/devices/check-wireless-sensors/${deviceId}`,
    {
      method: "GET",
      headers: await fetcherWithToken(), // Fetch headers including the token
    }
  );

  // Check if the response was successful
  if (!response.ok) {
    console.error("Error fetching connected sensors:", response.statusText);
    throw new Error(
      `Failed to fetch connected sensors: ${response.statusText}`
    );
  }

  // Verify that the response is in JSON format
  const contentType = response.headers.get("content-type");
  if (contentType && contentType.includes("application/json")) {
    const data = await response.json();
    return data[deviceId] || []; // Return sensor array for the specific device
  } else {
    console.error("Expected JSON response, but received another format");
    throw new Error("Invalid response format");
  }
};
//------
//
//
////!SETTINGS PAGE-------------------------------------------------------
//
//
// -----------------------Getting users settings-------------------------
export const fetchUserPreferences = async () => {
  const response = await fetch(`${API_URL}/user-preferences`, {
    method: "GET",
    headers: await fetcherWithToken(),
  });
  return handleResponse(response);
};
//
//
//---------------------Updating their Settings---------------------------
export const updateUserPreferences = async (body) => {
  const response = await fetch(`${API_URL}/user-preferences`, {
    method: "PUT",
    headers: await fetcherWithToken(),
    body: JSON.stringify(body),
  });
  return handleResponse(response);
};
//
//
//--------------------Changing Phenode Device name-----------------------
export const updateDeviceLabel = async (deviceId, newLabel, token) => {
  const response = await fetch(`${API_URL}/devices/${deviceId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ label: newLabel }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to update device label");
  }

  return await response.json();
};
//
//
//-----------
//
//
//
//--------------------Setting Image Capture Interval-------------------
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
//----------
//
//
//
//---------------Setting Image Capture Time Interval-------------------
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
//-----------
//
//
//
//-----------------Function to set WiFi credentials on the device---------------
export const setDeviceWifiCredentials = async (deviceId, wifiBody) => {
  const accessToken = await getAccessToken();
  const url = `${API_URL}/devices/${deviceId}/environment-variables`;

  console.log(`Sending Wi-Fi credentials to: ${url}`);
  console.log("Request body:", JSON.stringify(wifiBody));

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(wifiBody),
  });

  const responseBody = await response.text();

  if (!response.ok) {
    throw new Error(
      `Failed to set device Wi-Fi credentials: ${response.statusText}`
    );
  }

  try {
    return JSON.parse(responseBody);
  } catch (error) {
    throw new Error("Invalid JSON response format received.");
  }
};
//----------
//
//
//-----------------Function to reset the phenode device---------------
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
//----------
//
//
//
export const updateSensor = async (id, userToken, body) => {
  const response = await fetch(`${API_URL}/wireless-sensors/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${userToken}`,
    },
    body: JSON.stringify(body),
  });

  // Check if the response is OK
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to update sensor");
  }

  return response.json();
};
