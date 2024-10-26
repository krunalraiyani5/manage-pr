export const isAuth = () => {
  const accessToken = localStorage.getItem("accessToken");
  const isAccess = accessToken === "authorization" ? true : false;
  return isAccess;
};
