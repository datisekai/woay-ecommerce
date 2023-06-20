import React from "react";
import ReactStars from "react-rating-stars-component";
import {useQuery} from '@tanstack/react-query'
import RateApi from "../../services/RateApi";
import { useSelector } from "react-redux";
import ModalAddRate from "../modals/ModalAddRate";
import Link from "next/link";

const Rate = ({productId}) => {

    const {data, isLoading} = useQuery(['rate', productId], () => RateApi.getAllByProductId(productId))

    const {user} = useSelector(state => state.user);

    console.log(data)

  return (
    <div className="mt-10 p-4 bg-base-200 rounded space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="uppercase text-lg md:text-xl font-bold">
          Đánh giá sản phẩm
        </h2>
        <div className="flex items-center gap-2">
          <h2 className="text-3xl text-[#EE4D2D]">4.6/5</h2>
          <ReactStars count={5} size={36} edit={false} activeColor="#EE4D2D" value={4.6} />,
        </div>
      </div>
      <div className="">
           {user ? <ModalAddRate productId={productId} elementClick={ <div className="btn btn-primary">Viết đánh giá</div>}/> : <p>Vui lòng <Link href={'/login'}><span className="link link-hover font-bold">đăng nhập</span></Link> để đánh giá</p>}
            <div className=''>
                <div className="flex gap-4">
                    <div className="rounded-full w-[80px] aspect-[1/1]">
                        <img src="" alt="" className="w-full"/>
                    </div>
                </div>
            </div>
      </div>
    </div>
  );
};

export default Rate;
