import { useTranslation } from "react-i18next";
import { ReactTyped } from "react-typed";

const Hero = () => {
  const { t } = useTranslation();
  return (
    <div className="mt-10">
      <div className="w-10/12 flex flex-col justify-center items-center mx-auto">
        <h2 className="text-5xl font-bold lg:text-7xl text-blue-500 ">
          {t("services")}
        </h2>

        <ReactTyped
          className="text-3xl lg:text-6xl text-sky-500 dark:text-title-gradient font-bold pl-2 dark:text-cyna mt-8 my-3"
          strings={[t("string1"), t("string2")]}
          typeSpeed={100}
          backSpeed={80}
          loop
        />

        <p className="p-3 text-center text-xl text-gray-500 dark:text-gray-50">
          {t("services_Intro")}
        </p>
        <div className="w-10/12 flex flex-row justify-between items-center">
          <h2 className=" md:text-xl text-md lg:text-3xl text-cyan-400 font-bold ">
            {t("adj1")}
          </h2>
          <h2 className=" md:text-xl lg:text-3xl text-cyan-400 font-bold ">
            {t("adj2")}
          </h2>
          <h2 className=" md:text-xl text-md lg:text-3xl text-cyan-400 font-bold ">
            {t("adj3")}
          </h2>
        </div>
      </div>
    </div>
  );
};
export default Hero;
