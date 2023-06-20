import { useMutation, useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { FaPlus } from "react-icons/fa";
import AuthApi from "../../services/AuthApi";
import DiaChi from "../DiaChi/DiaChi";
import ModalAddUserInfo from "../modals/ModalAddUserInfo";
import InfoApi from "../../services/InfoApi";
import ModalUpdateProfile from "../modals/ModalUpdateProfile";
import { toast } from "react-hot-toast";
import swal from "sweetalert";

const Address = () => {
  const { data, isLoading } = useQuery(["userInfo"], InfoApi.getAll);
  const [currentUpdate, setCurrentUpdate] = useState({
    isDisplay: false,
    data: {},
  });

  const { mutate, isLoading: isLoadingDefault } = useMutation(
    InfoApi.setDefault,
    {
      onSuccess: (response, variables) => {
        queryClient.setQueryData(
          ["userInfo"],
          data.map((item) =>
            item.id === variables
              ? { ...item, isDefault: true }
              : { ...item, isDefault: false }
          )
        );

        toast.success("Thiết lập thành công");

        //Tắt modal
        handleHidden();

        //Reset form
        formikRef.current.resetForm();
      },
      onError: (error) => {
        console.log(error);
        error && error.message && toast.error(error.message);
      },
    }
  );

  const handleSetDefault = (id) => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this imaginary file!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        mutate(id);
      }
    });
  };

  console.log(data);
  return (
    <div>
      <div
        className="pb-[20px] flex flex-col lg:flex-row gap-4 justify-between items-center relative before:content-[''] before:absolute before:w-[95%] before:h-[1px] before:bottom-0 before:left-[50%] before:translate-x-[-50%] before:bg-black
                "
      >
        <h1 className="uppercase font-bold text-xl">Địa chỉ của Tôi</h1>

        <ModalAddUserInfo
          elementClick={
            <div className="btn btn-primary">
              <FaPlus /> Thêm địa chỉ mới
            </div>
          }
        />
      </div>
      <div
        className="
                    pt-[24px]"
      >
        <div className="list_DiaChi my-[24px] space-y-2">
          {data?.map((item, index) => {
            return (
              <DiaChi
                handleSetDefault={handleSetDefault}
                isLoadingDefault={isLoadingDefault}
                handleUpdate={() =>
                  setCurrentUpdate({ isDisplay: true, data: item })
                }
                key={index}
                item={item}
              />
            );
          })}
        </div>
      </div>
      <ModalUpdateProfile
        handleHidden={() => setCurrentUpdate({ isDisplay: false, data: {} })}
        data={currentUpdate}
      />
    </div>
  );
};

export default Address;
