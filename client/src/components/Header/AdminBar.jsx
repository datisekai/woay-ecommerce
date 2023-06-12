import React from "react";
import { useRouter } from "next/router";
import adminbars from "../data/adminbar";
import Link from "next/link";

const AdminBar = () => {
  const router = useRouter();

  return (
    <div className="py-4 border-r w-[250px]">
      <h1 className="text-center font-bold text-2xl md:text-3xl text-neutral">
        ADMIN
      </h1>
      <div className="divider"></div>
      <ul>
        {adminbars.map((adminbar, index) => {
          const Icon = adminbar.icon;
          return (
            <Link  href={`/admin${adminbar.url}`}>
              <li
                key={index}
                className={`px-4 py-3 flex items-center gap-4 hover:bg-base-200 font-bold hover:cursor-pointer ${
                  `/admin${adminbar.url}` === router.asPath
                    ? "bg-base-200"
                    : "bg-base-100"
                }`}
              >
                <Icon className="text-2xl" />
                <span>{adminbar.title}</span>
              </li>
            </Link>
          );
        })}
      </ul>
    </div>
  );
};

export default AdminBar;
