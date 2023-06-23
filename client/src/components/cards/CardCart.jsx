import React from "react";
import { AiOutlineDelete } from "react-icons/ai";

const CardCart = ({
  Product,
  price,
  quantityStore,
  Color,
  Size,
  quantity,
  handleChangeQuantity,
  id,
  handleDeleteProductCart,
}) => {
  return (
    <div className="flex md:items-center flex-col md:flex-row">
      <div className="flex gap-2 items-center w-full md:w-[40%]">
        <img
          src={Product.ProductImages[0].src}
          alt=""
          className="w-[100px] rounded"
        />
        <div className="">
          <h4 className="uppercase font-bold ">{Product.name}</h4>
          <p className="uppercase">
            {Size.name} / {Color.name}
          </p>
        </div>
      </div>
      <div className="flex items-center justify-between w-full md:w-[60%]">
        <div className="flex ">
          <button
            onClick={() =>
              quantity > 1 && handleChangeQuantity(id, quantity - 1)
            }
            className="w-[32px] h-[32px] bg-gray-400 text-white opacity-80 rounded-l hover:opacity-100 "
          >
            -
          </button>
          <input
            className="w-[50px] outline-none text-center border-y-[1px]"
            type="number"
            value={quantity}
            onChange={(e) => {
              const newQuantity = +e.target.value;
              if (newQuantity > 0 && newQuantity <= quantityStore) {
                handleChangeQuantity(id, newQuantity);
              }
            }}
          />
          <button
            onClick={() =>
              quantity < quantityStore && handleChangeQuantity(id, quantity + 1)
            }
            className="w-[32px] h-[32px] bg-gray-400 text-white opacity-80 rounded-r hover:opacity-100"
          >
            +
          </button>
        </div>
        <div className="font-bold">{price.toLocaleString("en-US")}đ</div>
        <div className="flex flex-col items-center">
          <h5>Thành tiền</h5>
          <p className="text-secondary font-bold">
            {(quantity * price).toLocaleString("en-US")}đ
          </p>
          <AiOutlineDelete
            onClick={() => handleDeleteProductCart(id)}
            className="text-xl cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
};

export default CardCart;
