import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { toast } from "react-hot-toast";
import { CiEdit } from "react-icons/ci";
import { GoEye } from "react-icons/go";
import { IoMdAdd } from "react-icons/io";
import { VscLock, VscUnlock } from "react-icons/vsc";
import swal from "sweetalert";
import Meta from "../../../src/components/Meta";
import AdminLayout from "../../../src/components/layouts/AdminLayout";
import SpinnerCenter from "../../../src/components/loadings/SpinnerCenter";
import PaginationAdmin from "../../../src/components/paginations/PaginationAdmin";
import SearchAdmin from "../../../src/components/searchs/SearchAdmin";
import productApi from "../../../src/services/ProductApi";
import useWindowSize from "../../../src/hooks/useWindowSize";

const ProductAdmin = () => {
  const queryClient = useQueryClient();

  const router = useRouter();
  const query = router.query;
  const sort = router.query.sort || "createdAt-desc";
  const limit = 6;
  const { data, isLoading } = useQuery(["product", query], () =>
    productApi.getAllAdmin({ ...query, limit, sort })
  );

  const windowSize = useWindowSize();

  const dataSearch = [
    {
      value: "name",
      name: "Tên, mô tả",
    },
  ];

  const { mutate } = useMutation(productApi.update, {
    onSuccess: (id, variables) => {
      const newRows = data.rows.map((item) =>
        item.id === variables.id ? { ...item, ...variables.data } : item
      );
      queryClient.setQueryData(["product", query], { ...data, rows: newRows });
      toast.success(
        `${variables.isDeleted ? "Xóa" : "Mở khóa"} sản phẩm thành công`
      );
    },
    onError: (error) => {
      console.log(error);
      error && error.message && toast.error(error.message);
    },
  });

  const handleDelete = (id) => {
    swal({
      title: "Are you sure?",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        mutate({ id, data: { isDeleted: true } });
      }
    });
  };

  const handleUnlock = (id) => {
    swal({
      title: "Are you sure?",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        mutate({ id, data: { isDeleted: false } });
      }
    });
  };

  return (
    <>
      <Meta title={"Quản lý sản phẩm | MISSOUT"} description="" />
      <AdminLayout>
        <div className="flex items-center justify-between">
          <h1 className="text-lg font-bold">Quản lý sản phẩm</h1>
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

        <SearchAdmin data={dataSearch} placeholder="Tìm kiếm sản phẩm...."/>
        <div className="mt-4 bg-base-200 p-4 rounded">
          <div className="overflow-x-auto min-h-[100px] relative"  style={{ maxWidth: `${windowSize?.width > 1024 ? windowSize.width : windowSize.width}px` }}>
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
                    <th>Trạng thái</th>
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
                      <td>{item.isDeleted ? "Đã xóa" : "Hoạt động"}</td>
                      <td>
                        <div className="flex gap-2 ">
                          <Link href={`/admin/product/${item.slug}`}>
                            {" "}
                            <button className="btn btn-circle btn-warning">
                              <CiEdit className="text-2xl" />
                            </button>
                          </Link>
                          {item.isDeleted ? (
                            <button
                              onClick={() => handleUnlock(item.id)}
                              className="btn btn-circle btn-success"
                            >
                              <VscUnlock className="text-xl" />
                            </button>
                          ) : (
                            <button
                              onClick={() => handleDelete(item.id)}
                              className="btn btn-circle btn-error"
                            >
                              <VscLock className="text-xl" />
                            </button>
                          )}
                          <Link href={`/product/${item.slug}`}>
                            <button className="btn btn-circle btn-primary">
                              <GoEye className="text-xl" />
                            </button>
                          </Link>
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
