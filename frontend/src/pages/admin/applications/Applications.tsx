import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Loader } from "../../../components/loader/Loader";
import { Application } from "../../../types/types";
import useRedirectOnlyAdmins from "../../../hooks/useRedirectOnlyAdmins";
import { FaTrashCan } from "react-icons/fa6";
import { confirmAlert } from "react-confirm-alert";
import ReactPaginate, { ReactPaginateProps } from "react-paginate";
import { BiCheckCircle } from "react-icons/bi";

const Applications = () => {
  useRedirectOnlyAdmins("/profile");
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/applications"
        );
        setApplications(response.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
        toast.error("We had a problem please try again later");
      }
    };
    fetchApplications();
  }, []);
  // deleting
  const removeApp = async (id: string) => {
    try {
      await axios.delete(`http://localhost:5000/api/applications/${id}`);
      toast.success("Deleted successfully");
    } catch (error) {
      toast.error("Error deleting article");
    }
  };
  // Begin Pagination
  const itemsPerPage = 5;
  const [itemOffset, setItemOffset] = useState(0);

  const endOffset = itemOffset + itemsPerPage;
  const currentItems = applications.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(applications.length / itemsPerPage);
  // end pagination

  // Invoke when user click to request another page.
  const handlePageClick = (event: ReactPaginateProps["onPageChange"]) => {
    const newOffset = (event.selected * itemsPerPage) % applications.length;
    setItemOffset(newOffset);
  };
  const confirmDelete = (id: string) => {
    confirmAlert({
      title: "Delete This application",
      message: "Are you sure to do delete this application?",
      buttons: [
        {
          label: "Delete",
          onClick: () => removeApp(id),
        },
        {
          label: "Cancel",
          // onClick: () => alert("Click No"),
        },
      ],
    });
  };

  return (
    <div className="container mx-auto p-4">
      {loading ? (
        <Loader />
      ) : (
        <div className="m-4">
          <h1 className="text-2xl font-bold mb-4">
            Job Applications : you have {currentItems.length} application to
            check
          </h1>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-6 py-3 border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-medium">
                    Applicant Name
                  </th>
                  <th className="px-6 py-3 border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-medium">
                    Applicant Email
                  </th>
                  <th className="px-6 py-3 border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-medium">
                    Job Title
                  </th>
                  <th className="px-6 py-3 border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-medium">
                    CV
                  </th>
                  <th className="px-6 py-3 border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-medium">
                    <div className=" flex flex-col">
                      <p> Action</p>
                      <p>Accept / delete</p>
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white">
                {applications.map((application, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-6 py-4 border-b border-gray-200 text-sm">
                      {application.applicantName}
                    </td>
                    <td className="px-6 py-4 border-b border-gray-200 text-sm">
                      {application.applicantEmail}
                    </td>
                    <td className="px-6 py-4 border-b border-gray-200 text-sm">
                      {application.offerTitle}
                    </td>
                    <td className="px-6 py-4 border-b border-gray-200 text-sm">
                      <a
                        href={application.cv}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-800 hover:underline"
                      >
                        Download CV
                      </a>
                    </td>
                    <td className="px-6 py-4 border-b border-gray-200 text-sm">
                      <div className="flex flex-row-reverse justify-center items-center">
                        <span className="flex justify-center">
                          <FaTrashCan
                            size={27}
                            className="text-red-500 hover:text-red-700 cursor-pointer m-1"
                            onClick={() => confirmDelete(application._id)}
                          />
                        </span>
                        <span className="flex justify-center">
                          <BiCheckCircle
                            size={27}
                            className="text-green-500 hover:text-green-700 cursor-pointer m-1"
                            onClick={() => confirmDelete(application._id)}
                          />
                        </span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
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

export default Applications;
