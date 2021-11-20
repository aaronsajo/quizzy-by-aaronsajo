import React, { useState, useEffect } from "react";

import { Plus } from "@bigbinary/neeto-icons";
import { Button } from "@bigbinary/neetoui/v2";
import { PageLoader } from "@bigbinary/neetoui/v2";

import quizzesApi from "apis/quizzes";

import Navbar from "../Navbar";
import { Table } from "../Table/Table";

const Dashboard = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchQuizzes = async () => {
    try {
      const response = await quizzesApi.list();

      setQuizzes(response.data.quizzes);
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
        <div className="mt-48">
          <PageLoader />
        </div>
      </div>
    );
  }

  if (quizzes.length === 0) {
    return (
      <div>
        <Navbar />

        <div className="absolute right-0 mr-20 mt-4 ">
          <Button
            label="Add new quiz"
            size="large"
            icon={Plus}
            iconPosition="left"
            style="secondary"
            to="/quiz/create"
          />
        </div>
        <div className="flex justify-center mt-40 pt-10">
          <h1>You have created no Quizzes</h1>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      <div className="mr-32 absolute right-0  mt-4 bg-blue-800">
        <Button
          label="Add new quiz"
          size="large"
          icon={Plus}
          iconPosition="left"
          style="secondary"
          to="/quiz/create"
        />
      </div>
      <div></div>
      <div className="mt-4 ml-24">
        <h2>The List of Quiz:</h2>
        <Table quizData={quizzes} fetchQuizzes={fetchQuizzes} />
      </div>
    </div>
  );
};

export default Dashboard;
