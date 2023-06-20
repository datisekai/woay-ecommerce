import React, { useRef, useState } from "react";

const ModalChooseAddress = ({
  elementClick,
  data,
  handleChangeShipping,
  shippingInfo,
}) => {
  const [currentShipping, setCurrentShipping] = useState(shippingInfo);

  const labelRef = useRef(null);

  return (
    <>
      <label htmlFor="my_modal_6">{elementClick}</label>

      <input type="checkbox" id="my_modal_6" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box">
          <h1 className="pb-2 border-b text-lg font-bold">Địa chỉ của tôi</h1>
          <div className="space-y-2 mt-4 max-h-[350px] overflow-y-auto">
            {data?.map((item) => (
              <div key={item.id} className="flex justify-between py-2">
                <div className="flex gap-4">
                  <input
                    type="radio"
                    name="radio-3"
                    className="radio radio-secondary"
                    onChange={(e) => setCurrentShipping(item)}
                    checked={item.id === currentShipping.id}
                  />
                  <div>
                    <div className="flex gap-2">
                      <h5 className="text-neutral">{item.name}</h5>
                      <div className="divider divider-horizontal"></div>
                      <h5>{item.phone}</h5>
                    </div>
                    <p>{item.address}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between w-full">
            <label ref={labelRef} htmlFor="my_modal_6" className="btn">
              Đóng
            </label>

            <button
              onClick={() => {
                handleChangeShipping(currentShipping);
                labelRef.current.click()
              }}
              className="btn btn-primary"
            >
              Lưu
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ModalChooseAddress;
