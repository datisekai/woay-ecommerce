import Link from "next/link";
import React from "react";
import AdminBar from "./AdminBar";

const HeaderAdmin = () => {
  return (
    <div className="navbar bg-base-100">
      <div className="navbar-start">
        {/* Icon Bar in PC */}
        <div className="btn btn-ghost btn-circle hidden md:flex">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h7"
            />
          </svg>
        </div>

        {/* Icon bar and drawer in mobile */}
        <div className="drawer flex md:hidden">
          <input id="my-drawer" type="checkbox" className="drawer-toggle " />
          <div className="drawer-content">
            <label
              htmlFor="my-drawer"
              className="drawer-button  btn btn-ghost btn-circle"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h7"
                />
              </svg>
            </label>
          </div>
          <div className="drawer-side z-50">
            <label htmlFor="my-drawer" className="drawer-overlay"></label>
            <ul className="bg-base-100 h-full">
              <AdminBar />
            </ul>
          </div>
        </div>
      </div>
      <div className="navbar-center">
        <a className="btn btn-ghost normal-case text-xl text-neutral">
          MISSOUT
        </a>
      </div>
      <div className="navbar-end">
        <div className="dropdown dropdown-end">
          <label tabIndex={0} className=" ">
            <div className="avatar cursor-pointer">
              <div className="w-12 mask mask-squircle">
                <img src="https://ui-avatars.com/api/?name=John+Doe" />
              </div>
            </div>
          </label>
          <ul
            tabIndex={0}
            className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52"
          >
            <li>
              <Link href="/profile">Profile</Link>
            </li>
            <li>
              <Link href="/logout">Logout</Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default HeaderAdmin;
