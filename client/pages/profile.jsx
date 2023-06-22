import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { BiUserCircle } from "react-icons/bi";
import { FaRegAddressCard } from "react-icons/fa";
import { MdPassword } from 'react-icons/md';
import { useSelector } from "react-redux";
import Meta from "../src/components/Meta";
import MainLayout from "../src/components/layouts/MainLayout";
import DotCenter from "../src/components/loadings/DotCenter";
import Address from "../src/components/profiles/Address";
import ChangePassword from "../src/components/profiles/ChangePassword";
import HoSo from "../src/components/profiles/HoSo";
import { requiredLogin } from "../src/config/requiredLogin";

export default function Profile() {
  const router = useRouter();

  const { page } = router.query || "ho-so";

  const { user } = useSelector((state) => state.user);

  return (
    <>
      <Meta title={"Thông tin cá nhân | MISSOUT"} description="" />
      <MainLayout>
        <div className="container mx-auto px-[15px] my-[50px]">
          <div className="  grid grid-cols-1 gap-y-4 lg:grid-cols-4">
            <div className="col-span-1  ">
              <div className="flex gap-4  items-center flex-wrap lg:justify-center border-b md:border-none pb-2">
                {user ? (
                  <>
                    {" "}
                    <img
                      className="w-12 rounded-full"
                      src={`https://ui-avatars.com/api/?background=0D8ABC&color=fff&name=${
                        user?.name ? user?.name : user?.email
                      }`}
                      alt="avatar"
                    />
                    <h1 className="uppercase font-bold">
                      {user?.name ? user?.name : user?.email.split("@")[0]}
                    </h1>
                  </>
                ) : (
                  <DotCenter />
                )}
              </div>
              <div className="mt-[24px] flex lg:justify-center">
                <ul className="menu bg-base-100 w-full md:w-56 rounded-box">
                  <li>
                    <Link
                      href={"/profile"}
                      className={`${page == "" ? "bg-base-200" : ""}`}
                    >
                      <BiUserCircle className="text-xl" />
                      Hồ sơ
                    </Link>
                  </li>
                  <li>
                    <Link
                      href={`/profile?page=address`}
                      className={`${page === "address" ? "bg-base-200" : ""}`}
                    >
                      <FaRegAddressCard className="text-lg" />
                      Địa chỉ
                    </Link>
                  </li>
                  <li>
                    <Link
                      href={`/profile?page=change-password`}
                      className={`${page === "change-password" ? "bg-base-200" : ""}`}
                    >
                      <MdPassword className="text-lg" />
                      Đổi mật khẩu
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className=" col-span-3  bg-base-200 rounded p-4">
              {page == "address" ?  <Address />  : page == 'change-password' ? <ChangePassword user={user}/> : <HoSo user={user} />}
            </div>
          </div>
        </div>
      </MainLayout>
    </>
  );
}

export const getServerSideProps = requiredLogin;
