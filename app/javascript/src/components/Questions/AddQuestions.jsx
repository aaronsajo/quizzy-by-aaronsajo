import React, { useEffect, useState } from "react";

import { Close } from "@bigbinary/neeto-icons";
import { Button, Typography, Input, Select } from "@bigbinary/neetoui/v2";
import { useParams } from "react-router-dom";

import quizzesApi from "apis/quizzes";

import Navbar from "../Navbar";

export const AddQuestions = () => {
  const [question, setQuestion] = useState("");
  const [options, SetOptions] = useState({ opt1: "", opt2: "" });
  const [answer, setAnswer] = useState(null);
  const [title, setTitle] = useState("");
  const { id } = useParams();
  answer;
  const handleOptions = () => {
    const newOption = "opt" + `${Object.keys(options).length + 1}`;
    SetOptions(opt => ({ ...opt, [newOption]: "" }));
  };
  const handleClose = op => {
    const dummyOption = options;
    delete dummyOption[op];
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
    <div>
      <Navbar />
      <div className="w-11/12 ml-24">
        <Typography style="h2">{title}</Typography>
        <Input
          label="Question:"
          value={question}
          onChange={e => setQuestion(e.target.value)}
          className="w-1/2 p-3"
          placeholder="Write the question"
        />
        {Object.keys(options).map((op, i) => (
          <div className="flex w-1/2 p-3" key={i}>
            <Input
              label={op + ":"}
              value={options[op]}
              onChange={e =>
                SetOptions(opt => ({ ...opt, [op]: e.target.value }))
              }
            />
            {op > "opt2" && (
              <Button
                style="danger"
                icon={Close}
                className="h-1 mt-5 ml-2"
                onClick={() => handleClose(op)}
              />
            )}
          </div>
        ))}
        {Object.keys(options).length < 4 && (
          <Button
            label="Add options"
            onClick={() => handleOptions()}
            className="p-2 ml-3"
            style="secondary"
          />
        )}

        <Select
          isSearchable
          label="Answer"
          name="ValueList"
          className="w-1/2 p-3"
          onChange={e => {
            setAnswer(e.value);
          }}
          options={Object.keys(options).map(op => ({
            label: op,
            value: op,
          }))}
          placeholder="Select an Answer"
        />

        <Button label="Submit" className="p-4 ml-5" />
      </div>
    </div>
  );
};
