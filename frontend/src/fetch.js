const BACKEND_SERVER_API = process.env.REACT_APP_BACKEND_API;
function apiFetch(baseUrl) {
  return (url, ...otherParams) => url.startsWith('/') ? fetch(baseUrl + url, ...otherParams) : fetch(url, ...otherParams)
}
export default apiFetch(BACKEND_SERVER_API);
