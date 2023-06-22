import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { useRef, useState } from "react";
import { toast } from "react-hot-toast";
import * as Yup from "yup";
import AuthApi from "../../services/AuthApi";
import SpinnerCenter from "../loadings/SpinnerCenter";

const ChangePassword = ({ user }) => {
  const innerRef = useRef(null);

  const [isLoading, setIsLoading] = useState(false);

  const initialValues = {
    password: "",
    confirmPassword: "",
  };

  const validationSchema = Yup.object().shape({
    password: Yup.string()
      .required("Password is required")
      .min(8, "Password must be at least 8 characters long"),
    confirmPassword: Yup.string()
      .required("Confirm Password is required")
      .oneOf([Yup.ref("password"), null], "Passwords must match"),
  });

  const handleSubmit = async (values) => {
    setIsLoading(true);
    const result = await AuthApi.putMyInfo({ password: values.password });

    if (result?.success) {
      toast.success("Đổi mật khẩu thành công");
      innerRef.current?.resetForm();
    }
    setIsLoading(false);
  };
  return (
    <div>
      <div className="pb-[20px] relative before:content-[''] before:absolute before:w-[95%] before:h-[1px] before:bottom-0 before:left-[50%] before:translate-x-[-50%] before:bg-black">
        <h1 className="py-[16px] uppercase font-bold text-xl">Đổi mật khẩu</h1>
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
                    Mật khẩu mới
                  </label>
                  <div>
                    <Field
                      className="input input-bordered w-full max-w-xs"
                      name="password"
                      type="password"
                      placeholder="Nhập vào mật khẩu mới...."
                    />
                    <ErrorMessage
                      name="password"
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
                    Nhập lại
                  </label>
                  <div>
                    <Field
                      className="input input-bordered w-full max-w-xs"
                      name="confirmPassword"
                      type="password"
                      placeholder="Nhập vào mật khẩu...."
                    />
                    <ErrorMessage
                      name="confirmPassword"
                      component="div"
                      className="text-error"
                    />
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-[110px]"></div>
                  {isLoading ? (
                    <button className="btn w-[150px] btn-outline btn-primary ">
                      <span className="loading loading-spinner"></span>
                      loading
                    </button>
                  ) : (
                    <button
                      type="submit"
                      className="btn w-[150px] btn-outline btn-primary "
                    >
                      Lưu
                    </button>
                  )}
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

export default ChangePassword;
