import { Link } from "react-router-dom";
import { GrFormNextLink } from "react-icons/gr";
import { useTranslation } from "react-i18next";

const Hero = () => {
  const { t } = useTranslation();
  return (
    <div className="pt-20 ">
      <div className="mx-auto w-11/12 flex flex-col items-center justify-between md:flex-row ">
        <div className="mx-auto w-11/12 bg-gray-100 rounded-lg flex flex-col items-center justify-center text-center md:w-6/12 dark:bg-slate-400">
          <div className="p-6">
            <h4
              className="lg:text-4xl text-2xl font-bold text-lightTeal mb-2  decoration-sky-500 dark:text-blue-800
            dark:decoration-blue-700
            "
            >
              {t("about_welcome")}
            </h4>
            <p className="text-gray-700 mb-4 dark:text-gray-50">
              {t("about_txt")}
            </p>
          </div>
          <div className="mx-auto w-10/12 md:w-7/12 pb-4 ">
            <Link
              to="/register"
              className="flex flex-row items-center justify-center w-2/3 md:1/3 px-4 py-2 mb-4 text-sm font-bold bg-blue-400 leading-6 capitalize duration-100 transform rounded-sm shadow cursor-pointer focus:ring-4 focus:ring-blue-700 focus:ring-opacity-50 focus:outline-none sm:mb-0 sm:w-auto sm:mr-4 md:pl-8 md:pr-6 xl:pl-12 xl:pr-10   hover:shadow-lg hover:-translate-y-1"
            >
              {t("join_btn")}

              <span className="ml-4">
                <GrFormNextLink />
              </span>
            </Link>
          </div>
        </div>
        <div className="mt-6 w-11/12 md:w-5/12">
          <h3 className="text-xl font-bold text-gray-500 mb-2 underline decoration-sky-500 dark:text-cyan-300">
            {t("snapshot_tile")}
          </h3>
          <p className="text-gray-700 mb-6  dark:text-white">
            {t("snapshot_txt")}
          </p>
          {/* Additional modern content */}
        </div>
      </div>
    </div>
  );
};

export default Hero;
