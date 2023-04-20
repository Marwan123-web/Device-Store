import {
  FaGlobe,
  FaCertificate,
  FaPercentage,
  FaShieldAlt,
} from "react-icons/fa";
import { useTranslation } from "react-i18next";

const WhyUs = () => {
  const { t } = useTranslation("common");

  return (
    <section className=" bg-gray-50 pb-20">
      <div className="container mx-auto flex flex-col gap-5">
        <h2 className="text-4xl py-14 text-center font-semibold text-gray-700">
          {t("Why Choose Us")}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 justify-between">
          <div className="text-center  flex flex-col gap-3 bg-gray-100 py-10 px-4">
            <div className="flex justify-center">
              <FaGlobe className="text-7xl text-gray-700" />
            </div>
            <h1 className="text-2xl text-gray-900 font-semibold">
              {t("Worldwide Shipping")}
            </h1>
            <p className="text-gray-700 text-lg">
              {t("Worldwide Shipping text")}
            </p>
          </div>
          <div className="text-center flex flex-col gap-3 bg-gray-100 py-10 px-4">
            <div className="flex justify-center">
              <FaCertificate className="text-7xl text-gray-700" />
            </div>
            <h1 className="text-2xl font-semibold"> {t("Best Quality")}</h1>
            <p className="text-gray-700 text-lg">{t("Best Quality text")}</p>
          </div>
          <div className="text-center flex flex-col gap-3 bg-gray-100 py-10 px-4">
            <div className="flex justify-center">
              <FaPercentage className="text-7xl text-gray-700" />
            </div>
            <h1 className="text-2xl font-semibold"> {t("Best Offers")}</h1>
            <p className="text-gray-700 text-lg">{t("Best Offers text")}</p>
          </div>
          <div className="text-center flex flex-col gap-3 bg-gray-100 py-10 px-4">
            <div className="flex justify-center">
              <FaShieldAlt className="text-7xl text-gray-700" />
            </div>
            <h1 className="text-2xl font-semibold"> {t("Secure Payments")}</h1>
            <p className="text-gray-700 text-lg">{t("Secure Payments text")}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyUs;
