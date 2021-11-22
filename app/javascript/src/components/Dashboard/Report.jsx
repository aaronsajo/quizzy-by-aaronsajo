import React, { useEffect, useState } from "react";

import { Download } from "@bigbinary/neeto-icons";
import { Button, PageLoader } from "@bigbinary/neetoui/v2";

import ReportTable from "./ReportTable";

import quizzesApi from "../../apis/quizzes";
import Navbar from "../Navbar";

export const Report = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const fetchDetails = async () => {
    try {
      setLoading(true);
      const response = await quizzesApi.report();
      const unfilteredData = response.data.quizzes;
      const filteredData = unfilteredData
        .map(quizData => {
          return quizData.attempts;
        })
        .flat();
      setData(filteredData);
      setLoading(false);
    } catch (error) {
      logger.error(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDetails();
  }, []);
  if (loading) {
    return (
      <div>
        <Navbar />
        <div className="flex justify-center mt-32">
          <PageLoader />
        </div>
      </div>
    );
  }

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
            to="/quiz/attempt/report/download"
            // onClick={handleReportDownload}
          />
        </div>
        <h2 className="text-gray-600">Reports</h2>
        <ReportTable reportData={data} />
      </div>
    </div>
  );
};
