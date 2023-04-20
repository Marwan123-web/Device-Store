import Herotext from "../components/Shared/Herotext";
import OurTeam from "../components/US/OurTeam";
import WhyUs from "../components/US/WhyUs";
import { useTranslation } from "react-i18next";

const About = () => {
  const { t } = useTranslation("common");
  return (
    <>
      <Herotext text="About Us" />
      <section className=" bg-gray-50 py-20 px-20 ">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-2">
          <div className="flex flex-col justify-center">
            <div className="flex flex-col gap-3">
              <h1 className="text-6xl font-semibold text-gray-700">
                {t("Who we are?")}
              </h1>
              <p className="text-lg text-gray-700">{t("desctext")}</p>
            </div>
          </div>
          <div>
            <img className="w-[80%] mx-auto aboutImg" alt="team img" />
          </div>
        </div>
      </section>
      {/* <OurTeam /> */}
      <WhyUs />
    </>
  );
};

export default About;
