import dynamic from "next/dynamic";
import Link from "next/link";
import React from "react";

const HeaderTool = dynamic(
  () => import('./HeaderTool'),
  { ssr: false }
)

const HeaderTop = () => {
  return (
    <div className="flex items-center justify-between max-w-[1200px] mx-auto px-2">
      <div className="hidden md:block flex-1"></div>
      <div className="flex-1 flex justify-start md:justify-center">
        <Link href={"/"}>
          <h1 className=" font-bold text-2xl md:text-4xl">MISSOUT</h1>
        </Link>
      </div>
      <HeaderTool />
    </div>
  );
};

export default HeaderTop;
