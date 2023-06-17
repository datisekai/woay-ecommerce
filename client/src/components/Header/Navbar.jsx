import React, { useEffect } from "react";
import { BiChevronDown } from "react-icons/bi";
import navbars from "../data/navbar";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { getArrCategory } from "../../redux/slices/CategorySlice";

const Navbar = () => {
    const { arrCategory } = useSelector((state) => state.category);
    const dispatch = useDispatch();
    useEffect(() => {
        let action = getArrCategory();
        dispatch(action);
    }, []);
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
                                className="menu-child-navbar z-10 fixed  shadow bg-base-100 rounded-sm uppercase font-bold w-28 gap-y-2 transition-all"
                            >
                                {arrCategory?.map((item, index) => (
                                    <Link href={item.slug} key={index}>
                                        <li className="first:pt-3 hover:text-black border-b last:border-none hover:cursor-pointer pt-1 px-2 pb-2">
                                            {item.name}
                                        </li>
                                    </Link>
                                ))}
                            </ul>
                        </div>
                    ) : (
                        // <SanPhamDropdown title={"Sản phẩm"} key={index} />
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
