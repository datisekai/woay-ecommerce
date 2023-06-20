import vi from "date-fns/locale/vi";
import dayjs from "dayjs";
import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { useEffect, useRef, useState } from "react";
import DatePicker, { registerLocale } from "react-datepicker";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import AuthApi from "../../services/AuthApi";
import { toast } from "react-hot-toast";
import { setUser } from "../../redux/slices/UserSlice";
import SpinnerCenter from "../loadings/SpinnerCenter";

const HoSo = ({ user }) => {
  registerLocale("vi", vi);

  const innerRef = useRef(null);
  const dispatch = useDispatch();

  useEffect(() => {
    if (user) {
      innerRef.current.setFieldValue("name", user.name || "");
      innerRef.current.setFieldValue("phone", user.phone || "");
      innerRef.current.setFieldValue(
        "date",
        user.date ? new Date(user.date) : new Date()
      );
    }
  }, [user]);

  const initialValues = {
    name: "",
    phone: "",
    date: new Date(),
  };
  const validationSchema = Yup.object({
    name: Yup.string().required(),
    phone: Yup.string()
      .matches(/^0\d{9}$/, "Phone invalid format")
      .required(),
    date: Yup.string().required(),
  });
  const handleSubmit = async (values) => {
    const data = {
      ...values,
      date: dayjs(values.date).format("YYYY-MM-DD"),
    };

    const result = await AuthApi.putMyInfo(data);

    if (result?.success) {
      dispatch(setUser({ ...user, ...data }));
      toast.success("Cập nhật thành công");
    }
  };
  return (
    <div>
      <div className="pb-[20px] relative before:content-[''] before:absolute before:w-[95%] before:h-[1px] before:bottom-0 before:left-[50%] before:translate-x-[-50%] before:bg-black">
        <h1 className="py-[16px] uppercase font-bold text-xl">Hồ sơ của tôi</h1>
        <p>Quản lý thông tin hồ sơ để bảo mật tài khoản</p>
      </div>
      <div className="lg:px-[40px] lg:py-[20px] relative">
        {user ? (
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
            innerRef={innerRef}
            className="div flex flex-col gap-2
                    pl-[8px] lg:px-[16px]"
          >
            {({ handleSubmit, setFieldValue, values }) => (
              <Form className="flex flex-col gap-2 lg:px-[16px]">
                <div className="flex gap-4">
                  <label
                    htmlFor=""
                    className="w-[110px] flex items-center justify-end"
                  >
                    Email
                  </label>

                  <p className="h-12 flex items-center justify-start">
                    {user?.email}
                  </p>
                </div>
                <div className="flex gap-4">
                  <label
                    htmlFor=""
                    className="w-[110px] flex items-center justify-end"
                  >
                    Tên
                  </label>
                  <div>
                    <Field
                      className="input input-bordered w-full max-w-xs"
                      name="name"
                      type="text"
                      placeholder="Nhập vào tên...."
                    />
                    <ErrorMessage
                      name="name"
                      component="div"
                      className="text-error"
                    />
                  </div>
                </div>
                <div className="flex gap-4">
                  <label
                    htmlFor=""
                    className="w-[110px] flex items-center justify-end"
                  >
                    Số điện thoại
                  </label>
                  <div>
                    <Field
                      className="input input-bordered w-full max-w-xs"
                      type="text"
                      placeholder="Nhập vào số điện thoại...."
                      name="phone"
                    />{" "}
                    <ErrorMessage
                      name="phone"
                      component="div"
                      className="text-error"
                    />
                  </div>
                </div>

                <div className="flex gap-4">
                  <label
                    htmlFor=""
                    className="w-[110px] flex items-center justify-end"
                  >
                    Ngày sinh
                  </label>
                  <div>
                    <DatePicker
                      locale={"vi"}
                      className="input input-bordered w-full"
                      selected={values.date}
                      value={values.date}
                      onChange={(date) => setFieldValue("date", date)}
                      placeholderText="Nhập vào ngày sinh...."
                    />
                    <ErrorMessage
                      name="date"
                      component="div"
                      className="text-error"
                    />
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-[110px]"></div>
                  <button
                    type="submit"
                    className="btn w-[150px] btn-outline btn-primary "
                  >
                    Lưu
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        ) : (
          <SpinnerCenter />
        )}
      </div>
    </div>
  );
};

export default HoSo;
