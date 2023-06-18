import React from "react";
import { IoMdAdd } from "react-icons/io";
import { AiOutlineDelete } from "react-icons/ai";
import { CiEdit } from "react-icons/ci";
import Meta from "../../../src/components/Meta";
import AdminLayout from "../../../src/components/layouts/AdminLayout";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import productApi from "../../../src/services/ProductApi";
import SpinnerCenter from "../../../src/components/loadings/SpinnerCenter";
import PaginationAdmin from "../../../src/components/paginations/PaginationAdmin";

const ProductAdmin = () => {
  const router = useRouter();
  const query = router.query;
  const limit = 6;
  const { data, isLoading } = useQuery(["product", query], () =>
    productApi.getAllAdmin({ ...query, limit })
  );

  console.log(data);
  return (
    <>
      <Meta title={"Quản lý sản phẩm | MISSOUT"} description="" />
      <AdminLayout>
        <div className="flex items-center justify-between">
          <h1 className="text-lg text-neutral font-bold">Quản lý sản phẩm</h1>
          <div>
            {/* Open the modal using ID.showModal() method */}
            <Link href={`/admin/product/add`}>
              <button className="btn btn-success text-base-100">
                <IoMdAdd className="text-xl" />
                Tạo mới
              </button>
            </Link>
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
          <div className="overflow-x-auto min-h-[100px] relative">
            {!isLoading ? (
              <table className="table table-zebra">
                {/* head */}
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Slug</th>
                    <th>Tên</th>
                    <th>Danh mục</th>
                    <th>Số biến thể</th>
                    <th>Hành động</th>
                  </tr>
                </thead>
                <tbody>
                  {data?.rows?.map((item) => (
                    <tr key={item.id}>
                      <th>{item.id}</th>
                      <td>{item.slug}</td>
                      <td>{item.name}</td>
                      <td>{item.Category.name}</td>
                      <td>{item.variants.length} biến thể</td>
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
                    <th>Danh mục</th>
                    <th>Số biến thể</th>
                    <th>Hành động</th>
                  </tr>
                </tfoot>
              </table>
            ) : (
              <SpinnerCenter />
            )}
          </div>
          {data && (
            <div className="mt-2">
              <PaginationAdmin
                to={data.rows.length > 0 ? data.offset + 1 : 0}
                from={data.offset + data.rows.length}
                count={data.count}
                pre={data.page > 1 && data.page - 1}
                next={data.page * data.limit < data.count && +data.page + 1}
              />
            </div>
          )}
        </div>
      </AdminLayout>
    </>
  );
};

export default ProductAdmin;
