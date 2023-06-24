import React, { useCallback, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper";
import ImageViewer from "react-simple-image-viewer";

const SliderDetailProduct = ({ data }) => {
  const [currentImage, setCurrentImage] = useState(0);
  const [isViewerOpen, setIsViewerOpen] = useState(false);
  const images = data.map((item) => item.src);

  const openImageViewer = useCallback((index) => {
    setCurrentImage(index);
    setIsViewerOpen(true);
  }, []);

  const closeImageViewer = () => {
    setCurrentImage(0);
    setIsViewerOpen(false);
  };
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
        {data.map((item, index) => (
          <SwiperSlide key={item.id} className="rounded">
            <img
              src={item.src}
              alt=""
              onClick={() => openImageViewer(index)}
              className="w-full rounded object-contain"
            />
          </SwiperSlide>
        ))}
      </Swiper>
      {isViewerOpen && (
        <div className="z-[10000]">
          <ImageViewer
            src={images}
            currentIndex={currentImage}
            disableScroll={false}
            closeOnClickOutside={true}
            onClose={closeImageViewer}
          />
        </div>
      )}
    </div>
  );
};

export default SliderDetailProduct;
