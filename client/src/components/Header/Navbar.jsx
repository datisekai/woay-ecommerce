import React from "react";
import { BiChevronDown } from "react-icons/bi";
import navbars from "../data/navbar";
import Link from "next/link";
import SanPhamDropdown from "../dropdown/SanPhamDropdown";

const Navbar = () => {
    return (
        <div className=" hidden md:block">
            <ul className="flex items-center mt-4 justify-center gap-6 ">
                {navbars.map((navbar, index) =>
                    navbar.children ? (
                        <div className="menu-navbar relative" key={index}>
                            <li className="flex hover:cursor-pointer slip-left-to-right  pb-2 items-end uppercase font-bold">
                                <span>Sản phẩm</span>
                                <BiChevronDown className="text-xl" />
                            </li>
                            <ul
                                tabIndex={0}
                                className="menu-child-navbar  fixed  shadow bg-base-100 rounded-sm uppercase font-bold w-28 gap-y-2 transition-all"
                            >
                                {navbar.children.map((item, index) => (
                                    <Link href={item.url} key={index}>
                                        <li className="first:pt-3 hover:text-black border-b last:border-none hover:cursor-pointer pt-1 px-2 pb-2">
                                            {item.title}
                                        </li>
                                    </Link>
                                ))}
                            </ul>
                        </div>
                    ) : (
                        // <SanPhamDropdown title="Sản phẩm" key={index} />
                        <Link key={index} href={navbar.url}>
                            <li className="flex hover:cursor-pointer slip-left-to-right relative pb-2 items-end uppercase font-bold">
                                {navbar.title}
                            </li>
                        </Link>
                    )
                )}
            </ul>
        </div>
    );
};

export default Navbar;
