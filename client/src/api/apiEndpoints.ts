//products

export const apiEndpoints = {
  //products

  //-----------------------AUTH
  login: "/auth/login", // POST
  register: "/auth/register", // POST
  refreshToken: "/auth/refresh-token", // POST
  isAuthenticated: "/auth/auto-login", // GET
  getAllUsers: "/auth/users", // GET

  //-----------------------CONTENT
  sendContactMessage: "/contact", // POST
};
