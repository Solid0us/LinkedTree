import http from "../http-common";

class UserAuth {
  authenticate() {
    return http.post("/v1/auth");
  }

  login(data: {}) {
    return http.post("/v1/auth/login", data);
  }

  logout() {
    return http.post("/v1/auth/signout");
  }
}

export default new UserAuth();
