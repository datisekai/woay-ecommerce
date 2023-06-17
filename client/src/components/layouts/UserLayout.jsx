import { getCookie, setCookie } from "cookies-next";
import React, { useEffect } from "react";
import axiosClient from "../../config";
import AuthApi from "../../services/AuthApi";
import { useDispatch } from "react-redux";
import { setUser } from "../../redux/slices/UserSlice";

export default function UserLayout({ children }) {
    const dispatch = useDispatch();
    const getUser = async () => {
        let res = await AuthApi.getMyInfo();

        dispatch(setUser(res));
        setCookie("role", res.role);
    };
    // const getData = async
    useEffect(() => {
        if (getCookie("token")) getUser();
    }, []);
    return <div>{children}</div>;
}
