import React, { useCallback, useState } from "react";
import ReactStars from "react-rating-stars-component";
import dayjs from "dayjs";
import { CiEdit } from "react-icons/ci";
import { AiOutlineDelete } from "react-icons/ai";
import { useSelector } from "react-redux";
import ImageViewer from "react-simple-image-viewer";
import RateStar from "./RateStar";
import { BiDotsVerticalRounded } from "react-icons/bi";

const RateItem = ({
  User,
  RateImages,
  id,
  description,
  title,
  createdAt,
  star,
  handleUpdate,
  handleDelete,
  userId,
}) => {
  const { user } = useSelector((state) => state.user);
  const [currentImage, setCurrentImage] = useState(0);
  const [isViewerOpen, setIsViewerOpen] = useState(false);
  const images = RateImages.map((item) => item.src);

  const openImageViewer = useCallback((index) => {
    setCurrentImage(index);
    setIsViewerOpen(true);
  }, []);

  const closeImageViewer = () => {
    setCurrentImage(0);
    setIsViewerOpen(false);
  };

  return (
    <div className="flex justify-between bg-base-100 p-4 rounded">
      <div className="flex gap-4 ">
        <div className="w-[50px] aspect-[1/1]">
          <img
            src={`https://ui-avatars.com/api/?background=0D8ABC&color=fff&name=${
              User?.name || User?.email
            }`}
            className="w-full rounded-full"
            alt=""
          />
        </div>
        <div className="space-y-1">
          <p>{User.email}</p>
          <RateStar star={Math.floor(star)} size="text-sm" />
          <p>{dayjs(createdAt).format("DD/MM/YYYY HH:mm")}</p>
          <h4 className="font-bold">{title}</h4>
          <p>{description}</p>
          <div className="flex flex-wrap gap-2">
            {RateImages.map((item, index) => (
              <div className="w-[70px]" key={item.id}>
                <img
                  src={item.src}
                  alt={title}
                  onClick={() => openImageViewer(index)}
                  className="rounded"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
      {user && user.id === userId && (
        <div className="dropdown dropdown-end">
          <label tabIndex={0} className="">
           <BiDotsVerticalRounded className="text-xl md:text-2xl"/>
          </label>
          <ul
            tabIndex={0}
            className="dropdown-content  menu p-2 shadow bg-base-100 rounded-box "
          >
        
              <li onClick={handleUpdate}><a>Chỉnh sửa</a></li>
              <li onClick={handleDelete}><a>Xóa</a></li>
           
          </ul>
        </div>
      )}
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

export default RateItem;
