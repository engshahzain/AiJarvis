import React from "react";

const ImageCard = ({ image, className, ...rest }) => {
  return (
    <div
      {...rest}
      className={`lg:w-[200px] md:w-[120px] md:h-[200px] w-[80px] h-[160px] lg:h-[300px] bg-[#030326]  rounded-2xl overflow-hidden cursor-pointer hover:shadow-2xl hover:shadow-blue-950 hover:border-white transition-all duration-150 group ease-in-out ${className}`}
    >
      <img
        src={image}
        className="h-full object-center  object-cover w-full group-hover:scale-105 transition-all duration-200 ease-in-out"
      />
    </div>
  );
};

export default ImageCard;
