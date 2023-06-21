import React from "react";
import { AiFillFacebook } from "react-icons/ai";
import { FaShare } from "react-icons/fa";

export default function Footer() {
    return (
        <footer>
            <div className="md:max-w-[768px] lg:max-w-[1024px] mx-auto px-[15px]">
                <div
                    className="hidden
                            md:flex md:flex-wrap md:justify-start md:block
                           
                            flex w-full justify-around mb-[24px]"
                >
                    <div className="md:w-[375px] lg:w-[25%] w-[295px] px-[15px]">
                        <h4 className="text-base font-medium mb-[20px]">
                            GIỚI THIỆU
                        </h4>
                        <div className="w-32">
                            <img src="/img/missout_logo.png" alt="img_logo" />
                        </div>
                    </div>
                    <div className="md:w-[375px] xl:w-[325px] px-[15px]">
                        <h4 className="text-base font-medium mb-[20px]">
                            THÔNG TIN LIÊN HỆ
                        </h4>
                        <ul className="pl-[15px]">
                            <li className="text-sm font-medium  leading-7">
                                <span className="relative  before:content-[''] before:absolute before:w-[7px] before:h-[1px] before:bg-[#323232] before:top-[50%] before:translate-y-[-50%] before:left-[-18px]">
                                    Địa chỉ
                                </span>
                                : CN1: The New Playground, 90 Lê Lai, Q.1. CN2:
                                The New Playground, 26 Lý Tự Trọng, Q.1.
                            </li>
                            <li className="text-sm font-medium relative before:content-['']  before:absolute  before:w-[7px]  before:h-[1px]  before:bg-[#323232] before:top-[50%] before:translate-y-[-50%] before:left-[-18px] leading-7">
                                Điện thoại:0772011702
                            </li>
                            <li className="text-sm font-medium relativembefore:content-['']  before:absolute before:w-[7px] before:h-[1px] before:bg-[#323232] before:top-[50%] before:translate-y-[-50%] before:left-[-18px] leading-7">
                                Mail: missoutclo.social@gmail.com
                            </li>
                        </ul>
                    </div>
                    <div className="w-[325px] px-[15px]  ">
                        <h4 className="text-base font-medium mb-[20px]">
                            FANPAGE
                        </h4>
                        <div className="relative ">
                            <div className="w-[295px] h-[130px]">
                                <img
                                    className="h-full relative before:content-['hello'] before:absolute"
                                    src="/img/bgConTho_n.jpg"
                                    alt="logo"
                                />
                            </div>
                            <div className="border-solid border-white border-2 w-[50px] h-[50px] absolute top-[8px] left-[8px]">
                                <img src="/img/conTho_n.jpg" alt="logo-fb" />
                            </div>
                            <div className="absolute z-0 top-0 left-[62px]">
                                <a
                                    className="text-lg font-medium text-[#fff] shadow-[#50d71e]"
                                    href="https://www.facebook.com/missoutclo/?ref=embed_page"
                                >
                                    MISSOUT
                                </a>
                                <p className="text-xs text-[#fff]">
                                    517.639 lượt thích
                                </p>
                            </div>
                            {/* button thích trang  */}
                            <a
                                href="/img/conTho_n.jpg"
                                className="flex items-center bg-[#f5f6f7] rounded-[2px] w-[102px] h-[24px] px-[8px] absolute bottom-[8px] left-[8px]"
                            >
                                <AiFillFacebook className="text-[#375798] text-[18px]" />
                                <span className="text-[#4b4f56] font-bold text-[12px]">
                                    Thích Trang
                                </span>
                            </a>
                            {/* Button chia sẽ */}
                            <a
                                href="https://www.facebook.com/sharer/sharer.php?app_id=776730922422337&u=https%3A%2F%2Fwww.facebook.com%2Fmissoutclo%2F&display=popup&ref=embed_page&src=page"
                                className="w-[73px] h-[24px] rounded-[2px] flex items-center absolute bottom-[8px] right-[8px] bg-[#f5f6f7] px-[8px] border-[1px] border-solid border-[#0000001f] "
                            >
                                <FaShare className="text-[12px] text-[#4b4f56] mr-[4px]" />
                                <p className="text-[11px] font-bold">Chia sẽ</p>
                            </a>
                        </div>
                    </div>
                </div>
                <div className="border-t-[1px] border-[#e0d9d6] border-dashed w-full">
                    <p className="text-[#5c5c5c] text-center py-[24px]">
                        Copyright © 2023 MISSOUT. Powered by Haravan
                    </p>
                </div>
            </div>
        </footer>
    );
}
