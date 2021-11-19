import React, { useEffect, useState } from "react";

import { Download } from "@bigbinary/neeto-icons";
import { Button } from "@bigbinary/neetoui/v2";

import ReportTable from "./ReportTable";

import quizzesApi from "../../apis/quizzes";
import Navbar from "../Navbar";

export const Report = () => {
  const [data, setData] = useState([]);
  const fetchDetails = async () => {
    try {
      const response = await quizzesApi.report();
      const unfilteredData = response.data.quizzes;
      const filteredData = unfilteredData
        .map(quizData => {
          return quizData.attempts;
        })
        .flat();
      setData(filteredData);
    } catch (error) {
      logger.error(error);
    }
  };

  useEffect(() => {
    fetchDetails();
  }, []);

  return (
    <div>
      <Navbar />
      <div className="ml-16 mt-10">
        <div className="absolute right-0 mr-20 mt-4">
          <Button
            label="Download"
            size="large"
            icon={Download}
            iconPosition="left"
            style="secondary"
            to="/"
          />
        </div>
        <h2 className="text-gray-600">Reports</h2>
        <ReportTable reportData={data} />
      </div>
    </div>
  );
};
