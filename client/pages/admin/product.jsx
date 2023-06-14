import React from "react";
import AdminLayout from "../../src/components/layouts/AdminLayout";
import { IoMdAdd } from "react-icons/io";
import { AiOutlineDelete } from "react-icons/ai";
import { CiEdit } from "react-icons/ci";
import Meta from "../../src/components/Meta";

const ProductAdmin = () => {
  return (
  <>
   <Meta title={'Quản lý sản phẩm | MISSOUT'} description=""/>
  <AdminLayout>
      <div className="flex items-center justify-between">
        <h1 className="text-lg text-neutral font-bold">Quản lý sản phẩm</h1>
        <div>
          {/* Open the modal using ID.showModal() method */}
          <button
            className="btn btn-success text-base-100"
            onClick={() => window.my_modal_1.showModal()}
          >
            {" "}
            <IoMdAdd className="text-xl" />
            Tạo mới
          </button>
          <dialog id="my_modal_1" className="modal">
            <form method="dialog" className="modal-box">
              <h3 className="font-bold text-lg">Hello!</h3>
              <p className="py-4">
                Press ESC key or click the button below to close
              </p>
              <div className="modal-action">
                {/* if there is a button in form, it will close the modal */}
                <button className="btn">Close</button>
              </div>
            </form>
          </dialog>
        </div>
      </div>

      <div className="join mt-2">
        <div>
          <div>
            <input
              className="input input-bordered join-item"
              placeholder="Tìm kiếm người dùng..."
            />
          </div>
        </div>
        <select className="select select-bordered join-item">
          <option>Tên</option>
          <option>Email</option>
        </select>
        <div className="indicator">
          <button className="btn join-item">Tìm kiếm</button>
        </div>
      </div>
      <div className="mt-4 bg-base-200 p-4 rounded">
        <div className="overflow-x-auto h-[550px]">
          <table className="table table-zebra">
            {/* head */}
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Job</th>
                <th>Favorite Color</th>
                <th>Hành động</th>
              </tr>
            </thead>
            <tbody>
              {[0, 1, 2, 3, 4, 5, 6, 7].map((item) => (
                <tr key={item}>
                  <th>1</th>
                  <td>Cy Ganderton</td>
                  <td>Quality Control Specialist</td>
                  <td>Blue</td>
                  <td>
                    <div className="flex gap-2 ">
                      <button className="btn btn-circle btn-warning">
                        <CiEdit className="text-2xl" />
                      </button>
                      <button className="btn btn-circle btn-error">
                        <AiOutlineDelete className="text-xl" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Job</th>
                <th>Favorite Color</th>
                <th>Hành động</th>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </AdminLayout></>
  );
};

export default ProductAdmin;
