import axios from "axios";
import store from "@/store";
import router from "@/router";

const axiosAuth = axios.create({
  baseURL: process.env.VUE_APP_DEV_SERVER
});

const axiosRegedit = axios.create({
  baseURL: process.env.VUE_APP_DEV_SERVER
});

//auth request interceptor
axiosAuth.interceptors.request.use(
  config => {
    store.dispatch("coreui/loading", true);
    return config;
  },
  error => {
    Promise.reject(error);
  }
);

//auth response interceptor
axiosAuth.interceptors.response.use(
  response => {
    store.dispatch("coreui/loading", false);
    return response;
  },
  error => {
    store.dispatch("coreui/loading", false);
    return Promise.reject(error);
  }
);

//regedit request interceptor
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

//regedit response interceptor
axiosRegedit.interceptors.response.use(
  response => {
    store.dispatch("coreui/loading", false);
    return response;
  },
  error => {
    store.dispatch("coreui/loading", false);
    if (typeof error.response === "undefined") {
      //Server access error
      store.dispatch(
        "error/serverError",
        "Server is not responding! Check your network connection..."
      );
      router.push("/error");
    } else {
      console.log("Error status", error.response.status);
      //Check if user is authenticated
      let token = store.getters["auth/token"];
      // Unauthorized access
      if (error.response.status === 401 || error.response.status === 403) {
        //Token expired
        if (token) {
          store.dispatch("auth/logout").then(() => {
            store.commit(
              "auth/SET_ERROR_MSG",
              "La sessione di lavoro è scaduta!"
            );
            router.push("/login");
          });
        } else {
          store.dispatch("error/serverError", {
            status: error.response.status,
            msg: "Unauthorized access!"
          });
        }
      } else {
        //Internal server error
        store.dispatch("error/serverError", error.response);
        router.push("/error");
      }
    }
    return Promise.reject(error);
  }
);

export { axiosAuth, axiosRegedit };
