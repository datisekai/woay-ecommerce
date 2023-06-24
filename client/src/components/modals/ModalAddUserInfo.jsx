import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ErrorMessage, Field, Formik } from "formik";
import React, { useRef } from "react";
import { toast } from "react-hot-toast";
import * as Yup from "yup";
import InfoApi from "../../services/InfoApi";

const ModalAddUserInfo = ({ elementClick }) => {
  const checkRef = useRef(null);

  const queryClient = useQueryClient();

  const formikRef = useRef(null);

  const { mutate, isLoading } = useMutation(InfoApi.add, {
    onSuccess: (data, variables) => {
      const oldUserInfo = queryClient.getQueryData(["userInfo"]);
      queryClient.setQueryData(["userInfo"], [data.data, ...oldUserInfo]);
      toast.success("Tạo địa chỉ thành công");

      //Tắt modal
      checkRef.current.click();

      //Reset form
      formikRef.current.resetForm();
    },
    onError: (error) => {
      console.log(error);
      error && error.message && toast.error(error.message);
    },
  });

  const initialValues = {
    name: "",
    address: "",
    phone: "",
  };

  const validationSchema = Yup.object({
    name: Yup.string().required(),
    address: Yup.string().required(),
    phone: Yup.string().matches(
      /\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/,
      "Phone invalid format"
    ),
  });

  const handleSubmit = (values, { setSubmitting }) => {
    mutate(values);
  };
  return (
    <>
      <label htmlFor="my_modal_addaddress">{elementClick}</label>

      <input type="checkbox" id="my_modal_addaddress" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box">
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
            innerRef={formikRef}
          >
            {({ handleSubmit }) => (
              <form onSubmit={handleSubmit}>
                <h3 className="font-bold text-lg">Tạo danh mục</h3>
                <div className="mt-4 space-y-2">
                  <div>
                    <label htmlFor="" className="block">
                      Họ và tên
                    </label>
                    <Field
                      name="name"
                      type="text"
                      placeholder="Nhập họ và tên..."
                      className="input input-bordered w-full mt-1"
                    />
                    <ErrorMessage
                      name="name"
                      component="div"
                      className="text-error"
                    />
                  </div>

                  <div>
                    <label htmlFor="" className="block">
                      Số điện thoại
                    </label>
                    <Field
                      name="phone"
                      type="text"
                      placeholder="Nhập số điện thoại.."
                      className="input input-bordered w-full mt-1"
                    />
                    <ErrorMessage
                      name="phone"
                      component="div"
                      className="text-error"
                    />
                  </div>
                  <div>
                    <label htmlFor="" className="block">
                      Địa chỉ
                    </label>
                    <Field
                      name="address"
                      type="text"
                      placeholder="Nhập địa chỉ.."
                      className="input input-bordered w-full mt-1"
                    />
                    <ErrorMessage
                      name="address"
                      component="div"
                      className="text-error"
                    />
                  </div>
                </div>
                <div className="modal-action">
                  {/* if there is a button in form, it will close the modal */}

                  <div className="flex items-center justify-between w-full">
                    <label htmlFor="my_modal_addaddress" ref={checkRef} className="btn">
                      Đóng
                    </label>
                    {isLoading ? (
                      <div className="btn">
                        <span className="loading loading-spinner"></span>
                        loading
                      </div>
                    ) : (
                      <button type="submit" className="btn btn-primary">
                        Lưu
                      </button>
                    )}
                  </div>
                </div>
              </form>
            )}
          </Formik>
        </div>
      </div>
    </>
  );
};

export default ModalAddUserInfo;
