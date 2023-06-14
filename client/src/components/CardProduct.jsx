import React from "react";

export default function CardProduct() {
    return (
        <div className=" mb-[30px]">
            <div
                className="product_img
                w-full
                relative   
                before:content-['-40%']
                before:absolute
                before:top-[10px]
                before:left-[10px]
                before:bg-[#ff0000]
                before:text-[12px]
                before:font-bold
                before:text-[#fff]
                before:px-[12px]
                before:h-[25px]
                before:flex
                before:items-center
                "
                //before làm discount => call api về bỏ thuộc tính discount vào casii className before:content để hiển thị phần dis count
            >
                <img
                    src="https://product.hstatic.net/200000195489/product/bia_milky-2_637516d9db464d9b959bc841c95747c9_master.jpg"
                    alt="áo"
                />
            </div>
            <div className="product-detail text-center py-[20px]">
                {/* Có api rồi cập lại href của tab a nhé nameProduct nữa nhé , giá luôn */}
                <h3 className="mb-[5px]">
                    <a
                        href="#"
                        className="text-[#5c5c5c] font-medium text-[14px]"
                    >
                        Name Product
                    </a>
                </h3>
                <div className="giá flex justify-center">
                    <p className="text-[#ff0000] font-bold text-[14px]">
                        209,000đ
                    </p>
                    <span
                        className="ml-[5px] text-[#939393] text-[13px] font-normal 
                    "
                    >
                        <del>350,000đ</del>
                    </span>
                </div>
            </div>
        </div>
    );
}
