import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import AuthApi from "../src/services/AuthApi";
import { setCookie } from "cookies-next";
import swal from "sweetalert";
import { toast } from "react-hot-toast";

const ResetPassword = ({ token }) => {
  const router = useRouter();

    const [message, setMessage] = useState('')

  const { isLoading } = useQuery(
    ["verify-email", token],
    () => AuthApi.verifyEmail(token),
    {
      onSuccess: (data) => {
        console.log(data)
        setCookie("token", data.token);
        toast.success("Active successfully");
        router.push("/");
        setMessage('Active successfully')
      },
      onError: (error) => {
        console.log(error);
        error && error.message && toast.error(error.message);
        setMessage('Activation failed, please contact admin')
      },
    }
  );

  return (
    <>
      <Link
        href={"/"}
        className="cursor-pointer  absolute top-[20px] left-[20px] z-10"
      >
        <h1 className="text-neutral font-bold text-2xl md:text-4xl inline-block">
          MISSOUT
        </h1>
      </Link>
      <div className="relative hero min-h-screen bg-base-200 bg-[url('https://file.hstatic.net/200000195489/file/banner_web-01_0b869214f97d45c7a17be4c203be93f7.jpg')] bg-cover bg-center bg-no-repeat">
        <div className="hero-content w-full md:w-[800px]">
          <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
            <div className="card-body">
              <h1 className="text-4xl font-bold text-center">Active User!</h1>
              {isLoading ? (
                <div className="text-center">
                  <h2>Đang xác thực....</h2>
                  <span className="loading loading-infinity loading-lg"></span>
                </div>
              ) : (
                <div className="text-center">{message}</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ResetPassword;

export const getServerSideProps = ({ query }) => {
  const token = query.token;
  if (!token) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: { token },
  };
};
