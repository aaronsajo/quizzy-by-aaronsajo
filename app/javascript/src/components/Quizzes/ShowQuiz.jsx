import React, { useEffect, useState } from "react";

import { Plus } from "@bigbinary/neeto-icons";
import { Button, Typography } from "@bigbinary/neetoui/v2";
import { useParams } from "react-router-dom";

import quizzesApi from "apis/quizzes";

import Navbar from "../Navbar";

export const ShowQuiz = () => {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const fetchQuizDeatils = async () => {
    try {
      const response = await quizzesApi.show(id);
      setTitle(response.data.quiz.title);
    } catch (error) {
      logger.error(error);
    }
  };
  useEffect(() => {
    fetchQuizDeatils();
  }, []);
  return (
    <div>
      <Navbar />
      <div className="ml-8 px-2 mt-4">
        <div className="absolute right-0 mr-20 mt-4">
          <Button
            label="Add questions"
            size="large"
            icon={Plus}
            iconPosition="left"
            style="secondary"
            to={`/quiz/${id}/addquestion`}
          />
        </div>
        <Typography style="h2" className="mt-4">
          {title}
        </Typography>
        <Typography style="h3" className="flex justify-center mt-40 pt-10">
          There are no questions in this quiz
        </Typography>
      </div>
    </div>
  );
};
