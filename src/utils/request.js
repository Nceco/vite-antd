import axios from "axios";
import { message } from "ant-design-vue";

const service = axios.create({
  baseURL: "/api",
  timeout: 3000,
  withCredentials: true,
});

service.interceptors.request.use(
  (config) => {
    const loginInfo = JSON.parse(localStorage.getItem("loginInfo"));
    config.headers["Authorization"] = loginInfo ? loginInfo.token : "";
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const request = (config) => {
  return new Promise((resolve, reject) => {
    service(config)
      .then((res) => {
        if (res.status === 200) {
          resolve(res.data);
        } else {
          reject(res);
        }
      })
      .catch((err) => {
        if (err.status === 401) {
          message.error("登录过期，请重新登录");
          return;
        }
        reject(err);
      });
  });
};
