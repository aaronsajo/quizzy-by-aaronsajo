import { TOASTR_OPTIONS } from "constants";

import React, { useEffect, useState } from "react";

import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

import { questionApi } from "apis/questions";
import quizzesApi from "apis/quizzes";

import { QuestionForm } from "./QuestionForm";

export const AddQuestions = () => {
  const [question, setQuestion] = useState("");
  const [options, SetOptions] = useState({ opt1: "", opt2: "" });
  const [answer, setAnswer] = useState(null);
  const [title, setTitle] = useState("");
  const { id } = useParams();

  const handleOptions = () => {
    const newOption = "opt" + `${Object.keys(options).length + 1}`;
    SetOptions(opt => ({ ...opt, [newOption]: "" }));
  };
  const handleSubmit = async () => {
    if (question === "") {
      toast.error("Question Can't be blank", TOASTR_OPTIONS);
    } else if (Object.values(options).includes("")) {
      toast.error("Option Can't be blank", TOASTR_OPTIONS);
    } else if (answer === null) {
      toast.error("Select an answer", TOASTR_OPTIONS);
    } else {
      const data = Object.values(options).map((val, index) => {
        return {
          content: val,
          answer: String(answer && answer.value == Object.keys(options)[index]),
        };
      });
      await questionApi.create({
        question: {
          description: question,
          quiz_id: id,
          options_attributes: data,
        },
      });
      window.location.href = `/quiz/${id}/show`;
    }
  };

  const handleClose = op => {
    const dummyOption = options;
    const i = Object.keys(options).indexOf(op);
    let nextOption = Object.keys(options)[i + 1];
    if (nextOption) {
      dummyOption[op] = dummyOption[nextOption];
      delete dummyOption[nextOption];
      setAnswer(null);
    } else {
      delete dummyOption[op];
      if (answer && answer.value == op) {
        setAnswer(null);
      }
    }
    SetOptions({ ...dummyOption });
  };

  const fetchQuizDetails = async () => {
    try {
      const response = await quizzesApi.show(id);
      setTitle(response.data.quiz.title);
    } catch (error) {
      logger.error(error);
    }
  };

  useEffect(() => {
    fetchQuizDetails();
  }, []);
  return (
    <QuestionForm
      title={title}
      question={question}
      setQuestion={setQuestion}
      options={options}
      SetOptions={SetOptions}
      answer={answer}
      setAnswer={setAnswer}
      handleClose={handleClose}
      handleOptions={handleOptions}
      handleSubmit={handleSubmit}
    />
  );
};
