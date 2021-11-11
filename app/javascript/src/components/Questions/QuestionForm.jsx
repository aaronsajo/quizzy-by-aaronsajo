import React from "react";

import { Close } from "@bigbinary/neeto-icons";
import { Button, Typography, Input, Select } from "@bigbinary/neetoui/v2";

import Navbar from "../Navbar";

export const QuestionForm = ({
  title,
  question,
  setQuestion,
  options,
  SetOptions,
  answer,
  setAnswer,
  handleClose,
  handleOptions,
  handleSubmit,
}) => {
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
          name="OptionList"
          className="w-1/2 p-3"
          value={answer}
          onChange={e => {
            setAnswer(e);
          }}
          options={Object.keys(options).map(op => ({
            label: op,
            value: op,
          }))}
          placeholder="Select an Answer"
        />

        <Button label="Submit" className="p-4 ml-5" onClick={handleSubmit} />
      </div>
    </div>
  );
};
