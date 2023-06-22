import { useMutation } from "@tanstack/react-query";
import Link from "next/link";
import React from "react";
import AuthApi from "../src/services/AuthApi";
import { toast } from "react-hot-toast";
import { ErrorMessage, Field, Formik } from "formik";
import * as Yup from "yup";
import swal from "sweetalert";
import { useRouter } from "next/router";

const ResetPassword = ({ token }) => {
  const router = useRouter();
  const { mutate, isLoading } = useMutation(AuthApi.resetPassword, {
    onSuccess: () => {
      swal("Success", "Password reset successful, please login", "success");
      router.push("/login");
    },
    onError: (error) => {
      console.log(error);
      error && error.message && toast.error(error.message);
    },
  });

  const initialValues = {
    password: "",
    confirmPassword: "",
  };

  const validationSchema = Yup.object().shape({
    password: Yup.string()
      .required("Password is required")
      .min(8, "Password must be at least 8 characters long"),
    confirmPassword: Yup.string()
      .required("Confirm Password is required")
      .oneOf([Yup.ref("password"), null], "Passwords must match"),
  });

  const handleSubmit = (values) => {
    mutate({ token, password: values.password });
  };

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
            <Formik
              initialValues={initialValues}
              onSubmit={handleSubmit}
              validationSchema={validationSchema}
            >
              {({ handleSubmit }) => (
                <div className="card-body">
                  <h1 className="text-4xl font-bold">Reset password!</h1>
                  <div className="mt-4 space-y-2">
                    <div>
                      <label htmlFor="" className="block">
                        Password
                      </label>
                      <Field
                        name="password"
                        type="password"
                        placeholder="Nhập password.."
                        className="input input-bordered w-full mt-1"
                      />
                      <ErrorMessage
                        name="password"
                        component="div"
                        className="text-error"
                      />
                    </div>
                    <div>
                      <label htmlFor="" className="block">
                        Re-enter password
                      </label>
                      <Field
                        name="confirmPassword"
                        type="password"
                        placeholder="Nhập password.."
                        className="input input-bordered w-full mt-1"
                      />
                      <ErrorMessage
                        name="confirmPassword"
                        component="div"
                        className="text-error"
                      />
                    </div>
                  </div>
                  <button
                    type="submit"
                    onClick={handleSubmit}
                    className="btn w-full btn-primary mt-4"
                  >
                    Reset password
                  </button>
                  <Link href={"/login"} className="link text-center mt-[16px]">
                    Login now!
                  </Link>
                </div>
              )}
            </Formik>
          </div>
        </div>
      </div>
      {isLoading ? (
        <div className="fixed top-0 left-0 h-full bg-[rgba(0,0,0,0.4)] w-full">
          <span className="loading loading-spinner loading-xs md:loading-lg absolute top-[50%] left-[50%] translate-y-[-50%] translate-x-[-50%]"></span>
        </div>
      ) : null}
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
