import { useRouter } from "next/router";
import React, { useState } from "react";
import { maxMinPrice } from "../../utils/maxMinPrice";

export default function CardProduct({ item }) {
    const [currentImg, setCurrentImg] = useState(item.ProductImages[0].src);
    const router = useRouter();
    const handleMouseEnter = () => {
        if (item.ProductImages.length !== 1)
            setCurrentImg(item.ProductImages[1].src);
    };

    const handleMouseLeave = () => {
        setCurrentImg(item.ProductImages[0].src);
    };
    // trong có item này thì có arr variants
    // sort arr variants
    const maxMin = maxMinPrice(item.variants);
    return (
        <div
            className=" mb-[30px] cursor-pointer border-solod border-[1px] border-transparent hover:border-black"
            onClick={() => router.push(`/product/${item.slug}`)}
        >
            <div className="overflow-hidden w-full aspect-square ">
                <img
                    className="h-full w-full object-contain"
                    src={currentImg}
                    alt="áo"
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                />
            </div>
            <div className="product-detail text-center py-[20px]">
                {/* Có api rồi cập lại href của tab a nhé nameProduct nữa nhé , giá luôn */}
                <h3 className="mb-[5px]">
                    <a
                        className="font-medium text-[14px] ease-in-out duration-200 transition-all
                        hover:ease-in-out hover:duration-200 hover:transition-all hover:text-primary"
                    >
                        {item.name}
                    </a>
                </h3>
                <div className="giá flex justify-center">
                    <p className="text-[#ff0000] font-bold text-[14px]">
                        {maxMin[0] === maxMin[1]
                            ? `${maxMin[0].toLocaleString("en-US")}đ`
                            : `${maxMin[0].toLocaleString("en-US")}đ -
                              ${maxMin[1].toLocaleString("en-US")}đ`}
                    </p>
                </div>
            </div>
        </div>
    );
}
