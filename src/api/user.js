import { request } from "../utils/request";

export function getAllUser() {
  return request({
    url: "/user/all",
    method: "get",
  });
}
