import React, { useState } from "react";
import Meta from "../../../src/components/Meta";
import AdminLayout from "../../../src/components/layouts/AdminLayout";
import { ErrorMessage, Field, Formik } from "formik";
import * as Yup from "yup";
import { useQuery } from "@tanstack/react-query";
import CategoryApi from "../../../src/services/CategoryApi";
import { generateSlug } from "../../../src/utils/generateSlug";
import { FcAddImage } from "react-icons/fc";

const AddProduct = () => {
  const { data: categories } = useQuery(["categories"], CategoryApi.getAll);
  const [previewImage, setPreviewImage] = useState([]);

  const initialValues = {
    slug: "",
    name: "",
    description: "",
    categoryId: 0,
    variants: [],
    images: [],
  };

  const validationSchema = Yup.object({
    slug: Yup.string()
      .matches(/^[a-zA-Z0-9-]+$/, "Invalid format slug")
      .max(255)
      .required(),
    name: Yup.string().max(255).required(),
    description: Yup.string().max(255).required(),
    categoryId: Yup.number().required(),
    variants: Yup.array().of(
      Yup.object()
        .shape({
          colorId: Yup.number().required("Color is required"),
          sizeId: Yup.number().required("Size is required"),
          quantity: Yup.number()
            .required("Quantity is required")
            .min(0, "Quantity must be a positive number"),
          price: Yup.number()
            .required("Price is required")
            .min(0, "Price must be a positive number"),
          discount: Yup.number().min(0, "Discount must be a positive number"),
        })
        .required()
    ),
    images: Yup.array().required(),
  });

  const handleSubmit = (values) => {
    console.log(values);
  };

  return (
    <>
      <Meta title={"Tạo sản phẩm | MISSOUT"} description="" />
      <AdminLayout>
        <>
          <div className="flex items-center justify-between">
            <h1 className="font-bold text-xl text-neutral">Tạo sản phẩm</h1>
            <button className="btn btn-primary">Lưu</button>
          </div>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ handleSubmit, setFieldValue, values }) => (
              <form onSubmit={handleSubmit}>
                <div className="flex gap-4 mt-4 flex-col md:flex-row">
                  <div className="flex-1 space-y-4">
                    <div className="rounded bg-base-200 py-4 px-6 md:px-8">
                      <h2 className="text-md text-neutral font-bold border-b-2 pb-2">
                        Thông tin chung
                      </h2>
                      <div className="mt-4 space-y-4">
                        <div>
                          <label>
                            <span className="">Tên sản phẩm</span>
                            <Field
                              type="text"
                              name="name"
                              placeholder="Nhập vào tên sản phẩm...."
                              className="input input-bordered w-full mt-1"
                            />
                          </label>
                          <ErrorMessage
                            name="name"
                            component="div"
                            className="text-error"
                          />
                        </div>

                        <div>
                          <div className="flex gap-x-4">
                            <div className="flex-1">
                              <span className="">Slug</span>
                              <div className=" gap-1 mt-1 flex items-start">
                                <label className="flex-1">
                                  <Field
                                    type="text"
                                    name="slug"
                                    placeholder="Nhập vào tên sản phẩm...."
                                    className="input input-bordered w-full"
                                  />
                                  <ErrorMessage
                                    name="slug"
                                    component="div"
                                    className="text-error"
                                  />
                                </label>
                                <button
                                  className="btn btn-primary"
                                  onClick={() =>
                                    setFieldValue(
                                      "slug",
                                      generateSlug(values.name)
                                    )
                                  }
                                >
                                  Generate
                                </button>
                              </div>
                            </div>
                            <div className="flex-1">
                              <label className="">
                                <span className="">Danh mục</span>
                                <Field
                                  as="select"
                                  name="categoryId"
                                  placeholder="Nhập vào tên sản phẩm...."
                                  className="input input-bordered w-full mt-1"
                                  onChange={(e) =>
                                    setFieldValue("categoryId", +e.target.value)
                                  }
                                >
                                  {categories?.map((item) => (
                                    <option key={item.id} value={item.id}>
                                      {item.name}
                                    </option>
                                  ))}
                                </Field>
                              </label>
                            </div>
                          </div>
                        </div>

                        <div>
                          <label>
                            <span className="">Mô tả sản phẩm</span>
                            <Field
                              as="textarea"
                              name="description"
                              placeholder="Nhập vào mô tả sản phẩm...."
                              className="textarea textarea-bordered w-full mt-1 text-md"
                            />
                          </label>
                          <ErrorMessage
                            name="textarea"
                            component="div"
                            className="text-error"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="rounded bg-base-200 py-4 px-6 md:px-8">
                      <h1 className="text-md text-neutral font-bold border-b-2 pb-2">Biến thể</h1>
                      <div>
                        <div className="flex">
                          <h2>Kích thước</h2>
                          <label>
                            
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="py-4 px-6 md:px-8 w-full md:w-[350px] bg-base-200 rounded">
                    <h2>Hình ảnh sản phẩm</h2>
                    <label className="cursor-pointer">
                      <Field
                        className="hidden"
                        type="file"
                        multiple
                        name="images"
                        accept="image/*"
                        onChange={(e) => {
                          const files = e.target.files;
                          setFieldValue(files);
                          const previews = [];
                          for (let i = 0; i < files.length; i++) {
                            previews.push(URL.createObjectURL(files[i]));
                          }

                          setPreviewImage(previews);
                        }}
                      />
                      <div className="w-full border border-dotted-1 flex-col items-center mt-4 flex justify-center border-primary rounded">
                        <FcAddImage className="text-6xl" />
                        <span>Thêm ảnh</span>
                      </div>
                    </label>

                    <div className="grid grid-cols-3 gap-2 mt-4">
                      {previewImage.map((item, index) => (
                        <img key={index} src={item} alt="" />
                      ))}
                    </div>
                  </div>
                </div>
              </form>
            )}
          </Formik>
        </>
      </AdminLayout>
    </>
  );
};

export default AddProduct;
