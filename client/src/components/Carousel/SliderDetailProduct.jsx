import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper";

const SliderDetailProduct = ({ data }) => {
  return (
    <div className="h-[400px] md:h-[500px]">
      <Swiper
        direction={"horizontal"}
        pagination={{
          clickable: true,
        }}
        modules={[Pagination]}
        className="mySwiper"
        breakpoints={{
          // when window width is >= 768px
          768: {
            direction: "vertical",
          },
        }}
      >
        {data.map((item) => (
          <SwiperSlide key={item.id} className="rounded">
              <img src={item.src} alt="" className="w-full rounded object-contain" />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default SliderDetailProduct;
