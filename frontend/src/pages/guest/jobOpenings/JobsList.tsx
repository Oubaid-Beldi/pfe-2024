import { JobOffer } from "../../../types/types";
import OfferCard from "./OfferCard";
type Props = {
  jobs: JobOffer[];
};
const JobsList = ({ jobs }: Props) => {
  return (
    <div>
      <div className="w-10/12 mx-auto flex flex-wrap flex-row justify-evenly items-center">
        {jobs.map((job, index) => {
          return <OfferCard key={index} offer={job} />;
        })}
      </div>
    </div>
  );
};
export default JobsList;
