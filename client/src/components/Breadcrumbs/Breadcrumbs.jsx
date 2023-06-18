import React from "react";

export default function Breadcrumbs({ nameCategory }) {
    return (
        <div
            className=" bre
            w-full
            relative before:content-['']
            before:absolute
            before:bottom-0
            before:left-0
            before:w-full
            before:h-[1px]
            before:bg-[#e5e7eb]
            mb-[20px]"
        >
            <div className="container mx-auto">
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
                        <li>
                            <a
                                onClick={() => {
                                    router.push({
                                        query: {
                                            category: "all",
                                        },
                                    });
                                }}
                            >
                                Danh mục
                            </a>
                        </li>
                        <li className="uppercase">
                            {nameCategory ? nameCategory : "Tất cả sản phẩm"}
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}
