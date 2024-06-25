// OfferCard.js

import { MdPlace } from "react-icons/md";
import { JobOffer } from "../../../types/types";
import { Link } from "react-router-dom";
type Props = {
  offer: JobOffer;
};

const OfferCard = ({ offer }: Props) => {
  const formatDate = (dateString: Date) => {
    // Extracting day, month, and year from the date string
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();

    // Formatting the date as 'mm/dd/yyyy'
    return `${month}/${day}/${year}`;
  };

  return (
    <div className="bg-gray-50 m-4 rounded-lg shadow-lg p-6 w-80 hover:bg-gray-100 hover:shadow-blue-300 dark:bg-gray-200 border-gray-200 border  ">
      <div className="flex justify-between items-center mb-2">
        <div>
          <div>
            <h1 className="text-xl font-semibold text-blue-400 dark:text-cyan">
              {offer.title}
            </h1>
          </div>

          <div className="p-2 text-gray-400 flex flex-col">
            <MdPlace className="text-gray-600 text-center flex flex-row justify-center items-center w-1/3 dark:text-black" />
            <p className="dark:text-black">{offer.locationType}</p>
          </div>
        </div>
        <div className="text-gray-400 dark:text-gray-300">
          {formatDate(offer.publishedAt)}
        </div>
      </div>
      <hr className="border-t border-gray-200 mb-4" />
      <div>
        <p className="text-gray-700 mb-4 dark:text-white">
          {offer.description}
        </p>
        <p className="text-violet-400 underline dark:text-violet-700">
          Contract Type: {offer.contractType}
        </p>
      </div>
      <div className="mt-4 mx-auto text-center">
        <button className="bg-white hover:bg-blue-500 hover:text-white w-2/3 text-gray-800 px-4 py-2 rounded-md border border-gray-300 shadow-lg shadow-gray-400 hover:shadow-lg hover:-translate-y-1">
          <Link to={`/offerApplication/${offer._id}`}>Apply Now</Link>
        </button>
      </div>
    </div>
  );
};

export default OfferCard;
