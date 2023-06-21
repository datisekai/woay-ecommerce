import React, { Suspense, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import AuthApi from "../src/services/AuthApi";
import SpinnerCenter from "../src/components/loadings/SpinnerCenter";
import Link from "next/link";

export default function Login() {
    const [isLoading, setIsLoading] = useState(false);
    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
        },
        validationSchema: Yup.object({
            password: Yup.string().min(8).required(),
            email: Yup.string().email().required(),
        }),
        onSubmit: async (values) => {
            setIsLoading(true);
            // chỉ goi hàm bên services tự xử lý
            await AuthApi.login(values);
            setIsLoading(false);
        },
    });

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
                        <form
                            className="card-body"
                            onSubmit={formik.handleSubmit}
                        >
                            <h1 className="text-4xl font-bold">Login now!</h1>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input
                                    name="email"
                                    type="text"
                                    placeholder="email"
                                    className={
                                        formik.errors.email
                                            ? "input input-bordered input-error  w-full max-w-xs"
                                            : "input input-bordered "
                                    }
                                    onChange={formik.handleChange}
                                />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input
                                    name="password"
                                    type="password"
                                    placeholder="password"
                                    className={
                                        formik.errors.password
                                            ? "input input-bordered input-error  w-full max-w-xs"
                                            : "input input-bordered "
                                    }
                                    onChange={formik.handleChange}
                                />
                                <label className="label">
                                    <a
                                        href="#"
                                        className="label-text-alt link link-hover"
                                    >
                                        Forgot password?
                                    </a>
                                </label>
                            </div>
                            {(formik.touched.email && formik.errors.email) ||
                            (formik.touched.password &&
                                formik.errors.password) ? (
                                <p>
                                    {formik.errors.email ||
                                        formik.errors.password}
                                </p>
                            ) : null}
                            <div className="form-control mt-6">
                                <button
                                    type="submit"
                                    className="btn btn-primary"
                                >
                                    Login
                                </button>
                                <Link
                                    href={"/register"}
                                    className="link text-center mt-[16px]"
                                >
                                    Register now!
                                </Link>
                            </div>
                        </form>
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
}
