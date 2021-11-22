import React, { useEffect, useState } from "react";

import { Download } from "@bigbinary/neeto-icons";
import { PageLoader, Button, Typography } from "@bigbinary/neetoui/v2";

import reportsApi from "apis/reports";

import Navbar from "../Navbar";

export const ReportDownload = () => {
  const [loading, setLoading] = useState(false);
  const [jobId, setJobId] = useState();
  const handleReportDownload = async () => {
    try {
      setLoading(true);
      const reponse = await reportsApi.report_export();
      const job_id = reponse.data.jid;
      setJobId(job_id);
      const interval = setInterval(async () => {
        const jobStatus = await reportsApi.export_status(job_id);
        if (jobStatus.data.status === "complete") {
          setLoading(false);
          clearInterval(interval);
        }
      }, 1000);
    } catch (err) {
      logger.error(err);
      setLoading(false);
    }
  };
  useEffect(() => {
    handleReportDownload();
  }, []);
  if (loading) {
    return (
      <div>
        <Navbar />
        <Typography style="h1" className="ml-32 mt-20 text-gray-600">
          Reports
        </Typography>
        <div className="mt-48">
          <PageLoader text="Your report is being prepared for downloading" />
        </div>
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      <Typography style="h1" className="ml-32 mt-20 text-gray-600">
        Reports
      </Typography>
      <div className="pt-12 mt-40 ">
        <Typography style="h2" className="flex justify-center">
          Report is now ready for download.
        </Typography>
        <div className="flex justify-center">
          <Button
            label="Download"
            size="large"
            icon={Download}
            iconPosition="left"
            className="mt-8"
            style="secondary"
            onClick={() => {
              window.location.href = `/export_download/${jobId}`;
            }}
          />
        </div>
      </div>
    </div>
  );
};
