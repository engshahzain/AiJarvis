import React, { useContext, useRef, useState } from "react";
import ImageCard from "../Common/ImageCard";
import Img1 from "../../assets/image1.png";
import Img2 from "../../assets/image2.jpg";

import Img4 from "../../assets/image4.png";
import Img5 from "../../assets/image5.png";
import Img6 from "../../assets/image6.jpeg";
import Img7 from "../../assets/image7.jpeg";

import { IoMdAddCircleOutline } from "react-icons/io";
import { UserdataContext } from "../../context/UserContext";
const CustomizePage = () => {
  const { selectImg, setSelectImg, selectBackendImg, setSelectBackendImg } =
    useContext(UserdataContext);
  const [imgIndex, setimgIndex] = useState(0);
  const InputImg = useRef();
  const Images = [
    Img1,
    Img2,
    Img4,
    Img5,
    Img6,
    Img7,
    Img1,
    Img2,
    Img4,
    Img5,
    Img6,
    Img7,
  ];

  const handleImage = (e) => {
    const file = e.target.files[0];
    console.log(e.target.files[0]);
    setSelectBackendImg(file);
    setSelectImg(URL.createObjectURL(file));
  };
  return (
    <div className="w-full min-h-[100vh] py-10 bg-gradient-to-t from-black to-blue-900 flex flex-col justify-center items-center">
      <h1 className="text-white lg:text-5xl md:text-3xl text-2xl lg:mb-10 md:mb-7 mb-5 font-bold font-serif ">
        Select Your Assistant Image
      </h1>
      <div className="w-full container flex flex-wrap gap-5 mx-auto justify-center items-center">
        {Images.map((item, index) => (
          <ImageCard
            onClick={() => {
              setSelectImg(item);
              setimgIndex(index);
              console.log(selectImg);
            }}
            image={item}
            key={index}
            className={`${imgIndex === index ? "border-white border-2 scale-105 " : "border-[blue] border"}`}
          />
        ))}
        <div
          onClick={() => InputImg.current.click()}
          className="lg:w-[200px] md:w-[120px] md:h-[200px] w-[80px] h-[160px] lg:h-[300px]  flex items-center justify-center bg-[#030326] border-2 border-[blue] rounded-2xl overflow-hidden cursor-pointer hover:shadow-2xl hover:shadow-blue-950 hover:border-white transition-all duration-150 group ease-in-out"
        >
          {!selectBackendImg ? (
            <IoMdAddCircleOutline className="text-white lg:text-5xl text-2xl" />
          ) : (
            <img
              src={selectImg}
              className="h-full object-center  object-cover w-full group-hover:scale-105 transition-all duration-200 ease-in-out"
            />
          )}

          <input
            onChange={handleImage}
            type="file"
            accept="image/*"
            hidden
            ref={InputImg}
            name=""
            id=""
          />
        </div>
      </div>
      <button className="bg-white px-10 py-3 font-sans font-bold rounded-full mt-5">
        Next
      </button>
    </div>
  );
};

export default CustomizePage;
