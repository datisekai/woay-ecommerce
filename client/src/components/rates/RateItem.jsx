import React from "react";
import ReactStars from "react-rating-stars-component";
import dayjs from "dayjs";
import { CiEdit } from "react-icons/ci";
import { AiOutlineDelete } from "react-icons/ai";
import { useSelector } from "react-redux";

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
  userId
}) => {

    const {user} = useSelector(state => state.user)

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
          <ReactStars
            count={5}
            size={20}
            edit={false}
            activeColor="#EE4D2D"
            value={star}
          />
          <p>{dayjs(createdAt).format("DD/MM/YYYY HH:mm")}</p>
          <h4 className="font-bold">{title}</h4>
          <p>{description}</p>
          <div className="flex flex-wrap gap-2">
            {RateImages.map((item) => (
              <div className="w-[70px]" key={item.id}>
                <img src={item.src} alt={title} className="rounded" />
              </div>
            ))}
          </div>
        </div>
      </div>
      {user && user.id === userId &&  <div className="flex gap-2 ">
        <button
          onClick={handleUpdate}
          className="btn btn-circle btn-warning"
        >
          <CiEdit className="text-2xl" />
        </button>
        <button
          onClick={handleDelete}
          className="btn btn-circle btn-error"
        >
          <AiOutlineDelete className="text-xl" />
        </button>
      </div>}
    </div>
  );
};

export default RateItem;
