const API_URL = "http://localhost:3000";

const signup = async(username, email, password) => {
  const response = fetch(`${API_URL}/signup`, {
    method: 'POST',
    mode: 'cors',
    /*  crossDomain: true,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "Access-Control-Allow-Origin": "*",
        },*/
    body: JSON.stringify({
      username,
      email,
      password,
    }),
  })
};

const login = async(username, password) => {
  const response = await fetch(`${API_URL}/login`, {
    method: 'POST',
  /*  crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },*/
    mode: 'cors', 
    body: JSON.stringify({
      username,
      password,
    }),
  });
  const res = await response.json();
  if (res.data.username) {
    localStorage.setItem("user", JSON.stringify(res.data));
  };
  return res.data;
};

const logout = () => {
  localStorage.removeItem("user");
  fetch(`${API_URL}/logout`)
  .then((response) => response.data)
};
  
const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};
  
const AuthService = {
  signup,
  login,
  logout,
  getCurrentUser,
}
  
export default AuthService;  