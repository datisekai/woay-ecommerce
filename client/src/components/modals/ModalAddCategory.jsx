import React, { useEffect, useRef } from "react";
import { ErrorMessage, Field, Form, useFormik, Formik } from "formik";
import * as Yup from "yup";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { useRouter } from "next/router";
import CategoryApi from "../../services/CategoryApi";
import { generateSlug } from "../../utils/generateSlug";

const ModalAddCategory = ({ elementClick }) => {
  const checkRef = useRef(null);

  const queryClient = useQueryClient();

  const formikRef = useRef(null);

  const { mutate, isLoading } = useMutation(CategoryApi.add, {
    onSuccess: (data, variables) => {
      const oldCategories = queryClient.getQueryData(["categories"]);
      queryClient.setQueryData(["categories"], [data.data, ...oldCategories]);
      toast.success("Tạo danh mục thành công");

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
    slug: "",
    name: "",
  };

  const validationSchema = Yup.object({
    slug: Yup.string()
      .matches(/^[a-zA-Z0-9-]+$/, "Invalid format slug")
      .required(),
    name: Yup.string().required(),
  });

  const handleSubmit = (values, { setSubmitting }) => {
    mutate(values);
  };
  return (
    <>
      <label htmlFor="my_modal_6">{elementClick}</label>

      <input type="checkbox" id="my_modal_6" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box">
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
            innerRef={formikRef}
          >
            {({ handleSubmit, setFieldValue, values }) => (
              <form onSubmit={handleSubmit}>
                <h3 className="font-bold text-lg">Tạo danh mục</h3>
                <div className="mt-4 space-y-2">
                  <div>
                    <label htmlFor="" className="block">
                      Tên danh mục
                    </label>
                    <Field
                      name="name"
                      type="text"
                      placeholder="Nhập tên danh mục.."
                      className="input input-bordered w-full mt-1"
                    />
                    <ErrorMessage
                      name="name"
                      component="div"
                      className="text-error"
                    />
                  </div>
                  <div className="">
                    <label htmlFor="" className="block">
                      Slug
                    </label>
                    <div className="">
                      <div className="flex items-center gap-1">
                        <Field
                          name="slug"
                          type="text"
                          placeholder="Nhập slug..."
                          className="input input-bordered w-full mt-1"
                        />
                        <div
                          className="btn btn-primary"
                          onClick={() =>
                            setFieldValue("slug", generateSlug(values.name))
                          }
                        >
                          AUTO
                        </div>
                      </div>
                      <ErrorMessage
                        name="slug"
                        component="div"
                        className="text-error"
                      />
                    </div>
                  </div>
                </div>
                <div className="modal-action">
                  {/* if there is a button in form, it will close the modal */}

                  <div className="flex items-center justify-between w-full">
                    <label htmlFor="my_modal_6" ref={checkRef} className="btn">
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

export default ModalAddCategory;
