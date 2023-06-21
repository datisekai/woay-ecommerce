import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CiSearch, CiShoppingCart } from "react-icons/ci";
import { HiBars3 } from "react-icons/hi2";
import { BiChevronDown, BiChevronUp } from "react-icons/bi";
import { IoMdClose } from "react-icons/io";
import { BsSearch } from "react-icons/bs";
import navbars from "../data/navbar";
import Link from "next/link";
import { useRouter } from "next/router";
import { logout, setUser } from "../../redux/slices/UserSlice";
import AuthApi from "../../services/AuthApi";
import { useLocalStorage } from "usehooks-ts";
import DotCenter from "../loadings/DotCenter";

const HeaderTool = () => {
  const [cart, setCart] = useLocalStorage("cart", []);
  const [navbar, setNavbar] = useState(navbars);

  const heightLiChild = 28;
  const [showChild, setShowChild] = useState({
    0: false,
    2: false,
  });
  const [query, setQuery] = useState("");
  const { user, isLoading } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const router = useRouter();

  const { arrCategory } = useSelector((state) => state.category);
  const { arrCollectionBlogs } = useSelector((state) => state.blogs);

  useEffect(() => {
    if (arrCategory) {
      let newNavbar = [...navbar];
      newNavbar[0].children = arrCategory.map((item) => ({
        url: `/${item.slug}`,
        title: item.name,
      }));
      setNavbar(newNavbar);
    }
  }, [arrCategory]);

  useEffect(() => {
    if (arrCollectionBlogs) {
      let newNavbar = [...navbar];
      newNavbar[2].children = arrCollectionBlogs.map((item) => ({
        url: `/${item.slug}`,
        title: item.title,
      }));
      setNavbar(newNavbar);
    }
  }, [arrCollectionBlogs]);

  const getUser = async () => {
    let res = await AuthApi.getMyInfo();
    dispatch(setUser(res));
  };
  useEffect(() => {
    getUser;
  }, []);
  const handleChangeQuery = (event) => {
    setQuery(event.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    router.push(`/search?name=${query}`);
  };

  return (
    <div className="flex items-center gap-2 flex-1 justify-end">
      <div className="hover:cursor-pointer">
        <div className="drawer drawer-end">
          <input id="my-drawer-5" type="checkbox" className="drawer-toggle" />
          <div className="drawer-content">
            {/* Page content here */}
            <label htmlFor="my-drawer-5" className="drawer-button ">
              <CiSearch className="text-2xl md:text-3xl cursor-pointer" />
            </label>
          </div>
          <div className="drawer-side z-50">
            <label htmlFor="my-drawer-5" className="drawer-overlay"></label>
            <div className="menu py-8 px-6 w-80 h-full bg-base-100 text-base-content">
              <div className="flex items-center justify-between">
                <h2 className="font-bold text-lg">TÌM KIẾM</h2>
                <label
                  htmlFor="my-drawer-5"
                  className="drawer-button cursor-pointer"
                >
                  <IoMdClose className="text-2xl" />
                </label>
              </div>

              <form
                onSubmit={handleSubmit}
                name="search"
                className="flex items-center w-full mt-5 px-4 py-4 bg-base-200"
              >
                <input
                  value={query}
                  onChange={handleChangeQuery}
                  type="text"
                  placeholder="Tìm kiếm sản phẩm..."
                  className="w-full outline-none bg-base-200"
                />
                <BsSearch onClick={handleSubmit} className="text-2xl" />
              </form>
            </div>
          </div>
        </div>
      </div>
      <Link href={"/cart"}>
        {" "}
        <div className="flex items-center hover:cursor-pointer">
          <CiShoppingCart className="text-2xl md:text-3xl" />
          <span className="text-xs font-bold">{`(${cart.length})`}</span>
        </div>
      </Link>

      {user !== undefined ? (
        <div className="dropdown dropdown-bottom dropdown-end">
          <label tabIndex={0} className="cursor-pointer">
            <div className="avatar ">
              <div className="w-12 rounded-full">
                <img
                  className="w-12 rounded-full"
                  src={`https://ui-avatars.com/api/?background=0D8ABC&color=fff&name=${
                    user?.name ? user?.name : user?.email
                  }`}
                />
              </div>
            </div>
          </label>
          <ul
            tabIndex={0}
            className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52 z-10"
          >
            <li className={user?.role === "user" ? "hidden" : null}>
              <Link href={"/admin"}>Dashboard</Link>
            </li>
            <li>
              <Link href={"/profile"}>Thông tin cá nhân</Link>
            </li>
            <li>
              <Link href={"/history-order"}>Lịch sử đơn hàng</Link>
            </li>
            <li>
              <a
                onClick={() => {
                  dispatch(logout());
                  router.push("/");
                }}
              >
                Đăng xuất
              </a>
            </li>
          </ul>
        </div>
      ) : (
        <div className="flex items-center hover:cursor-pointer">
          {isLoading ? (
            <div>
              <DotCenter />
            </div>
          ) : (
            <button
              className="btn btn-primary btn-sm"
              onClick={() => {
                router.push("/login");
              }}
            >
              Đăng nhập
            </button>
          )}
        </div>
      )}

      {/* Chưa đăng nhập */}
      {/* <div className="flex items-center hover:cursor-pointer">
        <button className="btn btn-primary btn-sm">Đăng nhập</button>
      </div> */}

      {/* Đã đăng nhập */}

      <div className="hover:cursor-pointer block md:hidden">
        <div className="drawer drawer-end">
          <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
          <div className="drawer-content">
            {/* Page content here */}
            <label htmlFor="my-drawer-4" className="drawer-button ">
              <HiBars3 className="text-2xl md:text-3xl" />
            </label>
          </div>
          <div className="drawer-side z-50">
            <label htmlFor="my-drawer-4" className="drawer-overlay"></label>
            <ul className="menu p-4 w-64 h-full bg-base-100 text-base-content">
              <div className="flex items-center justify-between">
                <h2 className="font-bold text-lg">MENU</h2>
                <label
                  htmlFor="my-drawer-4"
                  className="drawer-button cursor-pointer"
                >
                  <IoMdClose className="text-2xl" />
                </label>
              </div>

              <ul className="mt-4">
                {navbar.map((item, index) =>
                  item.children ? (
                    <div
                      key={index}
                      className="py-1 font-bold capitalize text-lg"
                    >
                      <div className="flex items-center justify-between">
                        <p className="capitalize">{item.title}</p>
                        <div
                          onClick={() =>
                            setShowChild({
                              ...showChild,
                              [index]: !showChild[index],
                            })
                          }
                        >
                          {showChild[index] ? (
                            <BiChevronUp className="text-xl" />
                          ) : (
                            <BiChevronDown className="text-xl" />
                          )}
                        </div>
                      </div>
                      <ul
                        className={`ml-4 overflow-hidden`}
                        style={{
                          maxHeight: showChild[index]
                            ? `${heightLiChild * item.children.length}px`
                            : "0px",
                          transition: "max-height .25s ease",
                        }}
                      >
                        {item.children.map((element, index2) => (
                          <Link
                            key={index2}
                            href={
                              index == 0
                                ? `/collections${element.url}`
                                : `/blogs${element.url}`
                            }
                          >
                            <li className="capitalize text-md">
                              {element.title}
                            </li>
                          </Link>
                        ))}
                      </ul>
                    </div>
                  ) : (
                    <Link href={item.url} key={index}>
                      <li className="capitalize py-1 font-bold text-lg">
                        {item.title}
                      </li>
                    </Link>
                  )
                )}
              </ul>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeaderTool;
