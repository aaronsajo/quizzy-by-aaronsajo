import React, { useEffect, useState } from "react";

import { Typography } from "@bigbinary/neetoui/v2";
import { useParams } from "react-router-dom";

import quizzesApi from "apis/quizzes";

import Navbar from "../Navbar";

export const PublicDashboard = () => {
  const { slug } = useParams();
  const [id, setId] = useState(null);
  const checkSlug = async () => {
    const response = await quizzesApi.checkSlug(slug);
    setId(response.data.id);
    if (response.data.id) {
      window.location.href = `/public/${slug}/attempt/new`;
    }
  };
  useEffect(() => {
    checkSlug();
  }, []);
  if (!id) {
    return (
      <div>
        <Navbar />
        <div className="ml-8 px-2 mt-4">
          <Typography style="h1" className="flex justify-center mt-40 pt-10">
            Invalid Qiuz
          </Typography>
        </div>
      </div>
    );
  }

  return <div className="mt-24 ml-10">Slug :{slug}</div>;
};
