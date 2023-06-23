import React from "react";
import AdminLayout from "../../src/components/layouts/AdminLayout";
import Meta from "../../src/components/Meta";
import { useQuery } from "@tanstack/react-query";
import StatisticApi from "../../src/services/StatisticApi";
import DotCenter from "../../src/components/loadings/DotCenter";
import productApi from "../../src/services/ProductApi";
import BlogApi from "../../src/services/BlogApi";
import SpinnerCenter from "../../src/components/loadings/SpinnerCenter";
import PostApi from "../../src/services/PostApi";
import { calculateCreatedTime } from "../../src/utils/formatTime";
import Link from "next/link";
import useWindowSize from "../../src/hooks/useWindowSize";

const AdminDashBoard = () => {
  const { data: countStatistic } = useQuery(["statistic"], StatisticApi.getAll);

  const { data: products } = useQuery(["products"], () =>
    productApi.getAllAdmin({ limit: 6, sort:'createdAt-desc' })
  );

  const { data: posts } = useQuery(["posts"], () =>
    PostApi.getAll({ limit: 5 })
  );

  const windowSize = useWindowSize();
  return (
    <>
      <Meta title={"Dashboard | MISSOUT"} description="" />
      <AdminLayout>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 ">
          <div className="rounded-sm p-4 bg-info font-bold text-center text-base-100">
            {countStatistic ? (
              <h2 className="text-2xl">{countStatistic.countUser}</h2>
            ) : (
              <DotCenter />
            )}
            <p>Người dùng</p>
          </div>
          <div className="rounded-sm p-4 bg-success font-bold text-center text-base-100">
            {countStatistic ? (
              <h2 className="text-2xl">{countStatistic.countProduct}</h2>
            ) : (
              <DotCenter />
            )}
            <p>Sản phẩm</p>
          </div>
          <div className="rounded-sm p-4 bg-warning font-bold text-center text-base-100">
            {countStatistic ? (
              <h2 className="text-2xl">{countStatistic.countPost}</h2>
            ) : (
              <DotCenter />
            )}
            <p>Bài viết</p>
          </div>
          <div className="rounded-sm p-4 bg-error font-bold text-center text-base-100">
            {countStatistic ? (
              <h2 className="text-2xl">{countStatistic.countOrder}</h2>
            ) : (
              <DotCenter />
            )}
            <p>Đơn hàng</p>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-2 pb-5">
          <div className="bg-base-200 rounded  p-4 mt-4 w-full ">
            <div className="overflow-x-auto min-h-[100px]  relative"  style={{ maxWidth: `${windowSize?.width > 1024 ? windowSize.width : windowSize.width}px` }}>
              {products ? (
                <table className="table">
                  {/* head */}
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Slug</th>
                      <th>Tên</th>
                      <th>Danh mục</th>
                      <th>Số biến thể</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.rows.map((item) => (
                      <tr key={item.id}>
                        <th>{item.id}</th>
                        <td>{item.slug}</td>
                        <td>{item.name}</td>
                        <td>{item.Category.name}</td>
                        <td>{item.variants.length} biến thể</td>
                        <th>
                          <Link href={`/product/${item.slug}`}>
                            <div className="btn btn-ghost btn-xs">details</div>
                          </Link>
                        </th>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <SpinnerCenter />
              )}
            </div>
          </div>

          <div className="bg-base-200 rounded mt-4 p-4 w-full md:w-[400px]">
            <h3 className="font-bold">Bài viết gần đây</h3>
            <ul className="overflow-auto relative min-h-[100px]"  style={{ maxWidth: `${windowSize?.width > 1024 ? windowSize.width : windowSize.width}px` }}>
              {posts ? (
                posts.rows.map((item) => (
                  <li key={item.id} className="py-2 ">
                    <Link
                      href={`/post/${item.slug}`}
                      className="link link-hover"
                    >
                      <h3 className="flex-1 ">{item.title}</h3>
                    </Link>
                    <span className="text-sm ">
                      {calculateCreatedTime(item.createdAt)}
                    </span>
                  </li>
                ))
              ) : (
                <SpinnerCenter />
              )}
            </ul>
          </div>
        </div>
      </AdminLayout>
    </>
  );
};

export default AdminDashBoard;
