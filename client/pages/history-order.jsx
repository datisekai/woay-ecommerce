import React, { useMemo, useState } from "react";
import { requiredLogin } from "../src/config/requiredLogin";
import Meta from "../src/components/Meta";
import MainLayout from "../src/components/layouts/MainLayout";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import OrderApi from "../src/services/OrderApi";
import SpinnerCenter from "../src/components/loadings/SpinnerCenter";
import { formatPrice } from "../src/utils/formatPrice";
import dayjs from "dayjs";
import { GoEye } from "react-icons/go";
import { useRouter } from "next/router";
import PaginationAdmin from "../src/components/paginations/PaginationAdmin";
import ModalViewOrder from "../src/components/modals/ModalViewOrder";

const HistoryOrder = () => {
  const router = useRouter();
  const query = router.query;
  const limit = 4;
  const { data, isLoading } = useQuery(["history-order"], () =>
    OrderApi.getMyOrder({ ...query, limit })
  );

  const [currentView, setCurrentView] = useState({
    isDisplay: false,
    data: {},
  });

  return (
    <>
      <Meta title={"Lịch sử đơn hàng | MISSOUT"} description="" />
      <MainLayout>
        <div className="min-h-[70vh] max-w-[1200px] mx-auto px-2">
          <div className="text-sm breadcrumbs ">
            <ul>
              <li>
                <Link href={"/"}>Trang chủ</Link>
              </li>
              <li>Lịch sử đơn hàng</li>
            </ul>
          </div>
          <h1 className="text-xl font-bold">Lịch sử đơn hàng</h1>
          <div className="overflow-x-auto min-h-[100px] max-h-[550px] relative">
            {!isLoading ? (
              <table className="table table-zebra">
                {/* head */}
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Người mua</th>
                    <th>Tổng tiền</th>
                    <th>Số sản phẩm</th>
                    <th>Trạng thái</th>
                    <th>Ngày tạo</th>
                    <th>Hành động</th>
                  </tr>
                </thead>
                <tbody>
                  {data?.rows?.map((item) => {
                    let text = "";
                    switch (+item.status) {
                      case 0:
                        text = "Đã hủy";
                        break;
                      case 1:
                        text = "Đang xử lý";
                        break;
                      case 2:
                        text = "Đã giao";
                        break;
                    }

                    let result = item.OrderDetails.reduce(
                      (pre, cur) => pre + cur.quantity,
                      0
                    );

                    return (
                      <tr key={item.id}>
                        <th>{item.id}</th>
                        <td>{item.Info.name}</td>
                        <td>{formatPrice(item.total)}</td>
                        <td>{result} sản phẩm</td>
                        <td>{text}</td>
                        <td>{dayjs(item.createdAt).format("DD/MM/YYYY")}</td>
                        <td>
                          <div className="flex gap-2 ">
                            <button
                              onClick={() =>
                                setCurrentView({ isDisplay: true, data: item })
                              }
                              className="btn btn-circle btn-primary"
                            >
                              <GoEye className="text-xl" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
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
          <ModalViewOrder
            data={currentView}
            handleHidden={() => setCurrentView({ isDisplay: false, data: {} })}
          />
        </div>
      </MainLayout>
    </>
  );
};

export default HistoryOrder;

export const getServerSideProps = requiredLogin;
