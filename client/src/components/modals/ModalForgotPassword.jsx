import { useMutation } from "@tanstack/react-query";
import { ErrorMessage, Field, Formik } from "formik";
import React, { useRef } from "react";
import { toast } from "react-hot-toast";
import swal from "sweetalert";
import * as Yup from "yup";
import AuthApi from "../../services/AuthApi";

const ModalForgotPassword = ({ elementClick }) => {
  const checkRef = useRef(null);

  const formikRef = useRef(null);

  const { mutate, isLoading } = useMutation(AuthApi.forgotPassword, {
    onSuccess: (data, variables) => {
      swal(
        "Success",
        "Please check your email for new password update",
        "success"
      );

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
    email: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string().email().required(),
  });

  const handleSubmit = (values, { setSubmitting }) => {
    mutate(values.email);
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
            {({ handleSubmit }) => (
              <div>
                <h3 className="font-bold text-lg">Quên mật khẩu</h3>
                <div className="mt-4 space-y-2">
                  <div>
                    <label htmlFor="" className="block">
                      Email
                    </label>
                    <Field
                      name="email"
                      type="text"
                      placeholder="Nhập email.."
                      className="input input-bordered w-full mt-1"
                    />
                    <ErrorMessage
                      name="email"
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

export default ModalForgotPassword;
