import React from "react";

import { Close } from "@bigbinary/neeto-icons";
import {
  Button,
  Typography,
  Input,
  Select,
  PageLoader,
} from "@bigbinary/neetoui/v2";

import Navbar from "../Navbar";

export const QuestionForm = ({
  title,
  question,
  setQuestion,
  options,
  setOptions,
  answer,
  setAnswer,
  handleClose,
  handleOptions,
  handleSubmit,
  loading,
}) => {
  if (loading) {
    return (
      <div>
        <Navbar />
        <div className="flex justify-center mt-40">
          <PageLoader />
        </div>
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      <form onSubmit={handleSubmit}>
        <div className="w-11/12 ml-24">
          <Typography style="h2">{title}</Typography>
          <Input
            label="Question:"
            value={question}
            onChange={e => setQuestion(e.target.value)}
            className="w-1/2 p-3"
            placeholder="Write the question"
            required="required"
          />
          {options.map((op, i) => (
            <div className="flex w-1/2 p-3" key={i}>
              <Input
                label={Object.keys(op)[0] + ":"}
                value={options[i][`opt${i + 1}`]}
                required="required"
                onChange={e =>
                  setOptions(opt => {
                    opt[i][`opt${i + 1}`] = e.target.value;
                    return [...opt];
                  })
                }
              />
              {i > 1 && (
                <Button
                  style="danger"
                  icon={Close}
                  className="h-1 mt-5 ml-2"
                  onClick={() => handleClose(op, i)}
                />
              )}
            </div>
          ))}
          {options.length < 4 && (
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
            name="OptionList"
            required="required"
            className="w-1/2 p-3"
            value={answer}
            onChange={e => {
              setAnswer(e);
            }}
            options={options.map(op => ({
              label: Object.keys(op)[0],
              value: Object.keys(op)[0],
            }))}
            placeholder="Select an Answer"
          />
          <Button label="Submit" className="p-4 ml-5" type="submit" />
        </div>
      </form>
    </div>
  );
};
