import axios from "axios";
import store from "@/store";

const axiosAuth = axios.create({
  baseURL: process.env.VUE_APP_DEV_SERVER
});

const axiosIs2 = axios.create({
  baseURL: process.env.VUE_APP_DEV_SERVER
});

//request interceptor
axiosIs2.interceptors.request.use(
  config => {
    //store.dispatch("coreui/loading", true);
    const token = store.getters["auth/token"];
    if (token && !("Authorization" in config.headers)) {
      config.headers["Authorization"] = token;
    }
    return config;
  },
  error => {
    Promise.reject(error);
  }
);

//response interceptor
axiosIs2.interceptors.response.use(
  response => {
    //store.dispatch("coreui/loading", false);
    return response;
  },
  error => {
    //store.dispatch("coreui/loading", false);
    console.log("Error status", error.response.status);
    var err = {
      code: error.response.status,
      message: ""
    };
    // Unauthorized access
    if (error.response.status === 401) {
      //unauthorized
      store.dispatch("error/unauthorized", err);
    }
    return Promise.reject(error);
  }
);

export { axiosAuth, axiosIs2 };
