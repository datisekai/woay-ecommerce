import { useFormik } from "formik";
import React, { useState } from "react";
import * as Yup from "yup";
import AuthApi from "../src/services/AuthApi";
import Link from "next/link";

export default function register() {
    const [isLoading, setIsLoading] = useState(false);

    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
            re_password: "",
        },
        validationSchema: Yup.object({
            password: Yup.string().min(8).required(),
            email: Yup.string().email().required(),
            re_password: Yup.string().oneOf([Yup.ref("password"), null]),
        }),
        onSubmit: async (values) => {
            setIsLoading(true);
            await AuthApi.register(values);
            setIsLoading(false);
        },
    });

    return (
        <>
            <Link
                href={"/"}
                className="cursor-pointer  absolute top-[20px] left-[20px]"
            >
                <h1 className="text-neutral font-bold text-2xl md:text-4xl inline-block">
                    MISSOUT
                </h1>
            </Link>
            <div className="hero min-h-screen bg-[url('https://file.hstatic.net/200000195489/file/banner_web_15ad38e33b3e4fefac8f8051a2c8edfd.jpg')]">
                <div className="hero-content flex-col lg:flex-row-reverse">
                    <div className="text-center lg:text-left">
                        <h1 className="text-5xl font-bold">Register now!</h1>
                    </div>
                    <form
                        onSubmit={formik.handleSubmit}
                        className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100"
                    >
                        <div className="card-body">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input
                                    name="email"
                                    type="email"
                                    placeholder="Email"
                                    onChange={formik.handleChange}
                                    className={
                                        formik.errors.email
                                            ? "input input-bordered input-error  w-full max-w-xs"
                                            : "input input-bordered"
                                    }
                                />
                            </div>

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input
                                    name="password"
                                    type="password"
                                    placeholder="Password"
                                    className={
                                        formik.errors.password
                                            ? "input input-bordered input-error  w-full max-w-xs"
                                            : "input input-bordered"
                                    }
                                    onChange={formik.handleChange}
                                />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">
                                        Re-enter password
                                    </span>
                                </label>
                                <input
                                    name="re_password"
                                    type="password"
                                    placeholder="Re-enter password"
                                    className={
                                        formik.errors.re_password
                                            ? "input input-bordered input-error  w-full max-w-xs"
                                            : "input input-bordered"
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

                            <div className="form-control mt-6">
                                <button
                                    type="submit"
                                    className="btn btn-primary"
                                >
                                    Register
                                </button>
                                <Link
                                    href={"/login"}
                                    className="link text-center mt-[16px]"
                                >
                                    Login now!
                                </Link>
                            </div>
                        </div>
                    </form>
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
