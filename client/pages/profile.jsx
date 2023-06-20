import React, { useEffect, useRef, useState } from "react";
import MainLayout from "../src/components/layouts/MainLayout";
import { useSelector } from "react-redux";
import { FaPlus } from "react-icons/fa";
import DiaChi from "../src/components/DiaChi/DiaChi";
import AuthApi from "../src/services/AuthApi";
import { useQuery } from "@tanstack/react-query";
import DatePicker from "react-datepicker";
import { registerLocale, setDefaultLocale } from "react-datepicker";
import dayjs from "dayjs";
import vi from "date-fns/locale/vi";
import { ErrorMessage, Field, Form, Formik, useFormik } from "formik";
import * as Yup from "yup";

export default function profile() {
    const { data, isLoading } = useQuery(["info"], AuthApi.getAllMyInfo);

    const [startDate, setStartDate] = useState(new Date());
    const { user } = useSelector((state) => state.user);
    const innerRef = useRef(null);
    useEffect(() => {
        if (user) {
            setStartDate(new Date(user.date));
            innerRef.current.setFieldValue("name", user.name || "");
            innerRef.current.setFieldValue("phone", user.phone || "");
        }
    }, [user]);

    console.log({ user });

    const [isHoSo, setIsHoSo] = useState(true);
    const [currentUpdate, setCurrentUpdate] = useState({
        isDisplay: false,
        data: {},
    });
    registerLocale("vi", vi);

    const initialValues = {
        name: user?.name,
        phone: user?.phone,
    };
    const validationSchema = Yup.object({
        name: Yup.string().required(),
        phone: Yup.string()
            .matches(/^\\d{10,11}$/, "Phone invalid format")
            .required(),
    });
    const handleSubmit = (values) => {
        const data = {
            ...values,
            date: dayjs(startDate).format("YYYY-MM-DD"),
        };
        console.log(data);
        console.log(AuthApi.putMyInfo(data));
    };
    return (
        <MainLayout>
            <div className="container mx-auto px-[15px] my-[50px]">
                <div className="  grid grid-cols-1 gap-y-4 lg:grid-cols-4">
                    <div className="col-span-1  ">
                        <div className="flex gap-4 flex items-center flex-wrap justify-center">
                            <img
                                className="w-12 rounded-full"
                                src={`https://ui-avatars.com/api/?background=0D8ABC&color=fff&name=${
                                    user?.name ? user?.name : user?.email
                                }`}
                                alt="avatar"
                            />
                            <h1 className="uppercase font-bold">
                                {user?.name ? user?.name : user?.email}
                            </h1>
                        </div>
                        <div className="mt-[24px] flex justify-center">
                            <ul className="menu menu-lg bg-base-200 w-56 rounded-box ">
                                <li className="mb-[8px]">
                                    {/* set state add class active */}
                                    <a
                                        className={isHoSo ? "active" : null}
                                        onClick={() => {
                                            if (isHoSo) return;
                                            setIsHoSo(true);
                                        }}
                                    >
                                        Hồ sơ
                                    </a>
                                </li>
                                <li>
                                    <a
                                        className={!isHoSo ? "active" : null}
                                        onClick={() => {
                                            if (!isHoSo) return;
                                            setIsHoSo(false);
                                        }}
                                    >
                                        Địa chỉ
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className=" col-span-3 px-[20px] shadow-2xl pb-[30px]">
                        <div
                            className={isHoSo ? null : "hidden"}
                            // "wrap_ho_so hidden"
                        >
                            <div
                                className="pb-[20px] relative before:content-[''] before:absolute before:w-[95%] before:h-[1px] before:bottom-0 before:left-[50%] before:translate-x-[-50%] before:bg-black
                        "
                            >
                                <h1 className="py-[16px] uppercase font-bold text-xl">
                                    Hồ sơ của tôi
                                </h1>
                                <p>
                                    Quản lý thông tin hồ sơ để bảo mật tài khoản
                                </p>
                            </div>
                            <div className="lg:px-[40px] lg:py-[20px]">
                                <Formik
                                    initialValues={initialValues}
                                    validationSchema={validationSchema}
                                    onSubmit={handleSubmit}
                                    innerRef={innerRef}
                                    className="div flex flex-col gap-2
                                            pl-[8px] lg:px-[16px]"
                                >
                                    <Form className="flex flex-col gap-2 lg:px-[16px]">
                                        <div className="flex gap-4">
                                            <label
                                                htmlFor=""
                                                className="w-[110px] flex items-center justify-end"
                                            >
                                                Email
                                            </label>
                                            <input
                                                className="h-12 flex items-center justify-start"
                                                type="text"
                                                defaultValue={user?.email}
                                                readOnly
                                            />
                                        </div>
                                        <div className="flex gap-4">
                                            <label
                                                htmlFor=""
                                                className="w-[110px] flex items-center justify-end"
                                            >
                                                Tên
                                            </label>
                                            <Field
                                                className="input input-bordered w-full max-w-xs"
                                                name="name"
                                                type="text"
                                            />
                                            <ErrorMessage
                                                name="name"
                                                component="div"
                                                className="text-error"
                                            />
                                        </div>
                                        <div className="flex gap-4">
                                            <label
                                                htmlFor=""
                                                className="w-[110px] flex items-center justify-end"
                                            >
                                                Số điện thoại
                                            </label>
                                            <Field
                                                className="input input-bordered w-full max-w-xs"
                                                type="text"
                                                name="phone"
                                            />
                                            <ErrorMessage
                                                name="phone"
                                                component="div"
                                                className="text-error"
                                            />
                                        </div>

                                        <div className="flex gap-4">
                                            <label
                                                htmlFor=""
                                                className="w-[110px] flex items-center justify-end"
                                            >
                                                Ngày sinh
                                            </label>
                                            <DatePicker
                                                locale={"vi"}
                                                className="input input-bordered"
                                                selected={startDate}
                                                value={startDate}
                                                onChange={(date) =>
                                                    setStartDate(date)
                                                }
                                                placeholderText="Ngày sinh"
                                            />
                                        </div>

                                        <button
                                            type="submit"
                                            className="btn btn-outline btn-primary mt-[16px] w-[50%]"
                                        >
                                            Lưu
                                        </button>
                                    </Form>
                                </Formik>
                            </div>
                        </div>
                        <div
                            className={!isHoSo ? null : "hidden"}
                            // "wrap_diaChi"
                        >
                            <div
                                className="pb-[20px] flex flex-col lg:flex-row gap-4 justify-between items-center relative before:content-[''] before:absolute before:w-[95%] before:h-[1px] before:bottom-0 before:left-[50%] before:translate-x-[-50%] before:bg-black
                        "
                            >
                                <h1 className="uppercase font-bold text-xl">
                                    Địa chỉ của Tôi
                                </h1>
                                <button className="btn btn-outline btn-primary">
                                    <FaPlus /> Thêm địa chỉ mới
                                </button>
                            </div>
                            <div
                                className="
                            pt-[24px]"
                            >
                                <h3 className="text-l font-semibold">
                                    Địa chỉ
                                </h3>
                                <div className="list_DiaChi my-[24px]">
                                    {data?.map((item, index) => {
                                        return (
                                            <DiaChi key={index} item={item} />
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
}

export const getServerSideProps = async () => {
    // call api lấy về mảng item prroduct
    return { props: {} };
};
