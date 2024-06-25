import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { article } from "../../../types/types";
import { formatDate } from "../../../utils/fomatDate";
import { Loader } from "../../../components/loader/Loader";

const ShowArticle = () => {
  const [loading, setLoading] = useState(true);
  const [article, setArticle] = useState<article>();
  const { id } = useParams();
  useEffect(() => {
    const getArticle = async () => {
      try {
        const resp = await axios.get(
          `http://localhost:5000/api/articles/${id}`
        );
        setArticle(resp.data);
        setLoading(false);
      } catch (error) {
        toast.error("Errro when fetchin data please try again");
      }
    };
    getArticle();
  }, [id]);
  return (
    <div>
      {loading ? (
        <Loader />
      ) : (
        <div className="">
          <div className="bg-gray-100 mx-auto w-8/12 p-4 rounded-lg lg:w-6/12 shadow-md hover:shadow-lg transition-shadow m-4 ">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-black">
                {article?.title}
              </h2>
            </div>
            <div className="flex justify-between items-center mt-2">
              <div className="flex items-center text-base text-gray-700">
                <span className="mr-2 text-lg">Author: {article?.author}</span>
                <span>Published: {formatDate(article?.publishedAt)}</span>
              </div>
            </div>
            <img
              src={article?.image}
              alt="Article"
              className="w-full rounded-md mt-4"
            />
            <p className="text-base text-gray-700 mt-4">{article?.content}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShowArticle;
