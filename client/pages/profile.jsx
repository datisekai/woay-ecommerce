import React, { useState } from "react";
import MainLayout from "../src/components/layouts/MainLayout";
import { useSelector } from "react-redux";
import { FaPlus } from "react-icons/fa";
import DiaChi from "../src/components/DiaChi/DiaChi";
import AuthApi from "../src/services/AuthApi";
import { useQuery } from "@tanstack/react-query";

export default function profile() {
    const { data, isLoading } = useQuery(["info"], AuthApi.getAllMyInfo);
    console.log({ data });
    const { user } = useSelector((state) => state.user);
    const [isHoSo, setIsHoSo] = useState(true);
    const [currentUpdate, setCurrentUpdate] = useState({
        isDisplay: false,
        data: {},
    });

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
                                <form action="">
                                    <div className=" flex lg:gap-4">
                                        <div className="div flex flex-col gap-2 lg:px-[16px] w-[100px]">
                                            <p className="h-12 flex items-center justify-end">
                                                Email
                                            </p>
                                            <p className="h-12 flex items-center justify-end">
                                                Tên
                                            </p>
                                            <p className="h-12 flex items-center justify-end w-full">
                                                Số điện thoại
                                            </p>
                                            <p className="h-12 flex items-center justify-end">
                                                Ngày sinh
                                            </p>
                                        </div>
                                        <div className="div flex flex-col gap-2 pl-[8px] lg:px-[16px]">
                                            <span className="h-12 flex items-center justify-start">
                                                {user?.email
                                                    ? user?.email
                                                    : "thanhnhsail.com"}
                                            </span>
                                            <input
                                                className="input input-bordered w-full max-w-xs"
                                                type="text"
                                                name="name"
                                                defaultValue={
                                                    user?.name
                                                        ? user?.name
                                                        : "thanh nha"
                                                }
                                            />
                                            <input
                                                className="input input-bordered w-full max-w-xs"
                                                type="text"
                                                name="phone"
                                                defaultValue={
                                                    user?.phone
                                                        ? user?.phone
                                                        : "0909093452"
                                                }
                                            />
                                            {/* format type date yyyy-mm-dd */}
                                            <input
                                                className="input input-bordered w-full max-w-xs"
                                                type="dates"
                                                name="ngaySinh"
                                                defaultValue={
                                                    user?.ngaySinh
                                                        ? user?.ngaySinh
                                                        : "1999-08-16"
                                                }
                                            />
                                            <button className="btn btn-outline btn-primary mt-[16px] ">
                                                Lưu
                                            </button>
                                        </div>
                                    </div>
                                </form>
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
