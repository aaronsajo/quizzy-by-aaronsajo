import React, { useState, useEffect } from "react";

import { CheckCircle } from "@bigbinary/neeto-icons";
import { Typography, Radio } from "@bigbinary/neetoui/v2";
import { useParams } from "react-router-dom";

import attemptApi from "apis/attempts";
import { questionApi } from "apis/questions";
import quizzesApi from "apis/quizzes";

import Navbar from "../Navbar";

export const ResultPage = () => {
  const { slug, attemptId } = useParams();
  const [data, setData] = useState([]);
  const [title, setTitle] = useState([]);
  const [correctCount, setCorrectCount] = useState(null);
  const [inCorrectCount, setInCorrectCount] = useState(null);
  const [attemptedQA, setAtemptedQA] = useState([]);
  const [correctAnswerList, setCorrectAnswerList] = useState([]);

  const fetchData = async () => {
    const response = await attemptApi.show(attemptId);
    setAtemptedQA(response.data.attempt.attempted_answer);
    setCorrectAnswerList(response.data.attempt.correct_answer_list);
    const slugResponse = await quizzesApi.checkSlug(slug);
    setTitle(response.data.title);

    const questionResponse = await questionApi.list(slugResponse.data.id);
    const filteredData = questionResponse.data.questions.filter(
      (value, i) => i < response.data.attempt.attempted_answer.length
    );
    setData(filteredData);

    setCorrectCount(response.data.attempt.correct_answer_count);
    setInCorrectCount(response.data.attempt.incorrect_answer_count);
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div>
      <Navbar />
      <div className="w-3/5 ml-16 mt-12">
        <Typography style="h2" className="mb-8">
          {title}
        </Typography>
        <Typography>
          Thank you for taking the quiz, here are your results.
        </Typography>
        <Typography style="body1" className="mb-6">
          {" "}
          You have submitted {correctCount} correct and {inCorrectCount}{" "}
          incorrect answers.
        </Typography>
        {data.map((question, i) => {
          return (
            question.id === attemptedQA[i].question_id &&
            i <= attemptedQA.length && (
              <div key={i}>
                <div>
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
                      <div key={index} className="flex">
                        <Radio.Item
                          name={question.id}
                          label={option.content}
                          value={option.id}
                          disabled={true}
                          checked={option.id == attemptedQA[i].attempted_answer}
                          className="my-1"
                        />
                        {option.id == correctAnswerList[i].id && (
                          <div className="flex text-green-400">
                            <span>Correct Answer</span>
                            <CheckCircle />
                          </div>
                        )}
                      </div>
                    ))}
                  </Radio>
                </div>
              </div>
            )
          );
        })}
      </div>
    </div>
  );
};
