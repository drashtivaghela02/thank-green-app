const BASE_URL = 'https://thankgreen.onrender.com/api/';

const buildQueryString = (params) => {
  return Object.keys(params)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
    .join('&');
};

const makeApiCall = async (endpoint, method , body , accessToken, queryParams = {}) => {
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
    console.log("HEy query string builded like this",url )
  }

  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error(`Failed to fetch: ${response.msg}`);
    }
    return await response.json();
  } catch (error) {
    console.log(`Error in API call to ${endpoint}:`, error);
    throw error;
  }
};

export default makeApiCall;