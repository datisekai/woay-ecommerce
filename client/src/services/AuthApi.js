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
            toast.error(e.message);
        }
    },
    register: async ({ email, password }) => {
        try {
            let reuslt = await axiosClient.post("/user/register", {
                email,
                password,
            });
            console.log(reuslt);
            setCookie("token", reuslt.data.data.token);
            // chuyển hướng về trang login
            Router.push("/");
            //trả về cái token
        } catch (e) {
            console.log(e);
        }
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
        console.log({ data });

        try {
            let res = await axiosClient.put(`/user`, data);

            console.log(res.data);
        } catch (e) {
            console.log(e);
        }
    },
};

export default AuthApi;
