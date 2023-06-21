import React from "react";
import { formatDate } from "../../utils/formatDate";
import { useRouter } from "next/router";

export default function CardPosts({ item }) {
    const roruter = useRouter();
    return (
        <div
            onClick={() => {
                roruter.push(`/post/${item.slug}`);
            }}
        >
            <article className="mb-[25px]  grid grid-cols-1  px-[15px]">
                <div className=" mb-[20px] lg:col-span-1 overflow-hidden h-[150px]">
                    <img
                        className="hover:scale-[120%] ease-in-out duration-500 transition-all
                            hover:ease-in-out hover:duration-500 hover:transition-all "
                        src={item.image}
                        alt="img_post"
                    />
                </div>
                <div className="post_title lg:col-span-3">
                    <h3
                        className="text-[#5c5c5c] text-[16px] uppercase font-medium ease-in-out duration-200 transition-all
                            hover:ease-in-out hover:duration-200 hover:transition-all hover:text-[#000000] line-clamp-2"
                    >
                        {item.title}
                    </h3>
                    <div className=" text-[#999] mb-[15px] text-[14px] font-medium">
                        {/* truyen tư api vào nhé */}

                        {/* truyền ngày đã viết nhé */}
                        <span>{formatDate(item.createdAt)}</span>
                    </div>
                    {/* Mô tả ngắn về bài post đó */}
                    <p className="leading-5 mb-[10px] text-[14px] font-medium line-clamp-3">
                        {item.description}
                    </p>
                </div>
            </article>
        </div>
    );
}
