export const BASE_API = `${process.env.REACT_APP_API_URL}`;
const POST = "post";
const GET = "get";
const PUT = "put";
const PATCH = "patch";
const DELETE = "delete";
const INVALID_TOKEN = "invalid or expired jwt";
const jsonToUrlParams = (json) => {
  return Object.keys(json).map(function (k) {
    if (json[k]) {
      return encodeURIComponent(k) + '=' + encodeURIComponent(json[k])
    }
    return "";
  }).filter((item) => {
    return item;
  }).join('&')
}
const getToken = () => {
  const token = localStorage.getItem("accesstoken");
  if (token !== null) {
    return token;
  }
  return "";
};
const refreshToken = async () => {
  const refreshtoken = localStorage.getItem("refreshtoken");
  if (!refreshtoken) {
    throw new Error("No refresh token available.");
  }
  const payload = {
    refreshToken: refreshtoken
  };
  let config = {
    method: POST,
    body: JSON.stringify(payload),
    headers: {
      "content-type": "application/json",
    },
  };
  const response = await fetch(`${BASE_API}/auth/refreshAccessToken`, config)
  //console.log(response);
  if (!response.ok) {
    throw new Error("Failed to refresh token.");
  }
  const data = await response.json();
  if (data.statusCode === 401 ||
    data.statusCode === INVALID_TOKEN ||
    data.status === INVALID_TOKEN) {
    localStorage.removeItem("accesstoken");
    localStorage.removeItem("refreshtoken");
    localStorage.removeItem("phoneno");
    localStorage.removeItem("name");
    localStorage.removeItem("email");
    window.location.href("/")
  }
  else {
    localStorage.setItem("accesstoken", data.data.accessToken);
  }
};
const handleResponse = async (response) => {
  console.log(response);
  const contentType = response.headers.get("Content-Type");
  if (contentType && contentType.indexOf("application/json") !== -1) {
    const data = await response.json();
    return data;
  } else {
    return response.text();
  }
};
const Request = async (
  route,
  method,
  priv = true,
  payload,
  imageType = "",
  API_URL = "",
  params = {}
) => {
  if (Object.keys(params).length > 0) {
    route += `?${jsonToUrlParams(params)}`;
  }
  let config = {
    method: method,
    headers: {},
  };
  if (["post", "put", "patch"].includes(method)) {
    config = {
      ...config,
      body: JSON.stringify(payload),
      headers: {
        "content-type": "application/json",
      },
    };
  }
  else {
    let token = getToken();
    config = {
      ...config,
      headers: {
        Authorization: 'Bearer ' + token,
      },
    };
  }
  if (priv) {
    let token = getToken();
    config.headers = {
      ...config.headers,
      Authorization: 'Bearer ' + token,
    };
  }
  let api_temp = BASE_API;
  return fetch(`${api_temp}${route}`, config)
    .then(async (res) => {
      const data = await handleResponse(res);
      return data;
    })
    .catch((err) => {
      throw handleTokenError(err);
    });
};
const handleTokenError = (err) => {
  if (
    err?.status === 401 ||
    err?.message === INVALID_TOKEN ||
    err?.statusText === INVALID_TOKEN
  ) {
    console.log(err);
    refreshToken();
  }
  return err;
};
const HandleError = (error, msg) => {
  console.log("error", error);
  let errMsg = "";
  if (error) {
    switch (error.status) {
      case 400:
        errMsg = msg.INVALID_DATA_ERROR;
        break;
      case 401:
        errMsg = msg.UNAUTHORISED;
        break;
      case 403:
        errMsg = msg.FORBIDDEN_ERROR;
        break;
      case 404:
        errMsg = msg.NOT_FOUND;
        break;
      case 409:
        errMsg = msg.CONFLICT;
        break;
      case 413:
        errMsg = msg.PAYLOAD_TOO_LARGE;
        break;
      case 500:
        errMsg = msg.SERVER_ERROR;
        break;
      default:
        errMsg = msg.DEFAULT_ERROR;
    }
  }
  console.log("errMsg", error);
  return errMsg;
};
let base = {
  BASE_API,
  POST,
  GET,
  PUT,
  PATCH,
  DELETE,
  Request,
  HandleError,
};
export default base;