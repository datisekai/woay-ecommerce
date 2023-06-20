import React from "react";
import { useRouter } from "next/router";

export default function Breadcrumbs({ nameCategory, danhMuc }) {
    const router = useRouter();
    return (
        <div
            className="
            w-full
            relative before:content-['']
            before:absolute
            before:bottom-0
            before:left-0
            before:w-full
            before:h-[1px]
            before:bg-[#e5e7eb]
            "
        >
            <div className="md:max-w-[768px] lg:max-w-[1024px] mx-auto px-[15px] mb-[15px] md:mb-[30px]">
                <div className=" text-sm breadcrumbs">
                    <ul>
                        <li>
                            <a
                                onClick={() => {
                                    router.push("/");
                                }}
                            >
                                Trang chủ
                            </a>
                        </li>
                        {danhMuc ? (
                            <li>
                                <a
                                    onClick={() => {
                                        router.push("/collections/all");
                                    }}
                                >
                                    {danhMuc}
                                </a>
                            </li>
                        ) : null}
                        <li className="uppercase">
                            {nameCategory ? nameCategory : "Tất cả sản phẩm"}
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}
