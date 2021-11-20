import React, { useEffect, useState } from "react";

import { Download } from "@bigbinary/neeto-icons";
import { Button } from "@bigbinary/neetoui/v2";

import usersApi from "apis/users";

import ReportTable from "./ReportTable";

import quizzesApi from "../../apis/quizzes";
import Navbar from "../Navbar";

export const Report = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
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
  const handleReportDownload = async () => {
    try {
      setLoading(true);
      const reponse = await usersApi.report_export();
      const jobId = reponse.data.jid;
      const interval = setInterval(async () => {
        const jobStatus = await usersApi.export_status(jobId);
        if (jobStatus.data.status === "complete") {
          setLoading(false);
          clearInterval(interval);
          window.location.href = `/export_download/${jobId}`;
        }
      }, 1000);
    } catch (err) {
      logger.error(err);
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchDetails();
  }, []);
  if (loading) {
    return <h1>Loading...</h1>;
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
            onClick={handleReportDownload}
          />
        </div>
        <h2 className="text-gray-600">Reports</h2>
        <ReportTable reportData={data} />
      </div>
    </div>
  );
};
