import { fetcherWithToken } from "./fetcher";

export const API_URL = import.meta.env.VITE_API_URL;
export const DASHBOARD_ID = import.meta.env.VITE_APP_GRAFANA_DASHBOARD;
export const WIRELESS_DASHBOARD_ID = import.meta.env
  .VITE_APP_GRAFANA_WIRELESS_DASHBOARD;
export const KEYCLOAK_REALM = import.meta.env.VITE_REALM;
export const KEYCLOAK_CLIENT_ID = import.meta.env.VITE_CLIENT_ID;
export const TOKEN_EXPIRATION =
  Number(import.meta.env.VITE_APP_TOKEN_EXPIRATION) || 4 * 60;

// export const updateDevice = async (id, body) => {
//   const response = await fetch(`${API_URL}/devices/${id}`, {
//     method: "PUT",
//     headers: await fetcherWithToken(),
//     body: JSON.stringify(body),
//   });
//   return handleResponse(response);
// };
//
//
////!WSN PAGE------------------------------------------------------------
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
export const deleteDeviceImage = async (deviceId, filename, token) => {
  const url = `${API_URL}/devices/${deviceId}/images/delete-by-filename/${filename}`;

  const response = await fetch(url, {
    method: "DELETE", // Ensure DELETE method is used
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  // Check if response is successful
  if (!response.ok) {
    console.error("Error in deleteDeviceImage:", response.statusText);
    throw new Error(`Failed to delete image: ${response.statusText}`);
  }

  // If the response is successful but not JSON, just return success
  const contentType = response.headers.get("content-type");
  if (contentType && contentType.includes("application/json")) {
    return response.json(); // Parse JSON response if available
  } else {
    return { success: true }; // Return success for non-JSON responses
  }
};

//--------
//
//
////!DATA DOWNLOADS PAGE---------------------------------
//
//
//-----------------Fetching environmental data from the phenode device----------
export const fetchDeviceSensorData = async (
  deviceId,
  from,
  to,
  token,
  body = {}
) => {
  // URL-encode the dates
  const encodedFrom = encodeURIComponent(from);
  const encodedTo = encodeURIComponent(to);

  // Construct the URL with 'from' and 'to' in the path
  const url = `${API_URL}/devices/${deviceId}/sensor-data/${encodedFrom}/${encodedTo}`;

  const response = await fetch(url, {
    method: "POST", // Ensure this matches your backend API method
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(body), // Include additional data if needed
  });

  console.log("Response Status:", response.status);

  if (!response.ok) {
    let errorMessage = "Failed to fetch device sensor data";
    try {
      const errorData = await response.json();
      errorMessage = errorData.message || errorMessage;
      console.error("Error response from backend:", errorData);
    } catch (error) {
      console.error("Error parsing response:", error);
    }
    console.error("Error:", errorMessage);
    throw new Error(errorMessage);
  }

  return await response.json();
};

//-------
//
//
//---------------Fetching specific images in device database to download----------------------------------

// api.js
export const fetchDeviceImagesToDownload = async (id, from, to, token) => {
  const encodedFrom = encodeURIComponent(from);
  const encodedTo = encodeURIComponent(to);

  const response = await fetch(
    `${API_URL}/devices/${id}/images/download/${encodedFrom}/${encodedTo}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ downsample: false }),
    }
  );

  const contentType = response.headers.get("content-type");
  console.log("Content-Type:", contentType);

  // Check if response is successful
  if (!response.ok) {
    const errorText = await response.text();
    console.error("Error fetching images:", errorText);
    throw new Error(`Failed to fetch images: ${errorText}`);
  }

  if (contentType && contentType.includes("application/zip")) {
    // If the backend sends a zip file
    const blob = await response.blob();
    console.log("Blob size:", blob.size);

    // Proceed to save the blob as a ZIP file
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "phenode_images.zip";
    document.body.appendChild(a);
    a.click();
    a.remove();
    window.URL.revokeObjectURL(url);
  } else {
    // The response is not a ZIP file, likely an error message
    const errorText = await response.text();
    console.error("Error fetching images:", errorText);

    // Attempt to parse the error message from the response
    let errorMessage = "No images found in selected timeframe.";
    try {
      const errorJson = JSON.parse(errorText);
      if (errorJson && errorJson.error) {
        errorMessage = errorJson.error;
      }
    } catch (e) {
      // If response is not JSON, use the raw error text
      errorMessage = errorText;
    }

    throw new Error(errorMessage);
  }
};

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
//
//
//-----------------Fetching diagnostics data from the phenode device----------
export const fetchDeviceDiagnosticData = async (
  deviceId,
  from,
  to,
  token,
  body = {}
) => {
  // URL-encode the dates
  const encodedFrom = encodeURIComponent(from);
  const encodedTo = encodeURIComponent(to);

  // Construct the URL with 'from' and 'to' in the path
  const url = `${API_URL}/devices/${deviceId}/health-data/${encodedFrom}/${encodedTo}`;

  const response = await fetch(url, {
    method: "POST", // Ensure this matches your backend API method
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(body), // Include additional data if needed
  });

  console.log("Response Status:", response.status);

  if (!response.ok) {
    let errorMessage = "Failed to fetch device sensor data";
    try {
      const errorData = await response.json();
      errorMessage = errorData.message || errorMessage;
      console.error("Error response from backend:", errorData);
    } catch (error) {
      console.error("Error parsing response:", error);
    }
    console.error("Error:", errorMessage);
    throw new Error(errorMessage);
  }

  return await response.json();
};
//-----------------Fetching ALL Phenode device Data to download at certain date-------------------
//
//
//
//
//-----------------Fetching diagnostics data from the phenode device----------
export const fetchAllDeviceData = async (
  deviceId,
  from,
  to,
  token,
  body = {}
) => {
  // URL-encode the dates
  const encodedFrom = encodeURIComponent(from);
  const encodedTo = encodeURIComponent(to);

  // Construct the URL with 'from' and 'to' in the path
  const url = `${API_URL}/devices/${deviceId}/all-data/${encodedFrom}/${encodedTo}`;

  console.log("Constructed URL:", url);
  console.log("Token being sent:", token);

  const response = await fetch(url, {
    method: "POST", // Ensure this matches your backend API method
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(body), // Include additional data if needed
  });

  console.log("Response Status:", response.status);

  if (!response.ok) {
    let errorMessage = "Failed to fetch device data";
    try {
      const errorData = await response.text();
      errorMessage = errorData || errorMessage;
      console.error("Error response from backend:", errorData);
    } catch (error) {
      console.error("Error parsing response:", error);
    }
    console.error("Error:", errorMessage);
    throw new Error(errorMessage);
  }

  // Return the response as a blob since it's a ZIP file
  return await response.blob();
};
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
//-----------
//
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
//-----------
//
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
