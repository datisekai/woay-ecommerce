import React, { useState } from "react";
import { CiSearch, CiShoppingCart } from "react-icons/ci";
import { HiBars3 } from "react-icons/hi2";
import { BiChevronDown, BiChevronUp } from "react-icons/bi";
import { IoMdClose } from "react-icons/io";
import {BsSearch} from 'react-icons/bs'
import navbars from "../data/navbar";
import Link from "next/link";

const HeaderTool = () => {
  const heightLiChild = 28;

  const [showChild, setShowChild] = useState(false);

  return (
    <div className="flex items-center gap-2 flex-1 justify-end">
      <div className="hover:cursor-pointer">
        <div className="drawer drawer-end">
          <input id="my-drawer-5" type="checkbox" className="drawer-toggle" />
          <div className="drawer-content">
            {/* Page content here */}
            <label htmlFor="my-drawer-5" className="drawer-button ">
              <CiSearch className="text-2xl md:text-3xl" />
            </label>
          </div>
          <div className="drawer-side z-50">
            <label htmlFor="my-drawer-5" className="drawer-overlay"></label>
            <div className="menu py-8 px-6 w-80 h-full bg-base-100 text-base-content">
              <div className="flex items-center justify-between">
                <h2 className="font-bold text-lg">TÌM KIẾM</h2>
                <label htmlFor="my-drawer-5" className="drawer-button cursor-pointer">
                  <IoMdClose className="text-2xl" />
                </label>
              </div>

              <div className="flex items-center w-full mt-5 px-4 py-4 bg-base-200">
                <input
                  type="text"
                  placeholder="Tìm kiếm sản phẩm..."
                  className="w-full outline-none bg-base-200"
                />
                <BsSearch className="text-2xl"/>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex items-center hover:cursor-pointer">
        <CiShoppingCart className="text-2xl md:text-3xl" />
        <span className="text-xs font-bold">(2)</span>
      </div>
      <div className="hover:cursor-pointer block md:hidden">
        <div className="drawer drawer-end">
          <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
          <div className="drawer-content">
            {/* Page content here */}
            <label htmlFor="my-drawer-4" className="drawer-button ">
              <HiBars3 className="text-2xl md:text-3xl" />
            </label>
          </div>
          <div className="drawer-side">
            <label htmlFor="my-drawer-4" className="drawer-overlay"></label>
            <ul className="menu p-4 w-64 h-full bg-base-100 text-base-content">
              <div className="flex items-center justify-between">
                <h2 className="font-bold text-lg">MENU</h2>
                <label htmlFor="my-drawer-4" className="drawer-button cursor-pointer">
                  <IoMdClose className="text-2xl" />
                </label>
              </div>

              <ul className="mt-4">
                {navbars.map((navbar, index) =>
                  navbar.children ? (
                    <div
                      key={index}
                      className="py-1 font-bold capitalize text-lg"
                    >
                      <div className="flex items-center justify-between">
                        <p>{navbar.title}</p>
                        <div onClick={() => setShowChild(!showChild)}>
                          {showChild ? (
                            <BiChevronUp className="text-xl" />
                          ) : (
                            <BiChevronDown className="text-xl" />
                          )}
                        </div>
                      </div>
                      <ul
                        className={`ml-4 overflow-hidden`}
                        style={{
                          maxHeight: showChild
                            ? `${heightLiChild * navbar.children.length}px`
                            : "0px",
                          transition: "max-height .25s ease",
                        }}
                      >
                        {navbar.children.map((item, index) => (
                          <li className="uppercase" key={index}>
                            {item.title}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : (
                    <Link href={navbar.url} key={index}>
                      <li className="uppercase py-1 font-bold text-lg">
                        {navbar.title}
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