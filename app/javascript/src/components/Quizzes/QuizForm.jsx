import React, { useState } from "react";

import { Input, Button, PageLoader } from "@bigbinary/neetoui/v2";

import quizzesApi from "apis/quizzes";

import Navbar from "../Navbar";

const CreateQuiz = ({ history }) => {
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async event => {
    event.preventDefault();
    try {
      await quizzesApi.create({ quiz: { title } });
      setLoading(false);
      history.push("/");
    } catch (error) {
      logger.error(error);
      setLoading(false);
    }
  };
  if (loading) {
    return (
      <div>
        <Navbar />
        <div>
          <PageLoader />
        </div>
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      <form className="max-w-lg mx-auto mt-10" onSubmit={handleSubmit}>
        <h1 className="mb-5">Add new Quiz</h1>
        <Input
          label="Quiz Name"
          placeholder="Quiz Title (Max 50 Characters Allowed)"
          value={title}
          onChange={e => setTitle(e.target.value)}
          className="mb-5"
          required="required"
        />
        <Button label="Submit" type="submit" />
      </form>
    </div>
  );
};

export default CreateQuiz;
