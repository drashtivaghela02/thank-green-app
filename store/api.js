// import { Alert } from "react-native";
// import { useSelector } from "react-redux";
import * as authActions from './actions/Auth';
// import Redux from './store';
import { Alert } from "react-native";
import { store } from './store';

const BASE_URL = 'https://thankgreen.onrender.com/api/';

const buildQueryString = (params) => {
  return Object.keys(params)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
    .join('&');
};

const makeApiCall = async (endpoint, method , body , accessToken, queryParams = {}, isFormData = false) => {
  const headers = {
    'Content-Type': 'application/json',
  };

  if (!isFormData) {
    headers['Content-Type'] = 'application/json';
  }
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
  console.log("HEy query string builded like this",url )

  if (Object.keys(queryParams).length > 0) {
    const queryString = buildQueryString(queryParams);
    url = `${url}?${queryString}`;
    console.log("HEy query string builded like this",url )
  }

  try {
    const response = await fetch(url, options);
    const resData = await response.json();
    console.log('resData', resData)
    if (resData.statusCode === 403 || resData.msg === 'jwt expired') {
      console.log("first")
      store.dispatch(authActions.refreshAccessToken())
      return resData;
    }

  
    if (!response.ok) {
      throw new Error(`Failed to fetch: ${error}`);
    }
    return await resData;
  } catch (error) {
    console.log(`Error in API call to ${endpoint}:`, resData.msg);
    throw error;
  }
};

export default makeApiCall;