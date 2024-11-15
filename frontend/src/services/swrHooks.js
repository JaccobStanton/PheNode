// This file leverages the SWR (Stale-While-Revalidate) library, which is a popular React hook library for
// data fetching. It provides built-in support for caching, revalidation, refetching, and more.
// This is useful for creating performant and efficient data fetching logic in React applications
import React, { useState, useEffect } from "react";
import useSWR from "swr";
import { API_URL } from "./api";
import { useKeycloak } from "@react-keycloak/web";
import { fetcherWithToken } from "./fetcher";
import { updateSensor } from "./api";

// useSWR is used to fetch data from an API endpoint. It provides data, error, and other states like mutate for managing the fetched data.
// Each custom hook (useDevices, useMyDevices, useDevice, etc.) calls useSWR, passing the endpoint URL and fetcherWithToken as arguments. It:
// Takes in parameters like userToken, deviceId, etc.
// Calls the backend API with the appropriate URL and the token for authorization.
// Uses SWR’s built-in caching and revalidation features. For instance, refreshInterval is set in the hooks, which means the data is re-fetched at the specified intervals (e.g., 30,000 ms or 60,000 ms).
// Returns an Object: Each hook returns an object containing data, loading states, and errors, making it easier to handle these states in components.

/**
 * Fetch a //!specific
 * device from DB via API.
 * Data is revalidated every 30 seconds.
 *
 * @param deviceId
 * @returns object
 */
export function useDevice(deviceId) {
  const { keycloak } = useKeycloak();

  const fetcher = (url) => {
    if (!keycloak.authenticated) {
      throw new Error("User is not authenticated");
    }

    const token = keycloak.token;

    return fetcherWithToken(url, "GET", null, token);
  };

  const shouldFetch = keycloak.authenticated && deviceId;

  const { data, error, mutate } = useSWR(
    shouldFetch ? `${API_URL}/devices/${deviceId}` : null,
    fetcher,
    {
      refreshInterval: 30000,
      revalidateOnFocus: true,
    }
  );

  return {
    deviceData: data,
    deviceLoading: !error && !data,
    deviceError: error,
    mutate,
  };
}

/**
 * Fetch //!all
 * devices from DB via API.
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
 * Fetch all //?user's
 * devices from DB via API.
 * Data is revalidated every 30 seconds.
 *
 * @param userToken
 * @returns object
 */
export function useMyDevices() {
  const { keycloak } = useKeycloak();

  const fetcher = (url) => {
    if (!keycloak.authenticated) {
      throw new Error("User is not authenticated");
    }

    const token = keycloak.token;

    return fetcherWithToken(url, "GET", null, token);
  };

  const { data, error, mutate } = useSWR(
    keycloak.authenticated ? `${API_URL}/devices/my-devices` : null,
    fetcher,
    { refreshInterval: 30000, revalidateOnFocus: true }
  );

  return {
    devicesData: data,
    devicesLoading: !error && !data,
    devicesError: error,
    mutate,
  };
}

/**
 * Fetch the specified device images from DB via API.
 * Data is revalidated every 60 seconds.
 *
 * @param deviceId
 * @returns object
 */
export function useDeviceImages(deviceId) {
  const { keycloak } = useKeycloak();

  const fetcher = (url) => {
    if (!keycloak.authenticated) {
      throw new Error("User is not authenticated");
    }

    const token = keycloak.token;

    return fetcherWithToken(url, "GET", null, token);
  };

  const { data, error, mutate } = useSWR(
    keycloak.authenticated && deviceId
      ? `${API_URL}/devices/${deviceId}/images`
      : null,
    fetcher,
    { refreshInterval: 60000, revalidateOnFocus: true }
  );

  return {
    images: data ? data.images : [],
    imagesLoading: !error && !data,
    imagesError: error,
    mutate,
  };
}

/**
 * Fetch all user's sensors from DB via API.
 * Data is revalidated every 30 seconds.
 *
 * @param userToken
 * @returns object
 */
export function useMySensors() {
  const { keycloak } = useKeycloak();

  const fetcher = (url) => {
    if (!keycloak.authenticated) {
      throw new Error("User is not authenticated");
    }

    const token = keycloak.token;

    return fetcherWithToken(url, "GET", null, token);
  };

  const { data, error, mutate } = useSWR(
    keycloak.authenticated ? `${API_URL}/wireless-sensors/my-sensors` : null,
    fetcher,
    { refreshInterval: 30000, revalidateOnFocus: true }
  );

  return {
    sensorsData: data,
    sensorsLoading: !error && !data,
    sensorsError: error,
    mutate,
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
export function useWirelessSensor(sensorId) {
  const { keycloak } = useKeycloak();

  const fetcher = (url) => {
    if (!keycloak.authenticated) {
      throw new Error("User is not authenticated");
    }

    const token = keycloak.token;

    return fetcherWithToken(url, "GET", null, token);
  };

  const shouldFetch = keycloak.authenticated && sensorId;

  const { data, error, mutate } = useSWR(
    shouldFetch ? `${API_URL}/wireless-sensors/${sensorId}` : null,
    fetcher,
    {
      refreshInterval: 30000,
      revalidateOnFocus: true,
    }
  );

  // Add the update function
  const updateSensorLabel = async (newLabel) => {
    if (!keycloak.authenticated) {
      throw new Error("User is not authenticated");
    }

    const token = keycloak.token;

    try {
      const body = { label: newLabel };
      await updateSensor(sensorId, token, body);
      // Revalidate the data after updating
      await mutate();
    } catch (error) {
      throw error;
    }
  };

  return {
    sensorData: data,
    sensorLoading: !error && !data,
    sensorError: error,
    mutate,
    updateSensorLabel, // Expose the update function
  };
}

/**
 * Fetch the count of connected sensors for a specific device.
 * Data is revalidated every 30 seconds.
 *
 * @param deviceId
 * @returns object containing sensor count, loading state, and error
 */
export function useConnectedSensorCount(deviceId) {
  const { keycloak } = useKeycloak();
  const [lastSensorCount, setLastSensorCount] = useState(null);

  const fetcher = (url) => {
    if (!keycloak.authenticated) {
      throw new Error("User is not authenticated");
    }

    const token = keycloak.token;
    return fetcherWithToken(url, "GET", null, token);
  };

  const shouldFetch = keycloak.authenticated && deviceId;

  const { data, error, mutate } = useSWR(
    shouldFetch
      ? `${API_URL}/devices/check-wireless-sensors/${deviceId}`
      : null,
    fetcher,
    { refreshInterval: 30000, revalidateOnFocus: true }
  );

  // Update `lastSensorCount` only when new data is available
  useEffect(() => {
    if (data && data[deviceId]) {
      setLastSensorCount(data[deviceId].length);
    }
  }, [data, deviceId]);

  return {
    sensorCount: lastSensorCount,
    sensorCountLoading: !error && !data,
    sensorCountError: error,
    mutate,
  };
}
