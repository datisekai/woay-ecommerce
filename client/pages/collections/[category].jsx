import React, { useState } from "react";
import MainLayout from "../../src/components/layouts/MainLayout";
import productApi from "../../src/services/ProductApi";
import CardProduct from "../../src/components/cards/CardProduct";
import PaginationAdmin from "../../src/components/paginations/PaginationAdmin";
import { useRouter } from "next/router";
import Breadcrumbs from "../../src/components/Breadcrumbs/Breadcrumbs";
import Meta from "../../src/components/Meta";
import { useSelector } from "react-redux";
import { BiChevronDown } from "react-icons/bi";

export default function Collection({ arrProduct }) {
    const { arrCategory } = useSelector((state) => state.category);
    console.log({ arrCategory });
    const router = useRouter();
    const handleChangeSort = (e) => {
        router.push({ query: { ...router.query, sort: e.target.value } });
    };
    return (
        <>
            <Meta
                title={`${
                    arrProduct.category?.name
                        ? arrProduct.category?.name
                        : "Tất cả sản phẩm"
                } | MISSOUT`}
                description=""
            />
            <MainLayout>
                <Breadcrumbs
                    nameCategory={arrProduct.category?.name}
                    danhMuc={"Danh Mục"}
                />
                <div className="md:max-w-[768px] lg:max-w-[1024px] w-full mx-auto px-[15px] mb-[60px]">
                    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4">
                        <div className="wrap-left hidden lg:block lg:grid-cols-1 ">
                            <ul className=" font-[500] text-[14px] mt-[30px]">
                                <div className="menu-navbar">
                                    <li className=" flex py-5">
                                        <span className="w-fill">Sản phẩm</span>
                                        <BiChevronDown className="text-xl" />
                                    </li>
                                    <ul
                                        tabIndex={0}
                                        className="menu-child-navbar z-10 fixed  shadow bg-base-100 rounded-sm uppercase font-bold w-28 gap-y-2 transition-all"
                                    >
                                        {arrCategory?.map((item, index) => (
                                            <div
                                                onClick={() =>
                                                    router.push(
                                                        `/collections/${item.slug}`
                                                    )
                                                }
                                                key={index}
                                            >
                                                <li className="first:pt-3 hover:text-primary border-b last:border-none hover:cursor-pointer pt-1 px-2 pb-2">
                                                    {item.name}
                                                </li>
                                            </div>
                                        ))}
                                    </ul>
                                </div>
                                <li className="cursor-pointer">
                                    <a
                                        onClick={() => {
                                            router.push({
                                                query: {
                                                    category: "all",
                                                },
                                            });
                                        }}
                                    >
                                        Tất cả sản phẩm
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <div className="wrap-right col-span-1 md:col-span-3">
                            <div className=" flex flex-col-reverse lg:flex-row gap-4   md:justify-center lg:justify-between lg:items-center mb-[30px]">
                                <h1 className="uppercase font-bold text-2xl text-center">
                                    {arrProduct.category?.name
                                        ? arrProduct.category.name
                                        : "Tất cả sản phẩm"}
                                </h1>

                                <select
                                    onChange={handleChangeSort}
                                    className="select select-bordered max-w-xs"
                                >
                                    <option>Sản phẩm nổi bật</option>
                                    <option value="name-asc">Tên:A-Z</option>
                                    <option value="name-desc">Tên:Z-A</option>
                                    <option value="createdAt-asc">
                                        Cũ nhất
                                    </option>
                                    <option value="createdAt-desc">
                                        Mới nhất
                                    </option>
                                </select>
                            </div>

                            {arrProduct.rows.length === 0 ? (
                                <span className="font-blod text-xl text-yellow-400">
                                    Không có sản phẩm nào. Với từ khóa
                                    {`"${arrProduct.category.name}"`}
                                </span>
                            ) : (
                                <div className="wrap_list mb-6 px-4 grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-4">
                                    {arrProduct.rows?.map((item, index) => {
                                        return (
                                            <CardProduct
                                                key={index}
                                                item={item}
                                            />
                                        );
                                    })}
                                </div>
                            )}
                            {arrProduct && (
                                <div className="mt-2">
                                    <PaginationAdmin
                                        to={
                                            arrProduct.rows.length > 0
                                                ? arrProduct.offset + 1
                                                : 0
                                        }
                                        from={
                                            arrProduct.offset +
                                            arrProduct.rows.length
                                        }
                                        count={arrProduct.count}
                                        pre={
                                            arrProduct.page > 1 &&
                                            arrProduct.page - 1
                                        }
                                        next={
                                            arrProduct.page * arrProduct.limit <
                                                arrProduct.count &&
                                            +arrProduct.page + 1
                                        }
                                    />
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </MainLayout>
        </>
    );
}

export const getServerSideProps = async ({ query }) => {
    const arrProduct = await productApi.queryProduct({ query });
    // call api lấy về mảng item prroduct
    return { props: { arrProduct } };
};
