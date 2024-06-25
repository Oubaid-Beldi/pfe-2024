import { useSnackbar } from "notistack";
import useRedirectOnlyAdmins from "../../../hooks/useRedirectOnlyAdmins";
import useRedirectLoggedOutUser from "../../../hooks/userRedirectLoggedOutUser";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { JobOffer } from "../../../types/types";
import axios from "axios";

import { Loader } from "../../../components/loader/Loader";

const ShowJob = () => {
  const [loading, setLoading] = useState(true);
  useRedirectLoggedOutUser("/login");
  useRedirectOnlyAdmins("/profile");
  const { enqueueSnackbar } = useSnackbar();
  const { id } = useParams();
  const [job, setJob] = useState<JobOffer | undefined>();
  useEffect(() => {
    const getJobById = async () => {
      try {
        const resp = await axios.get(
          `http://localhost:5000/api/jobs/getJob/${id}`
        );
        setJob(resp.data);
        setLoading(false);
        enqueueSnackbar("Here are the details for the current job offer", {
          variant: "info",
        });
      } catch (error) {
        console.error(error);
        enqueueSnackbar(
          "Oops! We hit a snag while retrieving the job information",
          {
            variant: "error",
          }
        );
      }
    };
    getJobById();
  }, [id, enqueueSnackbar]);

  return (
    <div>
      {loading || !job ? (
        <Loader />
      ) : (
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="p-8">
            <h3 className="text-2xl text-indigo-600 font-bold">{job.title}</h3>
            <p className="mt-2 text-gray-700">{job.description}</p>
            <div className="mt-4">
              <span className="text-indigo-600 font-semibold">Benefits:</span>
              <p className="text-gray-600">{job.benefits}</p>
            </div>
            <div className="mt-4">
              <h4 className="text-lg text-indigo-600 font-semibold">
                Target Profile:
              </h4>
              <p className="text-gray-600">{job.targetProfile}</p>
            </div>
            <div className="mt-4">
              <h4 className="text-lg text-indigo-600 font-semibold">
                Qualifications:
              </h4>
              <p className="text-gray-600">
                Required: {job.requiredQualification}
              </p>
              <p className="text-gray-600">
                Optional: {job.optionalQualification}
              </p>
            </div>
            <div className="mt-4">
              <h4 className="text-lg text-indigo-600 font-semibold">
                Experience:
              </h4>
              <p className="text-gray-600">
                Required: {job.yearsOfExperienceRequired} years
              </p>
              <p className="text-gray-600">
                Recommended: {job.yearsOfExperienceRecommanded} years
              </p>
            </div>
            <div className="mt-4">
              <h4 className="text-lg text-indigo-600 font-semibold">
                Location:
              </h4>
              <p className="text-gray-600">
                {job.locationType} - {job.locationPlace}
              </p>
            </div>
            <div className="mt-4">
              <h4 className="text-lg text-indigo-600 font-semibold">
                Contract:
              </h4>
              <p className="text-gray-600">
                {job.contractType} - {job.contractDuration}
              </p>
            </div>
            <div className="mt-4">
              <h4 className="text-lg text-indigo-600 font-semibold">Income:</h4>
              <p className="text-gray-600">
                {job.incomeValue} {job.incomeCurrency} / {job.incomePeriod}
              </p>
            </div>
            <div className="mt-4">
              <h4 className="text-lg text-indigo-600 font-semibold">
                Published:
              </h4>
              <p className="text-gray-600">
                {new Date(job.publishedAt).toLocaleDateString()} by {job.author}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShowJob;
