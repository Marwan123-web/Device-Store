import { useState } from "react";
import FetchHook from "../../hooks/FetchHook";
import { SlideI } from "../../models/slide";
import Slide from "./Slide";
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";

const Slider = () => {
  const [currentSlide, setCurrentSlide] = useState(1);
  const id: string = "Slides";

  const sliders: any = FetchHook(id);

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

  return (
    <div className="frame relative overflow-x-hidden">
      <div
        className="slider relative "
        style={{ transform: `translateX(-${100 * currentSlide}vw)` }}
      >
        {sliders?.data?.map((image: SlideI) => (
          <Slide image={image} key={image.id} />
        ))}
      </div>
      <div className="btns absolute z-[1]  text-gray-50 bottom-[50%] w-screen ">
        <div className="flex  justify-between pr-5 pl-1 gap-10 ">
          <button
            onClick={prevSlide}
            className="backdrop-blur-xl bg-black bg-opacity-50 text-sky-50 px-4 py-7"
          >
            <span>
              <BsArrowLeft />
            </span>
          </button>

          <button
            onClick={nextSlide}
            className="backdrop-blur-xl bg-black bg-opacity-50 text-sky-50 px-4 py-5"
          >
            <span>
              <BsArrowRight />
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Slider;
