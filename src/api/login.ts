import http from "../utils/http";

const request = (url: string, data: object) => {
  return http.request({
    method: "post",
    url,
    data
  });
};

export function authCode(email: string, module: string) {
  return request("/getSms/", { username: email, module });
}

export function login(email: string, password: string, code: string) {
  return request("/login/", {
    username: email,
    password: password,
    code: code
  });
}

export function register(email: string, password: string, code: string) {
  return request("/register/", {
    username: email,
    password: password,
    code: code,
    module: "register"
  });
}

// export function logout() {}
