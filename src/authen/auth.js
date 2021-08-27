export const isUserLoggedIn = () => {
  return localStorage.getItem("userData");
};
