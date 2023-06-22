import axios from "axios";
import { deleteCookie, setCookie } from "cookies-next";
import Router from "next/router";
import axiosClient from "../config";
import { toast } from "react-hot-toast";

const AuthApi = {
  login: async ({ email, password }) => {
    try {
      let reuslt = await axiosClient.post("/user/login", {
        email,
        password,
      });

      setCookie("token", reuslt.data.data.token);
      Router.push("/");
      //trả về cái token
    } catch (e) {
      e && e.message && toast.error(e.message);
    }
  },
  register: async ({ email, password }) => {
    let result = await axiosClient.post("/user/register", {
      email,
      password,
    });

    return result.data;
  },
  getMyInfo: async () => {
    try {
      let result = await axiosClient.get("/user/me");
      return result.data.data;
    } catch (e) {
      console.log(e);
    }
  },

  clearUser: async () => {
    const user = undefined;
    deleteCookie("token");
    return user;
  },

  getAllMyInfo: async () => {
    let res = await axiosClient.get("/info");
    return res.data.data;
  },
  putMyInfo: async (data) => {
    try {
      let res = await axiosClient.put(`/user`, data);
      return res.data;
    } catch (e) {
      e && e.message && toast.error(e.message);
    }
  },
  forgotPassword: async (email) => {
    const result = await axiosClient.post("/user/forgot-password", { email });
    return result.data;
  },
  resetPassword: async ({ token, password }) => {
    const result = await axiosClient.put(`/user/reset-password/${token}`, {
      password,
    });
    return result.data;
  },
  verifyEmail: async (token) => {
    const result = await axiosClient.get(`/user/verify-email?token=${token}`);
    return result.data.data;
  },
  loginGoogle:async(token) => {
    const result = await axiosClient.post(`/user/login-google`,{token})
    return result.data.data
  }
};

export default AuthApi;
