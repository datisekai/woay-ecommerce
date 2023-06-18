import React from "react";
import MainLayout from "../../../src/components/layouts/MainLayout";
import Breadcrumbs from "../../../src/components/Breadcrumbs/Breadcrumbs";

export default function product() {
    const color = "red";
    return (
        <MainLayout>
            <Breadcrumbs nameCategory={"name"} />

            <div className="container mx-auto mt-[20px]">
                <div className="wrap grid grid-cols-2 ">
                    <div className="left">
                        <div className="img">
                            <img
                                src="https://product.hstatic.net/200000195489/product/cream_899a7716d0cf4eb99e09ba03f2dfdcb8_master.jpg"
                                alt="aos"
                            />
                        </div>
                        <div className="img">
                            <img
                                src="https://product.hstatic.net/200000195489/product/cream_899a7716d0cf4eb99e09ba03f2dfdcb8_master.jpg"
                                alt="aos"
                            />
                        </div>
                    </div>
                    <div className="right">
                        <div className="pb-[10px] border-b-[1px] border-[#dfe0e1] border-dotted">
                            <h1 className="text-3xl font-bold text-[#5c5c5c] mb-[5px]">
                                Name
                            </h1>
                            <span className="text-[#a3a5a7] text-[12px] ">
                                SKU: max
                            </span>
                        </div>
                        <div className="discount py-[10px] border-b-[1px] border-[#dfe0e1] border-dotted">
                            <span>21345đ</span>
                        </div>
                        <div className="color py-[10px] border-b-[1px] border-[#dfe0e1] border-dotted">
                            <p>color</p>
                            <div className="div">
                                <div
                                    className={`w-[30px] h-[30px] border-[1px] rounded-full relative before:absolute before:w-[80%] before:h-[80%] before:top-[50%] before:left-[50%] before:translate-x-[-50%] before:translate-y-[-50%] befoe:bg-${"dark"}
                                `}
                                ></div>
                            </div>
                        </div>
                        <div className="size py-[10px] border-b-[1px] border-[#dfe0e1] border-dotted">
                            arr size
                        </div>

                        <div className="border-[1px] rounded w-[100px] flex  mt-[10px] my-[25px]  ">
                            <button className="w-[25%] h-[24px] bg-slate-300 rounded hover:bg-slate-500">
                                -
                            </button>
                            <input
                                className="w-[50%] text-center"
                                type="text"
                                min={1}
                                defaultValue={1}
                            />
                            <button className="w-[25%] h-[24px] bg-slate-300 rounded hover:bg-slate-500">
                                +
                            </button>
                        </div>

                        <div className="flex gap-4">
                            <button className="w-full uppercase font-bold bg-[#000] text-[#fff] py-[14px] px-[15px] border-[1px] border-[#000] hover:bg-transparent hover:text-[#000] transition-all duration-75">
                                thêm giỏ hàng
                            </button>
                            <button className="w-full uppercase font-bold bg-[red] text-[#fff] py-[14px] px-[15px] border-[1px] border-[red] hover:bg-transparent hover:text-[#000] transition-all duration-75 ">
                                mua ngay
                            </button>
                        </div>
                        <div className="mota">
                            <p>Mô tả</p>
                            <p>Thông tin sản phẩm</p>
                        </div>
                    </div>
                </div>
                <div className="sanPhamLienQuan">
                    <h1 className="text-center font-bold text-3xl my-[60px] py-[15px] relative before:absolute before:bottom-0 before:left-[50%] before:translate-x-[-50%] before:w-[65px] before:h-[1px] before:bg-[#000]">
                        Sản phẩm liên quan
                    </h1>
                </div>
            </div>
        </MainLayout>
    );
}
