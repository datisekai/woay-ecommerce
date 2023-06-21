import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ErrorMessage, Field, Formik } from "formik";
import React, { useRef, useState } from "react";
import { toast } from "react-hot-toast";
import * as Yup from "yup";
import VariantApi from "../../services/VariantApi";

const ModalAddVariant = ({ elementClick, colors, sizes, handleAddVariant, product }) => {
  const checkRef = useRef(null);

  const queryClient = useQueryClient();

  const [messageError, setMessageError] = useState("");

  const formikRef = useRef(null);

  const { mutate, isLoading } = useMutation(VariantApi.add, {
    onSuccess: (data, variables) => {
      const Color = colors.find((item) => item.id === data.colorId);
      const Size = sizes.find((item) => item.id === data.sizeId);
      handleAddVariant({ ...data, Color, Size });

      toast.success("Tạo biến thể thành công");

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
    colorId: 0,
    sizeId: 0,
    price: 0,
    quantity: 0,
  };

  const validationSchema = Yup.object({
    colorId: Yup.number().required().min(1,'Color is required'),
    sizeId: Yup.number().required().min(1, 'Size is required'),
    price: Yup.number().required().min(1),
    quantity: Yup.number().required().min(1),
  });

  const handleSubmit = (values, { setSubmitting }) => {
    const foundVariant = product.variants.some(
      (item) => item.colorId === values.colorId && item.sizeId === values.sizeId
    );

    if (foundVariant) {
        toast.error('Variant is exist, please check again')
      return;
    }

    mutate({...values, productId:product.id});
  };
  return (
    <>
      <label htmlFor="my_modal_color">{elementClick}</label>

      <input type="checkbox" id="my_modal_color" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box">
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
            innerRef={formikRef}
          >
            {({ handleSubmit, setFieldValue }) => (
              <div>
                <h3 className="font-bold text-lg">Tạo biến thể</h3>
                <div className="mt-4 space-y-2">
                  <div>
                    <label htmlFor="" className="block">
                      Kích thước
                    </label>
                    <Field
                      as="select"
                      name="sizeId"
                      placeholder="Nhập kích thước.."
                      className="select select-bordered w-full mt-1"
                      onChange={(e) => setFieldValue("sizeId", +e.target.value)}
                    >
                      <option value="0" disabled>
                        Chọn
                      </option>
                      {sizes?.map((item) => (
                        <option key={item.id} value={item.id}>{item.name}</option>
                      ))}
                    </Field>
                    <ErrorMessage
                      name="sizeId"
                      component="div"
                      className="text-error"
                    />
                  </div>
                  <div>
                    <label htmlFor="" className="block">
                      Màu sắc
                    </label>
                    <Field
                      as="select"
                      name="colorId"
                      placeholder="Nhập màu sắc.."
                      className="select select-bordered w-full mt-1"
                      onChange={(e) =>
                        setFieldValue("colorId", +e.target.value)
                      }
                    >
                      <option value="0" disabled>
                        Chọn
                      </option>
                      {colors?.map((item) => (
                        <option key={item.id} value={item.id}>{item.name}</option>
                      ))}
                    </Field>
                    <ErrorMessage
                      name="colorId"
                      component="div"
                      className="text-error"
                    />
                  </div>{" "}
                  <div>
                    <label htmlFor="" className="block">
                      Giá
                    </label>
                    <Field
                      name="price"
                      type="number"
                      placeholder="Nhập giá.."
                      className="input input-bordered w-full mt-1"
                    />

                    <ErrorMessage
                      name="price"
                      component="div"
                      className="text-error"
                    />
                  </div>
                  <div>
                    <label htmlFor="" className="block">
                      Số lượng
                    </label>
                    <Field
                      name="quantity"
                      type="number"
                      placeholder="Nhập số lượng.."
                      className="input input-bordered w-full mt-1"
                    />

                    <ErrorMessage
                      name="quantity"
                      component="div"
                      className="text-error"
                    />
                  </div>
                </div>
                <div className="modal-action">
                  {/* if there is a button in form, it will close the modal */}

                  <div className="flex items-center justify-between w-full">
                    <label
                      htmlFor="my_modal_color"
                      ref={checkRef}
                      className="btn"
                    >
                      Đóng
                    </label>
                    {isLoading ? (
                      <div className="btn">
                        <span className="loading loading-spinner"></span>
                        loading
                      </div>
                    ) : (
                      <button
                        onClick={handleSubmit}
                        type="submit"
                        className="btn btn-primary"
                      >
                        Lưu
                      </button>
                    )}
                  </div>
                </div>
              </div>
            )}
          </Formik>
        </div>
      </div>
    </>
  );
};

export default ModalAddVariant;
