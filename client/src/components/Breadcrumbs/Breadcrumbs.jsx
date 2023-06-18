import React from "react";

export default function Breadcrumbs({ nameCategory }) {
    return (
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
    );
}
