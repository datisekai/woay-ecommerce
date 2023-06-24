import React, { useMemo, useState } from "react";
import ReactStars from "react-rating-stars-component";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import RateApi from "../../services/RateApi";
import { useSelector } from "react-redux";
import ModalAddRate from "../modals/ModalAddRate";
import Link from "next/link";
import RateItem from "./RateItem";
import { BiChevronDown, BiChevronUp } from "react-icons/bi";
import ModalUpdateRate from "../modals/ModalUpdateRate";
import swal from "sweetalert";
import { toast } from "react-hot-toast";
import RateStar from "./RateStar";

const Rate = ({ productId }) => {
  const { data } = useQuery(["rate", productId], () =>
    RateApi.getAllByProductId(productId)
  );

  const limitComment = 2;

  const queryClient = useQueryClient();

  const { user } = useSelector((state) => state.user);
  const [endComment, setEndComment] = useState(limitComment);
  const [currentUpdate, setCurrentUpdate] = useState({
    isDisplay: false,
    data: {},
  });

  const { mutate } = useMutation(RateApi.delete, {
    onSuccess: (res, variables) => {
      queryClient.setQueryData(
        ["rate", productId],
        data.filter((item) => item.id !== variables)
      );
      toast.success("Xóa đánh giá thành công");
    },
    onError: (error) => {
      console.log(error);
      error && error.message && toast.error(error.message);
    },
  });

  const averageStar = useMemo(() => {
    let result = 0;
    if (data) {
      let sumStar = data.reduce((pre, cur) => pre + cur.star, 0);
      result = data.length > 0 ? (sumStar / data.length).toFixed(1) : 0;
    }
    return result;
  }, [data]);

  const commentsRender = useMemo(() => {
    if (data && data.length > 2) {
      return data.slice(0, endComment);
    }
    return data;
  }, [data, endComment]);

  const handleDelete = (id) => {
    swal({
      title: "Are you sure?",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        mutate(id);
      }
    });
  };

  return (
    <div className="mt-10 p-4 bg-base-200 rounded space-y-4">
      <div className="flex items-center justify-between flex-col md:flex-row">
        <h2 className="uppercase text-lg md:text-xl font-bold">
          Đánh giá sản phẩm
        </h2>
        <div className="flex items-center gap-2">
          {averageStar !== 0 ? (
            <h2 className="text-3xl text-[#EE4D2D]">{averageStar}/5</h2>
          ) : (
            <p className="text-lg md:text-xl text-[#EE4D2D]">
              Chưa có đánh giá
            </p>
          )}
          {data && <RateStar star={Math.floor(averageStar)} />}
        </div>
      </div>
      <div className="">
        {user ? (
          <ModalAddRate
            productId={productId}
            elementClick={<div className="btn btn-primary">Viết đánh giá</div>}
          />
        ) : (
          <p>
            Vui lòng{" "}
            <Link href={"/login"}>
              <span className="link link-hover font-bold">đăng nhập</span>
            </Link>{" "}
            để đánh giá
          </p>
        )}
        {commentsRender?.length > 0 && (
          <div className="space-y-4 mt-8">
            {commentsRender?.map((item) => (
              <RateItem
                handleDelete={() => handleDelete(item.id)}
                handleUpdate={() =>
                  setCurrentUpdate({ isDisplay: true, data: item })
                }
                key={item.id}
                {...item}
              />
            ))}
          </div>
        )}
        {data && data.length > endComment && (
          <div
            onClick={() => setEndComment(endComment + limitComment)}
            className="btn mt-4"
          >
            Xem thêm
            <BiChevronDown />
          </div>
        )}
        {data && data.length > 0 && commentsRender.length < limitComment && (
          <div onClick={() => setEndComment(limitComment)} className="btn mt-4">
            Thu gọn
            <BiChevronUp />
          </div>
        )}
        <ModalUpdateRate
          productId={productId}
          data={currentUpdate}
          handleHidden={() => setCurrentUpdate({ isDisplay: false, data: {} })}
        />
      </div>
    </div>
  );
};

export default Rate;
