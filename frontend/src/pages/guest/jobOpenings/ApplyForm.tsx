import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { JobOffer } from "../../../types/types";
import { Loader } from "../../../components/loader/Loader";
import { formatDate } from "../../../utils/fomatDate";
import { useSelector } from "react-redux";
import { RootState } from "@reduxjs/toolkit/query";
import { toast } from "react-toastify";

const ApplyForm = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const [loading, setLoading] = useState(true);
  const [job, setJob] = useState<JobOffer | null>(null);
  const [file, setFile] = useState<File | null>(null);

  const { id } = useParams();

  // Assume we have user info from context or props
  // const user = {
  //   name: "John Doe", // Replace with actual user name
  //   email: "john.doe@example.com", // Replace with actual user email
  // };

  useEffect(() => {
    const getSingleJob = async (id: string) => {
      try {
        const resp = await axios.get(
          `http://localhost:5000/api/jobs/getJob/${id}`
        );
        setJob(resp.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching job details:", error);
      }
    };
    getSingleJob(id);
  }, [id]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) {
      toast.error("Please upload your CV.");
      return;
    }

    // Check if the file is a PDF
    if (file.type !== "application/pdf") {
      toast.error("Please upload a PDF file.");
      return;
    }
    const formData = new FormData();
    formData.append("cv", file);
    formData.append("applicantName", user?.name);
    formData.append("applicantEmail", user?.email);
    formData.append("offerTitle", job?.title);

    try {
      await axios.post(
        "http://localhost:5000/api/applications/apply",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      console.log("File uploaded successfully:");
      console.log(formData.get("name"));
      console.log(formData.get("email"));
      console.log(formData.get("cv"));
      toast.success("Application submitted successfully!");
    } catch (error) {
      console.error("Error uploading file:", error);
      toast.success("Failed to submit application.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      {loading ? (
        <Loader />
      ) : (
        <div className="max-w-md w-full space-y-8 bg-white shadow-lg rounded-lg p-10">
          <div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              {job?.title}
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              {job?.description}
            </p>
          </div>
          <div className="rounded-md shadow-sm space-y-4">
            <h2 className="text-xl font-semibold mb-2">Job Details:</h2>
            <p>
              <strong className="font-semibold">Required Qualification:</strong>{" "}
              {job?.requiredQualification}
            </p>
            <p>
              <strong className="font-semibold">Optional Qualification:</strong>{" "}
              {job?.optionalQualification}
            </p>
            <p>
              <strong className="font-semibold">Target Profile:</strong>{" "}
              {job?.targetProfile}
            </p>
            <p>
              <strong className="font-semibold">Contract Type:</strong>{" "}
              {job?.contractType}
            </p>
            <p>
              <strong className="font-semibold">Location Type:</strong>{" "}
              {job?.locationType}
            </p>
            <p>
              <strong className="font-semibold">Location Place:</strong>{" "}
              {job?.locationPlace}
            </p>
            <p>
              <strong className="font-semibold">Income:</strong>{" "}
              {job?.incomeValue} {job?.incomeCurrency} ({job?.incomePeriod})
            </p>
            <p>
              <strong className="font-semibold">Required Experience:</strong>{" "}
              {job?.yearsOfExperienceRequired} years
            </p>
            <p>
              <strong className="font-semibold">Author:</strong> {job?.author}
            </p>
            <p>
              <strong className="font-semibold">Published At:</strong>{" "}
              {formatDate(job?.publishedAt)}
            </p>
          </div>
          {user ? (
            <form onSubmit={handleSubmit} className="mt-8 space-y-6">
              <div>
                <label
                  htmlFor="cv"
                  className="block text-sm font-medium text-gray-700"
                >
                  Upload CV
                </label>
                <input
                  type="file"
                  id="cv"
                  onChange={handleFileChange}
                  required
                  className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
              <div>
                <button
                  type="submit"
                  className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Apply
                </button>
              </div>
            </form>
          ) : (
            <div>You have to register to apply</div>
          )}
        </div>
      )}
    </div>
  );
};

export default ApplyForm;
