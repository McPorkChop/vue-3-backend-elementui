import axios from "axios";
import { Message } from "element-ui";

const BASE_URL = process.env.VUE_APP_API;

const instance = axios.create({
  baseURL: BASE_URL,
  timeout: 5000
});

instance.interceptors.request.use(
  function(config) {
    return config;
  },
  function(error) {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  function(response) {
    if (response.data.resCode != 0) {
      Message.error(response.data.message);
      return Promise.reject(response.data);
    }
    return response;
  },
  function(error) {
    return Promise.reject(error);
  }
);

export default instance;
