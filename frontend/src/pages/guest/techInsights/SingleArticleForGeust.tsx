import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Loader } from "../../../components/loader/Loader";
// import { io } from "socket.io-client";
// const socket = io("/", {
//   reconnection: true,
// });

const SingleArticleForGeust = () => {
  // useEffect(() => {
  //   console.log("Socket io", socket.id);
  // });
  const { id } = useParams();
  const [article, setArticle] = useState();
  const [loading, setLoading] = useState(true);
  // const [commentsRealTime, setCommentsRealTime] = useState([]);
  // const [comment, setComment] = useState("");
  // const [comments, setComments] = useState([]);
  // const [commentsRealTime, setCommentsRealTime] = useState([]);
  useEffect(() => {
    const getArticle = async () => {
      console.log(id);
      const resp = await axios.get(`http://localhost:5000/api/articles/${id}`);
      setLoading(false);

      console.log(resp.data);
      setArticle(resp.data);
      // setComments(resp.data.comments)
    };
    getArticle();
  }, [id]);
  // const { title, content, author, publishedAt, imageUrl } = article;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-10 mt-10 rounded-md">
      {loading ? (
        <Loader />
      ) : (
        <div className="w-11/12 md:w-8/12 lg:w-6/12 bg-white shadow-md rounded-lg overflow-hidden">
          <div className="relative h-96">
            <img
              src={article?.image}
              alt={article?.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-0 left-0 bg-black bg-opacity-50 w-full py-4 px-6">
              <h1 className="text-3xl font-bold text-white">
                {article?.title}
              </h1>
              <div className="flex items-center justify-between text-gray-300 mt-2">
                <span className="text-sm">By {article?.author}</span>
                <span className="text-sm">
                  {new Date(article?.publishedAt).toLocaleDateString()}
                </span>
              </div>
            </div>
          </div>

          <div className="p-6">
            <div className="text-gray-800 leading-relaxed">
              {article?.content}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default SingleArticleForGeust;
