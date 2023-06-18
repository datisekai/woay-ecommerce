import React from "react";
import Meta from "../../../src/components/Meta";
import AdminLayout from "../../../src/components/layouts/AdminLayout";
import {Formik} from 'formik'

const AddProduct = () => {
    const initialValues = {
        slug:"",
        name:"",
        description:"",
        categoryId:0,
        variants:[],
        images:[]
    }
  return (
    <>
      <Meta title={"Tạo sản phẩm | MISSOUT"} description="" />
      <AdminLayout>
        <>
          <div className="flex items-center justify-between">
            <h1 className="font-bold text-xl text-neutral">Tạo sản phẩm</h1>
            <button className="btn btn-primary">Lưu</button>
          </div>
         <Formik>
         <div className="flex gap-4 mt-4 ">
            <div className="flex-1 rounded bg-base-200 p-4">
              <h2 className="text-md text-neutral font-bold border-b-2 pb-2">
                Thông tin chung
              </h2>
              <div>
                <label htmlFor="">
                    
                </label>
              </div>
            </div>
            <div className="w-full md:w-[300px] bg-base-200 rounded"></div>
          </div>
         </Formik>
        </>
      </AdminLayout>
    </>
  );
};

export default AddProduct;
