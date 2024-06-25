import { Link } from "react-router-dom";
import { formatDate } from "../../utils/fomatDate";

const SingleArticleCard = ({ article, style }) => {
  const maxContentLength = 180; // Adjust the maximum length of displayed content

  const truncatedContent =
    article.content.length > maxContentLength
      ? article.content.substring(0, maxContentLength) + "..."
      : article.content;

  return (
    <div
      className={` dark:bg-slate-500 h-[560px] w-[365px] m-5 bg-white shadow-lg rounded-lg ${style}`}
    >
      <img
        src={article.image}
        alt={article.titre}
        className="w-full h-48 object-cover"
      />

      <div className="p-6">
        <h1 className="dark:text-white text-2xl font-bold mb-4 ">
          {article.title}
        </h1>

        <div className="flex space-x-2 mb-4">
          <span className="text-gray-500 dark:text-softBlue">
            {article.name}
          </span>
        </div>

        <p className="text-gray-700 dark:text-white">{truncatedContent}</p>

        {article.content.length > maxContentLength && (
          <div className="mt-4">
            <p className="text-gray-500 dark:text-blue50">
              Published on {formatDate(article.publishedAt)}
            </p>
          </div>
        )}
        <Link
          to={`/singleArticleForGeust/${article._id}`}
          className=" dark:text-blue-400 text-teal-500 hover:underline"
        >
          Read More
        </Link>
      </div>
    </div>
  );
};

export default SingleArticleCard;
