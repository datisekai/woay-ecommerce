import React from "react";

const ModalAddUser = () => {
  return (
    <form method="dialog" className="modal-box max-w-md">
      <h3 className="font-bold text-lg">Tạo người dùng</h3>
      <div className="mt-4 space-y-2">
        <div>
          <label htmlFor="" className="block">
            Email
          </label>
          <input
            type="text"
            placeholder="Nhập email..."
            className="input input-bordered w-full mt-1"
          />
        </div>

        <div>
          <label htmlFor="" className="block">
            Mật khẩu
          </label>
          <input
            type="text"
            placeholder="Nhập mật khẩu..."
            className="input input-bordered w-full mt-1"
          />
        </div>

        <div>
          <label htmlFor="" className="block">
            Loại người dùng
          </label>
          <select className="select mt-1 select-bordered w-full">
            <option>Người dùng</option>
            <option>Admin</option>
          </select>
        </div>

        <div>
          <label htmlFor="" className="block">
            Trạng thái
          </label>
          <select className="select mt-1 select-bordered w-full">
            <option>Hoạt động</option>
            <option>Khóa</option>
          </select>
        </div>
      </div>
      <div className="modal-action">
        {/* if there is a button in form, it will close the modal */}
        <button className="btn">Close</button>
      </div>
    </form>
  );
};

export default ModalAddUser;
