import React from "react";

import { useParams } from "react-router-dom";

import Navbar from "../Navbar";

export const AttemptQuiz = () => {
  const { slug } = useParams();

  return (
    <div>
      <Navbar />
      Slug:{slug}
    </div>
  );
};
