import axios from "axios";
import { setCookie } from "cookies-next";
import Router from "next/router";

const AuthApi = {
    login: async ({ email, password }) => {
        try {
            let reuslt = await axios({
                method: "POST",
                url: process.env.NEXT_PUBLIC_SERVER_URL + "/user/login",
                data: {
                    email,
                    password,
                },
            });
            console.log(reuslt.data);
            setCookie("token", reuslt.data.data.token);
            Router.push("/");

            //trả về cái token
        } catch (e) {
            console.log(e);
        }
    },
    register: async ({ email, password }) => {
        try {
            let reuslt = await axios({
                method: "POST",
                url: process.env.NEXT_PUBLIC_SERVER_URL + "/user/register",
                data: {
                    email,
                    password,
                },
            });
            console.log(reuslt);
            // chuyển hướng về trang login
            Router.push("/login");

            //trả về cái token
        } catch (e) {
            console.log(e);
        }
    },
};

export default AuthApi;
