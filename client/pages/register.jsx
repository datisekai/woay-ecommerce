import { useMutation } from "@tanstack/react-query";
import { useFormik } from "formik";
import Link from "next/link";
import React from "react";
import swal from "sweetalert";
import * as Yup from "yup";
import ModalForgotPassword from "../src/components/modals/ModalForgotPassword";
import AuthApi from "../src/services/AuthApi";
import { toast } from "react-hot-toast";
import useLoginGoogle from "../src/hooks/useLoginGoogle";
import { FcGoogle } from "react-icons/fc";

export default function Register() {
    const { mutate, isLoading } = useMutation(AuthApi.register, {
        onSuccess: (data) => {
            swal(
                "Success",
                `Please check your email to activate your account`,
                "success"
            );
        },
        onError: (e) => {
            console.log(e);
            e && e.message && toast.error(e.message);
        },
    });

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
            mutate(values);
        },
    });

    const { handleSignIn, loading } = useLoginGoogle();

    return (
        <>
            <Meta title={"Đăng ký | MISSOUT"} />
            <Link
                href={"/"}
                className="cursor-pointer  absolute top-[20px] left-[20px]"
            >
                <h1 className="text-neutral font-bold text-2xl md:text-4xl inline-block">
                    MISSOUT
                </h1>
            </Link>
            <div className="hero min-h-screen bg-[url('/img/register.webp')]">
                <div className="hero-content  w-full md:w-[800px]">
                    <form
                        onSubmit={formik.handleSubmit}
                        className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100"
                    >
                        <div className="card-body">
                            <h1 className="text-4xl font-bold">
                                Register now!
                            </h1>
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
                                    <ModalForgotPassword
                                        elementClick={
                                            <a className="label-text-alt link link-hover">
                                                Forgot password?
                                            </a>
                                        }
                                    />
                                </label>
                            </div>

                            <div className="form-control mt-6">
                                <button
                                    type="submit"
                                    className="btn btn-primary"
                                >
                                    Register
                                </button>
                                <div className="flex justify-between items-center mt-4">
                                    <Link
                                        href={"/login"}
                                        className="link text-center block"
                                    >
                                        Login now!
                                    </Link>
                                    <div
                                        onClick={handleSignIn}
                                        className="btn btn-sm btn-ghost"
                                    >
                                        <FcGoogle />
                                        Login Google
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
            {isLoading || loading ? (
                <div className="fixed top-0 left-0 h-full bg-[rgba(0,0,0,0.4)] w-full">
                    <span className="loading loading-spinner loading-xs md:loading-lg absolute top-[50%] left-[50%] translate-y-[-50%] translate-x-[-50%]"></span>
                </div>
            ) : null}
        </>
    );
}
