import React from "react";
import AdminLayout from "../../src/components/layouts/AdminLayout";
import { IoMdAdd } from "react-icons/io";
import { AiOutlineDelete } from "react-icons/ai";
import { CiEdit } from "react-icons/ci";
import Meta from "../../src/components/Meta";
import { useQuery } from "@tanstack/react-query";
import CategoryApi from "../../src/services/CategoryApi";
import SpinnerCenter from "../../src/components/loadings/SpinnerCenter";

const CategoryAdmin = () => {
  const { data, isLoading } = useQuery(["categories"], CategoryApi.getAll);

  console.log(data);

  return (
    <>
      <Meta title={"Quản lý danh mục | MISSOUT"} description="" />
      <AdminLayout>
        <div className="flex items-center justify-between">
          <h1 className="text-lg text-neutral font-bold">Quản lý danh mục</h1>
          <button className="btn btn-success text-base-100">
            <IoMdAdd className="text-xl" />
            Tạo mới
          </button>
        </div>

        <div className="mt-4 bg-base-200 p-4 rounded">
          <div className="overflow-x-auto min-h-[100px] relative">
            {!isLoading ? (
              <table className="table table-zebra">
                {/* head */}
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Slug</th>
                    <th>Tên</th>
                    <th>Hành động</th>
                  </tr>
                </thead>
                <tbody>
                  {data?.map((item) => (
                    <tr key={item.id}>
                      <th>{item.id}</th>
                      <td>{item.slug}</td>
                      <td>{item.name}</td>
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
                    <th>Slug</th>
                    <th>Tên</th>
                    <th>Hành động</th>
                  </tr>
                </tfoot>
              </table>
            ) : (
              <SpinnerCenter />
            )}
          </div>
        </div>
      </AdminLayout>
    </>
  );
};

export default CategoryAdmin;
