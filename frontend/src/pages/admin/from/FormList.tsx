import { useEffect, useState } from "react";
import axios from "axios";
import { Form } from "../../../types/types";

import { Loader } from "../../../components/loader/Loader";
import SingleForm from "./SingleForm";
import useRedirectOnlyAdmins from "../../../hooks/useRedirectOnlyAdmins";

const FormList = () => {
  useRedirectOnlyAdmins("/profile");
  const [forms, setForms] = useState<Form[]>([]);
  const [count, setCount] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getForms = async () => {
      try {
        const resp = await axios.get("http://localhost:5000/api/forms");
        setForms(resp.data.forms);
        setCount(resp.data.count);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    getForms();
  }, []);

  return (
    <div>
      {loading ? (
        <Loader />
      ) : (
        <div className="container mx-auto p-4">
          <h1 className="text-2xl font-bold mb-4 text-center">
            {" "}
            {count} Submitted Forms
          </h1>
          <div className="flex flex-wrap items-center justify-evenly">
            {forms.map((form, index) => (
              <SingleForm form={form} key={index} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default FormList;
