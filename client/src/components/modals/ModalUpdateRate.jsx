import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ErrorMessage, Field, Formik } from "formik";
import React, { useRef, useState } from "react";
import { toast } from "react-hot-toast";
import * as Yup from "yup";
import ReactStars from "react-rating-stars-component";
import uploadCloudinary from "../../config/uploadCloudinary";
import RateApi from "../../services/RateApi";

const ModalUpdateRate = ({ data, handleHidden, productId }) => {
  const queryClient = useQueryClient();

  const formikRef = useRef(null);

  const [isLoading, setIsLoading] = useState(false);
  const [images, setImages] = useState({ files: null, preview: [] });

  const { mutate } = useMutation(RateApi.update, {
    onSuccess: (response, variables) => {
      const oldRates = queryClient.getQueryData(["rate", productId]);
      queryClient.setQueryData(
        ["rate", productId],
        oldRates.map((item) => {
          if (item.id === variables.id) {
            if (variables.data.images) {
              return {
                ...item,
                RateImages: variables.data.images.map((image, index) => ({
                  id: index,
                  src: image,
                })),
              };
            }

            return { ...item, ...variables.data };
          }
          return item;
        })
      );

      setIsLoading(false);
      toast.success("Cập nhật thành công");

      //Tắt modal
      handleHidden();

      //Reset form
      formikRef.current.resetForm();
    },
    onError: (error) => {
      setIsLoading(false);
      console.log(error);
      error && error.message && toast.error(error.message);
    },
  });

  const validationSchema = Yup.object({
    title: Yup.string().max(255).required(),
    description: Yup.string().max(255).required(),
    images: Yup.array()
      .of(Yup.string().required("Image item is required"))
      .min(1, "Image must have at least 1 item"),
    star: Yup.number().min(1).max(5),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    setIsLoading(true);
    let cloudImages;
    if (images.files) {
      cloudImages = await Promise.all(
        Array.from(images.files).map((item) => uploadCloudinary(item))
      );
    }
    mutate({
      id: values.id,
      data: {
        title: values.title,
        description: values.description,
        images: cloudImages,
        star: values.star,
      },
    });
  };

  return (
    <>
      {data.isDisplay && (
        <div className="modal opacity-100 visible pointer-events-auto">
          <div className="modal-box">
            <Formik
              initialValues={{
                id: data.data.id,
                title: data.data.title,
                description: data.data.description,
                images: data.data.RateImages.map((item) => item.src),
                star: data.data.star,
              }}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
              innerRef={formikRef}
            >
              {({ handleSubmit, values, setFieldValue }) => (
                <div>
                  <h3 className="font-bold text-lg">Viết đánh giá</h3>
                  <div className="mt-4 space-y-2">
                    <div>
                      <div className="flex items-center gap-4 justify-between">
                        <label htmlFor="" className="block">
                          Đánh giá
                        </label>
                        <ReactStars
                          count={5}
                          onChange={(rate) => setFieldValue("star", +rate)}
                          size={30}
                          value={values.star}
                          activeColor="#EE4D2D"
                        />
                      </div>
                      <ErrorMessage
                        name="star"
                        component="div"
                        className="text-error"
                      />
                    </div>

                    <div>
                      <label htmlFor="" className="block">
                        Tiêu đề
                      </label>
                      <Field
                        name="title"
                        type="text"
                        placeholder="Nhập tiêu đề.."
                        className="input input-bordered w-full mt-1"
                      />
                      <ErrorMessage
                        name="title"
                        component="div"
                        className="text-error"
                      />
                    </div>
                    <div>
                      <label htmlFor="" className="block">
                        Mô tả
                      </label>
                      <Field
                        name="description"
                        as="textarea"
                        type="text"
                        placeholder="Nhập mô tả.."
                        className="textarea textarea-bordered w-full mt-1"
                      />
                      <ErrorMessage
                        name="description"
                        component="div"
                        className="text-error"
                      />
                    </div>
                    <div>
                      <label htmlFor="" className="block">
                        Hình ảnh
                      </label>
                      <input
                        type="file"
                        className="file-input file-input-bordered w-full mt-1"
                        multiple
                        accept="image/*"
                        onChange={(e) => {
                          const files = e.target.files;
                          const preview = Array.from(files).map((item) =>
                            URL.createObjectURL(item)
                          );
                          if (preview.length > 0) {
                            setFieldValue("images", preview);
                            setImages({ files, preview });
                          }
                        }}
                      />
                      <ErrorMessage
                        name="images"
                        component="div"
                        className="text-error"
                      />

                      <div className="flex gap-2 flex-wrap mt-2">
                        {values.images.map((item, index) => (
                          <div
                            key={index}
                            className="w-[50px] rounded aspect-[1/1]"
                          >
                            <img src={item} className="w-full rounded" />
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="modal-action">
                    {/* if there is a button in form, it will close the modal */}

                    <div className="flex items-center justify-between w-full">
                      <label onClick={handleHidden} className="btn">
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
      )}
    </>
  );
};

export default ModalUpdateRate;
