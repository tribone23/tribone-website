/** @format */

import axios from "axios";
import DefaultImage from "../assets/default.png"

export const checkUserToken = () => {
  const token = localStorage.getItem("token");

  axios
    .get("/getUser.php", {
      headers: {
        Authorization: "Bearer " + token,
      },
    })
    .then((response) => {
      let user = {
        id: response.data.id,
        nrp: response.data.nrp,
        nama: response.data.nama,
        email: response.data.email,
        profile: response.data.profile,
      };

      if (response.data.profile == false) {
        user.profile = DefaultImage
      }

      localStorage.setItem("isLogged", true);
      localStorage.setItem("user", JSON.stringify(user));
    })
    .catch((err) => {
      console.log(err);
      localStorage.setItem("isLogged", false);
      localStorage.removeItem("token");
    });
};

export const fetchUserData = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  return user;
};

export function isLogin() {
  const status = localStorage.getItem("isLogged");
  return status;
}

export const logoutUser = () => {
  localStorage.removeItem("isLogged");
  localStorage.removeItem("user");
  localStorage.removeItem("token");
};
