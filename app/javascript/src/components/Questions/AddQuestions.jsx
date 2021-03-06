import { TOASTR_OPTIONS } from "constants";

import React, { useEffect, useState } from "react";

import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

import { questionApi } from "apis/questions";
import quizzesApi from "apis/quizzes";

import { QuestionForm } from "./QuestionForm";

export const AddQuestions = () => {
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState([{ opt1: "" }, { opt2: "" }]);
  const [answer, setAnswer] = useState(null);
  const [title, setTitle] = useState("");
  const { id } = useParams();
  const [loading, setLoading] = useState(false);

  const handleOptions = () => {
    const newOption = "opt" + `${options.length + 1}`;

    setOptions(opt => [...opt, { [newOption]: "" }]);
  };
  const handleSubmit = async event => {
    event.preventDefault();
    if (question.trim().length === 0) {
      toast.error("Question Can't be blank", TOASTR_OPTIONS);
    } else if (
      options.some(option => Object.values(option)[0].trim().length === 0)
    ) {
      toast.error("Option Can't be blank", TOASTR_OPTIONS);
    } else if (answer === null) {
      toast.error("Select an answer", TOASTR_OPTIONS);
    } else {
      const data = options.map((val, index) => {
        return {
          content: val[`opt${index + 1}`],
          answer: String(answer && answer.value === Object.keys(val)[0]),
        };
      });
      try {
        await questionApi.create({
          question: {
            description: question,
            quiz_id: id,
            options_attributes: data,
          },
        });
        window.location.href = `/quiz/${id}/show`;
      } catch (error) {
        logger.error(error);
      }
    }
  };
  const handleClose = (opt, index) => {
    let dummyOption = options;
    let nextOption = options[index + 1];
    if (nextOption) {
      dummyOption[index][`opt${index + 1}`] = nextOption[`opt${index + 2}`];
      dummyOption.pop();
      if (answer && answer.value === Object.keys(opt)[0]) {
        setAnswer(null);
      }

      if (answer && answer.value === Object.keys(nextOption)[0]) {
        setAnswer({ label: Object.keys(opt)[0], value: Object.keys(opt)[0] });
      }
    } else {
      dummyOption.pop();

      if (answer && answer.value === Object.keys(opt)[0]) {
        setAnswer(null);
      }
    }
    setOptions([...dummyOption]);
  };

  const fetchQuizDetails = async () => {
    try {
      setLoading(true);
      const response = await quizzesApi.show(id);
      setTitle(response.data.quiz.title);
      setLoading(false);
    } catch (error) {
      logger.error(error);
      setLoading(false);
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
      setOptions={setOptions}
      answer={answer}
      setAnswer={setAnswer}
      handleClose={handleClose}
      handleOptions={handleOptions}
      handleSubmit={handleSubmit}
      loading={loading}
    />
  );
};
