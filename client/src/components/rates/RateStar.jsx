import React from "react";
import { FaStar } from "react-icons/fa";

const RateStar = ({ star = 0, size = 'text-xl md:text-2xl' }) => {
  return (
    <div className="flex items-center">
      {Array.from(Array(5).keys()).map((item,index) => (
        <FaStar key={index} className={`${size} ${index + 1 <= star ? 'text-[#EE4D2D]' : ''}`}/>
      ))}
    </div>
  );
};



export default RateStar;
