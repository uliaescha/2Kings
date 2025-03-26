import Cookies from "js-cookie";

const isAuthenticated = () => {
  const token = Cookies.get("authToken");
  return token == undefined;
};
export default isAuthenticated;