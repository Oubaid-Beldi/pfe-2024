import { useTranslation } from "react-i18next";
import SingleNavLink from "./SingleNavLink";

const Linkslist = () => {
  const { t } = useTranslation();
  const linkValues = [
    { value: t("Home"), path: "/" },
    { value: t("Services"), path: "/services" },
    { value: t("Get_in_Touch"), path: "/about" },
    { value: t("Tech_Insights"), path: "/techInsight" },
    { value: t("Job_Openings"), path: "/careers" },
  ];

  return (
    <div className="hidden  h-full xl:flex flex-row text-lg justify-evenly items-center w-10/12 text-gray-700">
      {linkValues.map((link, index) => (
        <SingleNavLink key={index} value={link.value} path={link.path} />
      ))}
    </div>
  );
};
export default Linkslist;
