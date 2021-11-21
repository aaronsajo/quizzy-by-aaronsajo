import React, { useState, useEffect } from "react";

import { Input, Button, PageLoader } from "@bigbinary/neetoui/v2";
import { useParams } from "react-router-dom";

import quizzesApi from "apis/quizzes";

import Navbar from "../Navbar";

const EditQuiz = () => {
  const [title, setTitle] = useState("");
  const [pageLoading, setPageLoading] = useState(true);
  const { id } = useParams();

  const handleSubmit = async event => {
    event.preventDefault();
    try {
      await quizzesApi.update({
        id,
        payload: { quiz: { title } },
      });
      window.location.href = "/";
    } catch (error) {
      logger.error(error);
    }
  };

  const fetchQuizDetails = async () => {
    try {
      const response = await quizzesApi.show(id);
      setTitle(response.data.quiz.title);
    } catch (error) {
      logger.error(error);
    } finally {
      setPageLoading(false);
    }
  };

  useEffect(() => {
    fetchQuizDetails();
  }, []);

  if (pageLoading) {
    return (
      <div>
        <Navbar />
        <div className="w-screen h-screen">
          <PageLoader />
        </div>
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      <form className="max-w-lg mx-auto mt-10">
        <h1 className="mb-5">Change Quiz Name</h1>
        <Input
          label="New Quiz Name:"
          placeholder="Quiz Title (Max 50 Characters Allowed)"
          value={title}
          onChange={e => setTitle(e.target.value)}
          className="mb-5"
        />
        <Button label="Submit" onClick={handleSubmit} />
      </form>
    </div>
  );
};

export default EditQuiz;
