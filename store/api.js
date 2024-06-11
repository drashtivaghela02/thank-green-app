const BASE_URL = 'https://thankgreen.onrender.com/api/';

const buildQueryString = (params) => {
  return Object.keys(params)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
    .join('&');
};

const makeApiCall = async (endpoint, method = 'GET', body = null, accessToken = null, queryParams = {}) => {
  const headers = {
    'Content-Type': 'application/json',
  };

  if (accessToken) {
    headers['Authorization'] = `Bearer ${accessToken}`;
  }

  const options = {
    method,
    headers,
  };

  if (body) {
    options.body = JSON.stringify(body);
  }

  let url = `${BASE_URL}${endpoint}`;
  if (Object.keys(queryParams).length > 0) {
    const queryString = buildQueryString(queryParams);
    url = `${url}?${queryString}`;
  }

  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error(`Failed to fetch: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error(`Error in API call to ${endpoint}:`, error);
    throw error;
  }
};

export default makeApiCall;