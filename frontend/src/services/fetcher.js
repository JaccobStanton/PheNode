// Utility function for general fetch requests
export const fetcher = async (input, init) => {
  const res = await fetch(input, init);
  return res.json();
};

// Utility function for fetch requests with authentication token
export async function fetcherWithToken(
  url,
  method = "GET",
  body = null,
  token
) {
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
    credentials: "include",
  };

  const response = await fetch(url, {
    method,
    headers,
    body: body ? JSON.stringify(body) : null,
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response.json();
}
