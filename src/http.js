import axios from "axios";
import store from "@/store";
import router from "@/router";

const axiosAuth = axios.create({
  baseURL: process.env.VUE_APP_DEV_SERVER
});

const axiosRegedit = axios.create({
  baseURL: process.env.VUE_APP_DEV_SERVER
});

//request interceptor
axiosAuth.interceptors.request.use(
  config => {
    store.dispatch("coreui/loading", true);
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

//request interceptor
axiosRegedit.interceptors.request.use(
  config => {
    store.dispatch("coreui/loading", true);
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
axiosRegedit.interceptors.response.use(
  response => {
    store.dispatch("coreui/loading", false);
    return response;
  },
  error => {
    store.dispatch("coreui/loading", false);
    //Network connection error
    if (typeof error.response === "undefined") {
      store.dispatch("error/serverError", {
        status: "Network error",
        message: "Please check your internet connection!"
      });
      router.push("/error");
    } else {
      console.log("Error status", error.response.status);
      //Check if user is authenticated
      let token = store.getters["auth/token"];
      // Unauthorized access
      if (error.response.status === 401 || error.response.status === 403) {
        store.dispatch("error/serverError", {
          status: error.response.status,
          msg: "Unauthorized access!"
        });
        if (token) {
          router.push("/login");
          store.commit(
            "auth/SET_ERROR_MSG",
            "La sessione di lavoro è scaduta!"
          );
        } else {
          router.push("/");
        }
      } else {
        //Server error
        store.dispatch("error/serverError", error.response);
        router.push("/error");
      }
    }
    return Promise.reject(error);
  }
);

export { axiosAuth, axiosRegedit };
