import { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import axios from "axios";
import { toast } from "react-toastify";

import { Link } from "react-router-dom";
import { MdOutlineAddBox } from "react-icons/md";
import { BiEdit, BiInfoCircle, BiTrash } from "react-icons/bi";
import { FaChartLine } from "react-icons/fa";

import { Loader } from "../../components/loader/Loader";
import ArticlesCard from "../admin/article/ArticlesCard";
import { useSelector } from "react-redux";
import { selectUser } from "../../redux/features/auth/authSlice";

const EditorArticles = () => {
  const [EditorArticles, setEditorArticles] = useState([]);
  const [count, setCount] = useState();
  const [loading, setLoading] = useState(true);
  const user = useSelector(selectUser);
  const editorId = user?._id;

  useEffect(() => {
    const getEditorArticles = async () => {
      if (editorId) {
        console.log(editorId);
        try {
          const resp = await axios.get(
            `http://localhost:5000/api/articles/editor/${editorId}`
          );
          setEditorArticles(resp.data.editorArticles);
          setLoading(false);
          setCount(resp.data.count);
        } catch (error) {
          console.log(error);
          toast.error("We hit an error please try again later");
        }
      } else {
        setLoading(false);
      }
    };
    getEditorArticles();
  }, [editorId]);

  // Begin Pagination
  const itemsPerPage = 7;
  const [itemOffset, setItemOffset] = useState(0);

  const endOffset = itemOffset + itemsPerPage;
  const currentItems = EditorArticles.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(EditorArticles.length / itemsPerPage);
  // end pagination
  // Invoke when user click to request another page.
  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % EditorArticles.length;
    setItemOffset(newOffset);
  };

  return (
    <div>
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className="flex justify-between items-center">
            <h1 className="text-3xl my-8">Articles List</h1>

            <Link to="/createArticle" className="mr-4">
              <div className="flex flex-col items-center justify-center">
                <MdOutlineAddBox className="text-sky-800 text-4xl" />
                <h2 className="text-sky-600 text-lg font-bold">
                  {" "}
                  Add New Article
                </h2>
              </div>
            </Link>
          </div>
          <div className="w-9/12 mx-auto text-center mb-8">
            <p className="text-xl text-gray-900 mt-4">
              <span className=" text-blue-600 text-2xl font-bold">
                Editor Notice:
              </span>{" "}
              You are currently overseeing{" "}
              <span className="font-semibold text-blue-400">
                {count} articles you've written.
              </span>{" "}
            </p>
            <div className="flex flex-row items-center justify-center mt-4 ">
              <div className="mr-3">
                <FaChartLine size={50} className="text-cyan-700" />
              </div>
              <div className="ml-3">
                <div className="text-gray-700 text-xl  ">
                  Keep your readers engaged and informed by publishing fresh
                  content regularly.
                </div>
                <div className="text-gray-700 text-xl bg ">
                  New articles help drive traffic and build your online
                  presence.
                </div>
                <div className="text-gray-700 text-xl  ">
                  Quality articles position your company as a thought leader in
                  the industry.
                </div>
              </div>
            </div>

            <div className="mt-4 flex flex-col md:flex-row justify-evenly items-center">
              <div className="flex flex-row justify-center items-center my-1.5">
                <BiInfoCircle size={32} color="blue" />
                <div className="px-1 text-gray-600 text-lg">
                  to dive into Article details
                </div>
              </div>
              <div className="flex flex-row justify-center items-center my-1.5">
                <BiTrash size={32} color="red" />
                <div className="px-1 text-gray-600 text-lg">
                  to remove an <article></article>
                </div>
              </div>
              <div className="flex flex-row justify-center items-center my-1.5">
                <BiEdit size={32} color="yellow" />
                <p className="px-1 text-gray-600 text-lg">
                  to tweak an article
                </p>
              </div>
            </div>
          </div>
          <div>
            <ArticlesCard articles={currentItems} />
          </div>
        </>
      )}
      <ReactPaginate
        breakLabel="..."
        nextLabel="next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={pageCount}
        previousLabel="< previous"
        renderOnZeroPageCount={null}
        // Tailwind CSS classes
        containerClassName="flex items-center justify-center space-x-2"
        pageLinkClassName="py-2 px-3 leading-tight text-blue-600 bg-white rounded-md border border-blue-300 hover:bg-blue-100 hover:text-blue-700"
        previousLinkClassName="py-2 px-3 leading-tight text-white bg-blue-500 rounded-l hover:bg-blue-700"
        nextLinkClassName="py-2 px-3 leading-tight text-white bg-blue-500 rounded-r hover:bg-blue-700"
        breakLinkClassName="py-2 px-3 leading-tight text-blue-600 bg-white rounded-md border border-blue-300 hover:bg-blue-100 hover:text-blue-700"
        activeLinkClassName="py-2 px-3 leading-tight text-blue-900 bg-white rounded-md border border-blue-300 hover:bg-blue-100 hover:text-blue-700"
      />
    </div>
  );
};

export default EditorArticles;
