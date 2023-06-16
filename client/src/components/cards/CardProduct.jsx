import React, { useEffect, useState } from "react";

export default function CardProduct({ item }) {
    console.log({ item });
    const [currentImg, setCurrentImg] = useState(item.ProductImages[0].src);

    const handleMouseEnter = () => {
        setCurrentImg(item.ProductImages[1].src);
    };

    const handleMouseLeave = () => {
        setCurrentImg(item.ProductImages[0].src);
    };
    // trong có item này thì có arr variants
    // sort arr variants
    item.variants.sort((item) => item.price);
    console.log("item Sorted: ", item);

    return (
        <div className=" mb-[30px]">
            <div
                className="product_img
                hover:animate-pulse
                w-full"
                //before làm discount => call api về bỏ thuộc tính discount vào casii className before:content để hiển thị phần dis count
            >
                <img
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
                        href="#"
                        className="text-[#5c5c5c] font-medium text-[14px] ease-in-out duration-200 transition-all
                        hover:ease-in-out hover:duration-200 hover:transition-all hover:text-[#000000]"
                    >
                        {item.name}
                    </a>
                </h3>
                <div className="giá flex justify-center">
                    <p className="text-[#ff0000] font-bold text-[14px]">
                        {item.variants[0].price} -
                        {item.variants[item.variants.length - 1].price}
                    </p>
                </div>
            </div>
        </div>
    );
}
