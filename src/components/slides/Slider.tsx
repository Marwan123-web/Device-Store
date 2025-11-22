import { useState } from "react";
import {useQueryFetch} from "../../hooks/useFetch";
import { SlideI } from "../../models/slide.interface";
import Slide from "./Slide";
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";
import Button from "../Shared/Button";
import { useTranslation } from "react-i18next";

const Slider = () => {
  const [currentSlide, setCurrentSlide] = useState(1);
  const id: string = "Slides";

  const {
    data: sliders,
    isLoading,
  } = useQueryFetch({
    id,
  });
  const { i18n } = useTranslation("common");

  const prevSlide = () => {
    setCurrentSlide(
      currentSlide === 0
        ? sliders.data.length - 1
        : (prevSlide) => prevSlide - 1
    );
  };
  const nextSlide = () => {
    setCurrentSlide(
      currentSlide === sliders.data.length - 1
        ? 0
        : (prevSlide) => prevSlide + 1
    );
  };

  if (isLoading)
    return (
      <p className="h-screen flex flex-col justify-center items-center text-2xl">
        Loading...
      </p>
    );
  return (
    <div className="frame relative overflow-x-hidden">
      <div
        className="slider relative "
        style={{
          transform: `translateX(${i18n.language === "en" ? "-" : ""}${
            100 * currentSlide
          }vw)`,
        }}
      >
        {sliders?.data?.map((image: SlideI) => (
          <Slide image={image} key={image.id} />
        ))}
      </div>
      <div className="btns absolute z-[1]  text-gray-50 bottom-[50%] w-screen ">
        <div className="flex  justify-between pr-5 pl-1 gap-10 ">
          <Button
            classes={
              "backdrop-blur-xl bg-black bg-opacity-50 text-sky-50 px-4 py-7"
            }
            ButtonFun={prevSlide}
          >
            <span>
              {i18n.language === "en" ? <BsArrowLeft /> : <BsArrowRight />}
            </span>
          </Button>

          <Button
            classes={
              "backdrop-blur-xl bg-black bg-opacity-50 text-sky-50 px-4 py-5"
            }
            ButtonFun={nextSlide}
          >
            <span>
              {i18n.language === "en" ? <BsArrowRight /> : <BsArrowLeft />}
            </span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Slider;
