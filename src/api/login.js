import { request } from "../utils/request";

export function login(data) {
  return request({
    url: "/login",
    method: "post",
    data,
  });
}

export function captcha() {
  return request({
    url: "/captcha",
    method: "get",
  });
}
