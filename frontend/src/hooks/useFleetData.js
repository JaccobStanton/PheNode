//useFleetData hook consumes the data from the FleetData context instead of fetching it directly.

import { useFleetDataContext } from "../context/FleetDataContext";

const useFleetData = () => {
  // Get the fleet data, loading, and error state from the context
  const { data, loading, error } = useFleetDataContext();

  return { data, loading, error };
};

export default useFleetData;
