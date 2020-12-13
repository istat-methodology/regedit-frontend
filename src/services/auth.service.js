import { axiosAuth } from "@/http";
import { config } from "@/common";

export const authService = {
  login
};

function login({ username, password }) {
  const formData = {
    username,
    password
  };

  return axiosAuth
    .post("/login", formData, config)
    .then(res => {
      console.log(res.data);
      const token = res.data.accessToken;
      const data = {
        token: token
      };
      return data;
    })
    .catch(error => {
      console.log(error.res.data.errorMessage);
      const err = {
        code: error.res.status,
        message: error.res.data.errorMessage
      };
      throw err;
    });
}
