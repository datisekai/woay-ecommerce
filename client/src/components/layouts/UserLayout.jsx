import { getCookie, setCookie } from "cookies-next";
import React, { useEffect } from "react";
import AuthApi from "../../services/AuthApi";
import { useDispatch } from "react-redux";
import { setLoading, setUser } from "../../redux/slices/UserSlice";
import Header from "../Header/Header";
import Footer from "../Footer";

export default function UserLayout({ children }) {
  const dispatch = useDispatch();
  const getUser = async () => {
    dispatch(setLoading(true));
    let res = await AuthApi.getMyInfo();
    dispatch(setUser(res));
    dispatch(setLoading(false));
    setCookie("role", res.role);
  };
  // const getData = async
  useEffect(() => {
    if (getCookie("token")) getUser();
  }, []);
  return (
    <>
      <main>{children}</main>
    </>
  );
}
// de xax thuc nguoi dung
