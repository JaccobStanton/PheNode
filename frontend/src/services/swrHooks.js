// This file leverages the SWR (Stale-While-Revalidate) library, which is a popular React hook library for
// data fetching. It provides built-in support for caching, revalidation, refetching, and more.
// This is useful for creating performant and efficient data fetching logic in React applications
import useSWR from "swr";
import { API_URL } from "./api";
import { fetcherWithToken } from "./fetcher";

// useSWR is used to fetch data from an API endpoint. It provides data, error, and other states like mutate for managing the fetched data.
// Each custom hook (useDevices, useMyDevices, useDevice, etc.) calls useSWR, passing the endpoint URL and fetcherWithToken as arguments. It:
// Takes in parameters like userToken, deviceId, etc.
// Calls the backend API with the appropriate URL and the token for authorization.
// Uses SWR’s built-in caching and revalidation features. For instance, refreshInterval is set in the hooks, which means the data is re-fetched at the specified intervals (e.g., 30,000 ms or 60,000 ms).
// Returns an Object: Each hook returns an object containing data, loading states, and errors, making it easier to handle these states in components.
/**
 * Fetch all devices from DB via API.
 * Data is revalidated every 30 seconds.
 *
 * @param userToken
 * @returns object
 */
export function useDevices(userToken) {
  const { data, error, mutate } = useSWR(
    [`${API_URL}/devices`, userToken],
    fetcherWithToken,
    { refreshInterval: 30000 }
  );

  return {
    devicesData: data,
    devicesLoading: !error && !data,
    devicesError: error,
    mutate: mutate,
  };
}

/**
 * Fetch all user's devices from DB via API.
 * Data is revalidated every 30 seconds.
 *
 * @param userToken
 * @returns object
 */
export function useMyDevices(userToken) {
  const { data, error, mutate } = useSWR(
    `${API_URL}/devices`,
    () => fetcherWithToken(`${API_URL}/devices`, "GET", null, userToken), // Pass userToken to fetcherWithToken
    { refreshInterval: 30000 }
  );

  return {
    devicesData: data,
    devicesLoading: !error && !data,
    devicesError: error,
    mutate: mutate,
  };
}

/**
 * Fetch a specific device from DB via API.
 * Data is revalidated every 30 seconds.
 *
 * @param userToken
 * @param deviceId
 * @returns object
 */
export function useDevice(userToken, deviceId) {
  const { data, error } = useSWR(
    [`${API_URL}/devices/${deviceId}`, userToken],
    fetcherWithToken,
    { refreshInterval: 30000 }
  );

  return {
    deviceData: data,
    deviceLoading: !error && !data,
    deviceError: error,
  };
}

/**
 * Fetch the specified device images from DB via API.
 * Data is revalidated every 60 seconds.
 *
 * @param userToken
 * @param deviceId
 * @returns object
 */
export function useDeviceImages(userToken, deviceId) {
  const { data, error } = useSWR(
    [`${API_URL}/devices/${deviceId}/images`, userToken],
    fetcherWithToken,
    { refreshInterval: 60000 }
  );

  return {
    images: data,
    imagesLoading: !error && !data,
    imagesError: error,
  };
}

/**
 * Fetch all user's sensors from DB via API.
 * Data is revalidated every 30 seconds.
 *
 * @param userToken
 * @returns object
 */
export function useMySensors(userToken) {
  const { data, error, mutate } = useSWR(
    [`${API_URL}/wireless-sensors/my-sensors`, userToken],
    fetcherWithToken,
    { refreshInterval: 30000 }
  );

  return {
    sensorsData: data,
    sensorsLoading: !error && !data,
    sensorsError: error,
    mutate: mutate,
  };
}

/**
 * Fetch a specific wireless sensor from DB via API.
 * Data is revalidated every 30 seconds.
 *
 * @param userToken
 * @param sensorId
 * @returns object
 */
export function useWirelessSensor(userToken, sensorId) {
  const { data, error, mutate } = useSWR(
    [`${API_URL}/wireless-sensors/${sensorId}`, userToken],
    fetcherWithToken,
    { refreshInterval: 30000 }
  );

  return {
    sensorData: data,
    sensorLoading: !error && !data,
    sensorError: error,
    mutate: mutate,
  };
}
