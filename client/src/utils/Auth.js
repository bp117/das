// Service to check authentication for user and to signOut
const Auth = {
  signOut() {
    localStorage.removeItem("token");
  },
  isAuth() {
    return localStorage.getItem("token");
  },
  setToken(token) {
    localStorage.setItem("token", token);
  }
};
export default Auth;
