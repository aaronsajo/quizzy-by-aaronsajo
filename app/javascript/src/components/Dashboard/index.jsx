import React, { useState, useEffect } from "react";

import { Plus } from "@bigbinary/neeto-icons";
import { Button } from "@bigbinary/neetoui/v2";

import quizzesApi from "apis/quizzes";

import Navbar from "../Navbar";

const Dashboard = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchQuizzes = async () => {
    try {
      const response = await quizzesApi.list();

      setQuizzes(response.data.quiz);
      setLoading(false);
    } catch (error) {
      logger.error(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuizzes();
  }, []);
  if (loading) {
    return (
      <div>
        <Navbar />
        <h1>Loading...</h1>
      </div>
    );
  }

  if (!quizzes) {
    return (
      <div>
        <Navbar />
        <div className="absolute right-0 mr-20 mt-4 bg-blue-800">
          <Button
            label="Add new quiz"
            size="large"
            icon={Plus}
            iconPosition="left"
            style="secondary"
            onClick={() => (window.location.href = "/quiz/create")}
          />
        </div>
        <div className="flex justify-center mt-40 pt-10">
          {!quizzes && <h1>You have created no Quizzes</h1>}
        </div>
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      <div className="absolute right-0 mr-20 mt-4 bg-blue-800">
        <Button
          label="Add new quiz"
          size="large"
          icon={Plus}
          iconPosition="left"
          style="secondary"
          onClick={() => (window.location.href = "/quiz/create")}
        />
      </div>
      <div></div>
      <div className="mt-24 ml-24">
        <h2>The Quiz:</h2>
        {quizzes.map((d, i) => (
          <div key={i}>
            <h2>
              {i + 1}.{d.title}
            </h2>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
