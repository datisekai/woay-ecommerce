import React from "react";

export default function DiaChi() {
    return (
        <section className="py-[24px] flex justify-between  relative before:content-[''] before:absolute before:w-[95%] before:h-[1px] before:bottom-0 before:left-[50%] before:translate-x-[-50%] before:bg-black">
            <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between">
                    <h2 className="font-[500] mr-[8px]">Name</h2>
                    <span className="px-[8px] border-l-[1px]">0909345434</span>
                </div>
                <p>địa chỉ</p>
                <div className="btn-success btn">Mặc định</div>
            </div>

            <div className="flex flex-col gap-4">
                <button className="btn btn-outline">Cập nhật</button>
                <button className="btn ">Thiết lập mặc định</button>
            </div>
        </section>
    );
}
