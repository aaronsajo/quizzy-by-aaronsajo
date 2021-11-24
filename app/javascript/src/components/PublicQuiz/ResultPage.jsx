import React, { useState, useEffect } from "react";

import { CheckCircle } from "@bigbinary/neeto-icons";
import { Typography, Radio, PageLoader } from "@bigbinary/neetoui/v2";
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
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const storedValue = JSON.parse(localStorage.getItem("StandarUserEmail"));
      setLoading(true);
      const response = await attemptApi.show(attemptId);
      if (!(response.data.attempt.standard_user_email === storedValue)) {
        window.location.href = `/public/${slug}/attempt/new`;
      }
      setAtemptedQA(response.data.attempt.attempted_answer);
      setCorrectAnswerList(response.data.attempt.correct_answer_list);
      setCorrectCount(response.data.attempt.correct_answer_count);
      setInCorrectCount(response.data.attempt.incorrect_answer_count);
    } catch (error) {
      window.location.href = `/public/${slug}/attempt/new`;
      logger.error(error);
    }
    try {
      const slugResponse = await quizzesApi.checkSlug(slug);
      setTitle(slugResponse.data.title);
      const questionResponse = await questionApi.list(slugResponse.data.id);
      setData(questionResponse.data.questions);

      setLoading(false);
    } catch (error) {
      window.location.href = `/public/${slug}`;
      logger.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
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
      <div className="w-4/5 ml-16 mt-12">
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
          const attemptedAnwser = attemptedQA.filter(
            ele => ele.question_id === question.id
          )[0]?.attempted_answer;
          return (
            <div key={i}>
              <div className="pb-10">
                <div className="flex pb-4">
                  <Typography className="text-gray-600 ">
                    Question {i + 1}
                  </Typography>
                  <Typography className="ml-12" style="h3">
                    {question.description}
                  </Typography>
                </div>
                <Radio className="ml-32 space-y-4 " stacked>
                  {question.options.map((option, index) => (
                    <div key={index} className="flex">
                      <Radio.Item
                        name={question.id}
                        label={
                          <>
                            {option.content}
                            {option.id == correctAnswerList[i]?.id && (
                              <div className="flex  text-green-400 ml-4">
                                <Typography style="body2">
                                  {" "}
                                  Correct Answer
                                </Typography>
                                <CheckCircle className="mt-1" size={16} />
                              </div>
                            )}
                          </>
                        }
                        value={option.id}
                        disabled={true}
                        checked={
                          attemptedAnwser && option.id == attemptedAnwser
                        }
                        className="my-1"
                      />
                    </div>
                  ))}
                </Radio>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
