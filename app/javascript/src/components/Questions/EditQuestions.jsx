import { TOASTR_OPTIONS } from "constants";

import React, { useEffect, useState } from "react";

import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

import { questionApi } from "apis/questions";

import { QuestionForm } from "./QuestionForm";

export const EditQuestions = () => {
  const { id, quizid } = useParams();
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState([]);
  const [answer, setAnswer] = useState(null);
  const [title, setTitle] = useState("");
  const [deletedOptions, setDeletedOptions] = useState([]);
  const [loading, setLoading] = useState(false);

  const setOptionAndAnswer = optionArray => {
    const requiredOption = optionArray.map((option, index) => {
      const key = `opt${index + 1}`;
      const value = option.content;
      return { [key]: value, id: option.id };
    });

    setOptions(requiredOption);
    optionArray.forEach((option, index) => {
      if (option.answer) {
        const requiredAnswer = {
          label: `opt${index + 1}`,
          value: `opt${index + 1}`,
        };

        setAnswer(requiredAnswer);
      }
    });
  };
  const fetchQuestionDeatils = async () => {
    try {
      setLoading(true);
      const response = await questionApi.show(id);
      setQuestion(response.data.question.description);
      setTitle(response.data.question.quiz);
      const optionArray = response.data.question.options;
      setOptionAndAnswer(optionArray);
      setLoading(false);
    } catch (error) {
      logger.error(error);
      setLoading(false);
    }
  };

  const handleOptions = () => {
    const newOption = "opt" + `${options.length + 1}`;

    setOptions(opt => [...opt, { [newOption]: "" }]);
  };

  const handleSubmit = async () => {
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
        if (val.id) {
          return {
            id: val.id,
            content: val[`opt${index + 1}`],
            answer: String(answer && answer.value === Object.keys(val)[0]),
          };
        }

        return {
          content: val[`opt${index + 1}`],
          answer: String(answer && answer.value === Object.keys(val)[0]),
        };
      });

      deletedOptions.forEach(deletedData => {
        data.push(deletedData);
      });
      try {
        setLoading(true);
        await questionApi.update({
          id,
          payload: {
            question: {
              description: question,
              quiz_id: quizid,
              options_attributes: data,
            },
          },
        });
        window.location.href = `/quiz/${quizid}/show`;
        setLoading(false);
      } catch (error) {
        logger.error(error);
      }
    }
  };

  const handleClose = (opt, index) => {
    let dummyOption = [...options];
    let nextOption = options[index + 1];
    if (opt.id) {
      setDeletedOptions(option => [...option, { id: opt.id, _destroy: "1" }]);
    }

    if (nextOption) {
      dummyOption[index][`opt${index + 1}`] = nextOption[`opt${index + 2}`];
      if (nextOption.id) {
        dummyOption[index].id = nextOption.id;
      }
      dummyOption.pop();
      if (
        answer &&
        (answer.value === Object.keys(opt)[0] ||
          answer.value === Object.keys(nextOption)[0])
      ) {
        setAnswer(null);
      }
    } else {
      dummyOption.pop();

      if (answer && answer.value === Object.keys(opt)[0]) {
        setAnswer(null);
      }
    }

    setOptions([...dummyOption]);
  };
  useEffect(() => {
    fetchQuestionDeatils();
  }, []);

  return (
    <div>
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
    </div>
  );
};
