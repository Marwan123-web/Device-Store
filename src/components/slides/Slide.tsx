import { SlideI } from "../../models/slide.interface";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Slide = ({ image }: { image: SlideI }) => {
  const { t } = useTranslation("common");
  console.log("image?.src", image?.src);

  return (
    <div
      className={
        "slide h-full flex justify-center items-center" + ` slide${image?.id}`
      }
      key={image?.id}
    >
      <div className="slide-content flex flex-col gap-5 items-start pl-10 container mx-auto">
        <h1 className="text-7xl text-violet-50 font-medium w-4/5">
          {t(image?.headline)}
        </h1>
        <p className="text-gray-50 w-3/5">{t(image?.body)}</p>
        <Link
          to="/product"
          className="slide-cta text-violet-50  border mt-4 border-violet-50 hover:border-sky-400 hover:text-sky-500 duration-300 py-2 px-6"
        >
          {t(image?.cta)}
        </Link>
      </div>
    </div>
  );
};

export default Slide;
