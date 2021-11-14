import React from "react";

import { useParams } from "react-router-dom";

export const PublicDashboard = () => {
  const { slug } = useParams();
  return <div className="mt-24 ml-10">Slug :{slug}</div>;
};
