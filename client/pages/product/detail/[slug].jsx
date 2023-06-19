import React, { useEffect, useState } from "react";
import MainLayout from "../../../src/components/layouts/MainLayout";
import Breadcrumbs from "../../../src/components/Breadcrumbs/Breadcrumbs";
import productApi from "../../../src/services/ProductApi";
import { maxMinPrice } from "../../../src/utils/maxMinPrice";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../../../src/redux/slices/UserSlice";
import AuthApi from "../../../src/services/AuthApi";
import CardProduct from "../../../src/components/cards/CardProduct";

export default function product({ itemProduct }) {
    console.log({ itemProduct });
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.user);
    const getUser = async () => {
        let res = await AuthApi.getMyInfo();
        dispatch(setUser(res));
    };
    useEffect(() => {
        getUser;
    }, []);
    const [activeSize, setActiveSize] = useState(false);
    const maxMin = maxMinPrice(itemProduct.variants);
    const { ProductImages, colors, sizes, productRecommends } = itemProduct;
    const handleChaneSize = () => {
        setActiveSize(!activeSize);
    };
    return (
        <MainLayout>
            <Breadcrumbs nameCategory={"name"} />

            <div className="container mx-auto mt-[20px] px-[15px]">
                <div className="wrap grid grid-cols-1 lg:grid-cols-2 ">
                    <div className="left">
                        {/* Render các img của product */}
                        {ProductImages.map((item, index) => {
                            return (
                                <div className="img" key={index}>
                                    <img src={item.src} alt="aos" />
                                </div>
                            );
                        })}
                    </div>
                    <div className="right">
                        <div className="pb-[10px] border-b-[1px] border-[#dfe0e1] border-dotted">
                            <h1 className="text-xl font-bold text-[#5c5c5c] mb-[5px]md:text-3xl">
                                {itemProduct.name}
                            </h1>
                        </div>
                        <div className="py-[10px] border-b-[1px] border-[#dfe0e1] border-dotted">
                            <span className="text-[#ff0000] font-bold text-lg">
                                {maxMin[0] === maxMin[1]
                                    ? `${maxMin[0].toLocaleString("en-US")}đ`
                                    : `${maxMin[0].toLocaleString("en-US")}đ -
                              ${maxMin[1].toLocaleString("en-US")}đ`}
                            </span>
                        </div>
                        <div className="color py-[10px] border-b-[1px] border-[#dfe0e1] border-dotted">
                            <div className="div flex gap-4">
                                {colors.map((item, index) => {
                                    return (
                                        <p
                                            key={index}
                                            className="styleColor w-[30px] h-[30px] rounded-full "
                                            style={{
                                                background: item.name,
                                            }}
                                        ></p>
                                    );
                                })}
                            </div>
                        </div>
                        <div className=" py-[10px] border-b-[1px] border-[#dfe0e1] border-dotted flex gap-4">
                            {sizes.map((item, index) => {
                                return (
                                    <p
                                        key={index}
                                        className={
                                            !activeSize
                                                ? "w-[40px] h-[40px] flex justify-center  cursor-pointer items-center text-xs font-bold border-[1px] border-[#000] text-[#000]"
                                                : "w-[40px] h-[40px] flex justify-center items-center text-xs font-bold border-[1px] border-[#000] text-[#fff] bg-[#000] cursor-pointer"
                                        }
                                        onClick={handleChaneSize}
                                    >
                                        {item.name}
                                    </p>
                                );
                            })}
                        </div>

                        <div className="flex  mt-[10px] my-[25px]">
                            <button className="w-[32px] h-[32px] bg-[#f3f4f4] opacity-80 rounded hover:opacity-100 ">
                                -
                            </button>
                            <input
                                className="w-[70px] text-center border-y-[1px]"
                                type="text"
                                min={1}
                                defaultValue={1}
                            />
                            <button className="w-[32px] h-[32px] bg-[#f3f4f4] opacity-80 rounded hover:opacity-100">
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
                        <div className="mota mt-[20px]">
                            <p className="font-bold underline py-[16px]">
                                Mô tả
                            </p>
                            <p className="text-[14px]">
                                {itemProduct?.description}
                            </p>
                        </div>
                    </div>
                </div>
                {/* ĐÁNH GIÁ SẢN PHẨM */}
                <div className="danhGiaSanPham mt-[50px]">
                    <h2 className="uppercase">ĐÁNH GIÁ SẢN PHẨM</h2>
                    <div>
                        <div>
                            5.0 trên 5
                            <div className="rating">
                                <input
                                    type="radio"
                                    name="rating-2"
                                    className="mask mask-star-2 bg-orange-400"
                                />
                                <input
                                    type="radio"
                                    name="rating-2"
                                    className="mask mask-star-2 bg-orange-400"
                                />
                                <input
                                    type="radio"
                                    name="rating-2"
                                    className="mask mask-star-2 bg-orange-400"
                                />
                                <input
                                    type="radio"
                                    name="rating-2"
                                    className="mask mask-star-2 bg-orange-400"
                                    defaultChecked
                                />
                                <input
                                    type="radio"
                                    name="rating-2"
                                    className="mask mask-star-2 bg-orange-400"
                                />
                            </div>
                        </div>
                        <div className=" flex gap-4">
                            <div className="w-12 h-12 ">
                                <img
                                    src={`https://ui-avatars.com/api/?background=0D8ABC&color=fff&name=${
                                        user?.name ? user?.name : user?.email
                                    }`}
                                    className="rounded-full"
                                    alt="avatar"
                                />
                            </div>
                            <div className="">
                                <h3>Name user</h3>
                                <div className="">
                                    <div className="rating">
                                        <input
                                            type="radio"
                                            name="rating-2"
                                            className="mask mask-star-2 bg-orange-400"
                                        />
                                        <input
                                            type="radio"
                                            name="rating-2"
                                            className="mask mask-star-2 bg-orange-400"
                                        />
                                        <input
                                            type="radio"
                                            name="rating-2"
                                            className="mask mask-star-2 bg-orange-400"
                                        />
                                        <input
                                            type="radio"
                                            name="rating-2"
                                            className="mask mask-star-2 bg-orange-400"
                                            defaultChecked
                                        />
                                        <input
                                            type="radio"
                                            name="rating-2"
                                            className="mask mask-star-2 bg-orange-400"
                                        />
                                    </div>
                                </div>
                                <p>thời gián | phân loại hàng hóa</p>
                                <p>discription</p>
                                <div>arr img nếu có</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="sanPhamLienQuan">
                    <h1 className="text-center font-bold text-3xl my-[60px] py-[15px] relative before:absolute before:bottom-0 before:left-[50%] before:translate-x-[-50%] before:w-[65px] before:h-[1px] before:bg-[#000]">
                        Sản phẩm liên quan
                    </h1>
                    <div className=" mb-6 px-4 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-3">
                        {productRecommends.map((item, index) => {
                            return <CardProduct key={index} item={item} />;
                        })}
                    </div>
                </div>
            </div>
        </MainLayout>
    );
}

export const getServerSideProps = async ({ query }) => {
    const itemProduct = await productApi.getProductByslug({ query });
    return { props: { itemProduct } };
};
