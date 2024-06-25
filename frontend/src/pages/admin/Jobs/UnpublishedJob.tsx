import { useEffect, useState } from "react";
import { Loader } from "../../../components/loader/Loader";

import { BiCheckCircle, BiEdit, BiInfoCircle, BiTrash } from "react-icons/bi";
import JobsCard from "./JobsCard";
import ReactPaginate from "react-paginate";
import axios from "axios";

const UnpublishedJob = () => {
  const [unpublishedJobs, setUnpublishedJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [count, setCount] = useState();
  useEffect(() => {
    const getUnpublished = async () => {
      const resp = await axios.get(
        "http://localhost:5000/api/jobs/getUnpublishedJobs"
      );
      console.log(resp.data);
      setCount(resp.data.count);
      setUnpublishedJobs(resp.data.UnpublishedJobs);
      setLoading(false);
    };
    getUnpublished();
  }, []);

  // Begin Pagination
  const itemsPerPage = 7;
  const [itemOffset, setItemOffset] = useState(0);

  const endOffset = itemOffset + itemsPerPage;
  const currentItems = unpublishedJobs.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(unpublishedJobs.length / itemsPerPage);
  // end pagination
  // Invoke when user click to request another page.
  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % unpublishedJobs.length;
    setItemOffset(newOffset);
  };
  return (
    <div>
      {loading ? (
        <Loader />
      ) : (
        <>
          <h1 className="text-3xl my-8">Jobs List</h1>

          <div className="w-9/12 mx-auto text-center mb-8">
            <p className="text-xl text-gray-900 mt-4">
              <span className=" text-blue-600 text-2xl font-bold">
                Administrator Notice:
              </span>{" "}
              You are currently overseeing{" "}
              <span className="font-semibold text-blue-400">
                {count} Job offer that waits for your Approval
              </span>{" "}
            </p>

            <div className="mt-4 flex flex-col md:flex-row justify-evenly items-center">
              <div className="flex flex-row justify-center items-center my-1.5">
                <BiInfoCircle size={32} color="blue" />
                <div className="px-1 text-gray-600 text-lg">
                  to dive into job details
                </div>
              </div>
              <div className="flex flex-row justify-center items-center my-1.5">
                <BiTrash size={32} color="red" />
                <div className="px-1 text-gray-600 text-lg">
                  to remove a job offer
                </div>
              </div>
              <div className="flex flex-row justify-center items-center my-1.5">
                <BiEdit size={32} color="yellow" />
                <p className="px-1 text-gray-600 text-lg">
                  to tweak an job offer
                </p>
              </div>
              <div className="flex flex-row justify-center items-center my-1.5">
                <BiCheckCircle size={32} color="green" />
                <p className="px-1 text-gray-600 text-lg">
                  to approve a job offer
                </p>
              </div>
            </div>
          </div>
          <div>
            <JobsCard jobs={currentItems} />
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

export default UnpublishedJob;
