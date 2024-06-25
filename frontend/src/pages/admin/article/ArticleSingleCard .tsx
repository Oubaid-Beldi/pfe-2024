import { Link, useNavigate } from "react-router-dom";
import { article } from "../../../types/types";
import { BiEdit, BiInfoCircle, BiTrash, BiCheckCircle } from "react-icons/bi";
import { formatDate } from "../../../utils/fomatDate";
import axios from "axios";
import { confirmAlert } from "react-confirm-alert";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { selectUser } from "../../../redux/features/auth/authSlice";

type Props = {
  article: article;
};

const ArticleSingleCard = ({ article }: Props) => {
  const user = useSelector(selectUser);
  const navigate = useNavigate();
  // approve article
  const approveArticle = async (id) => {
    try {
      await axios.patch(
        `http://localhost:5000/api/articles/approveArticle/${id}`
      );
      toast.success("Article approved successfully");
      navigate("/ManageArticles");
    } catch (error) {
      console.log(error);
      toast.error("We had a problem please try later");
    }
  };

  // Delete an article
  const removeArticle = async (id: string) => {
    try {
      await axios.delete(`http://localhost:5000/api/articles/${id}`);
      toast.success("Deleted successfully");
    } catch (error) {
      toast.error("Error deleting article");
    }
  };

  // Confirm the delete
  const confirmDelete = (id: string) => {
    confirmAlert({
      title: "Delete This Article",
      message: "Are you sure you want to delete this article?",
      buttons: [
        {
          label: "Delete",
          onClick: () => removeArticle(id),
        },
        {
          label: "Cancel",
        },
      ],
    });
  };

  return (
    <div className="bg-gray-100 p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow m-4 flex flex-row w-[455px] h-65 mx-2">
      <div className="flex-shrink-0">
        <img
          src={article.image}
          alt="Article"
          className="w-24 h-24 rounded-md"
        />
        <div className="mt-14">
          <div className="my-1">
            <Link to={`/EditArticleAdmin/${article._id}`}>
              <BiEdit className="text-yellow-500 cursor-pointer" size={24} />
            </Link>
          </div>
          <div className="my-1">
            <BiTrash
              className="text-red-500 cursor-pointer"
              size={24}
              onClick={() => confirmDelete(article._id)}
            />
          </div>
          {user?.role === "Web Editor" && (
            <div>
              {article.published === false ? (
                <h3 className="text-red-500 font-bold">Waiting for approval</h3>
              ) : (
                <h3 className="text-green-500 font-bold">Publihsed</h3>
              )}
            </div>
          )}
          {article.published === false && user?.role === "Admin" && (
            <div className="my-1">
              <BiCheckCircle
                className="text-green-500 cursor-pointer"
                size={24}
                onClick={() => approveArticle(article._id)}
              />
            </div>
          )}
        </div>
      </div>
      <div className="flex flex-col flex-grow justify-between ml-4">
        <div>
          <h2 className="text-xl font-bold text-gray-800">{article.title}</h2>
          <p className="text-sm text-gray-600 mt-1">
            {article.content.slice(0, 150)}
            {article.content.length > 150 ? "..." : ""}
          </p>
        </div>
        <div className="flex justify-between items-center mt-4">
          <div className="flex flex-col items-center justify-evenly my-8"></div>
          <div className="flex items-center text-sm text-gray-500">
            <span className="mr-2">Author: {article.author}</span>
            <span>Published: {formatDate(article.publishedAt)}</span>
          </div>
          <Link to={`/ArticleInfoAdmin/${article._id}`}>
            <BiInfoCircle className="text-blue-500" size={24} />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ArticleSingleCard;
