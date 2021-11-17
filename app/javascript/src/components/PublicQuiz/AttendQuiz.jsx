import React from "react";

import { Typography, Radio, Button } from "@bigbinary/neetoui/v2";

export const AttendQuiz = ({ title, data, handleChange, handleSubmit }) => {
  return (
    <div>
      <div className="w-3/5 ml-16 mt-12">
        <Typography style="h2" className="mb-8">
          {title}
        </Typography>
        {data.map((question, i) => (
          <div key={i}>
            <div className="flex">
              <Typography className="text-gray-600">
                Question {i + 1}
              </Typography>
              <Typography className="ml-12 " style="h3">
                {question.description}
              </Typography>
            </div>
            <Radio className="ml-32 space-y-4 " stacked>
              {question.options.map((option, index) => (
                <div key={index}>
                  <Radio.Item
                    name={question.id}
                    label={option.content}
                    value={option.id}
                    onChange={handleChange}
                    className="my-1"
                  />
                </div>
              ))}
            </Radio>
          </div>
        ))}
        <Button label="submit" onClick={handleSubmit} />
      </div>
    </div>
  );
};
