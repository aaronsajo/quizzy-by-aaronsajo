import React, { useEffect, useState } from "react";

import { Plus } from "@bigbinary/neeto-icons";
import { CheckCircle, Delete, Edit } from "@bigbinary/neeto-icons";
import { Button, Typography } from "@bigbinary/neetoui/v2";
import { useParams } from "react-router-dom";

import { questionApi } from "apis/questions";
import quizzesApi from "apis/quizzes";

import { DeleteModal } from "../modal/DeleteModal";
import Navbar from "../Navbar";

export const ShowQuiz = () => {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [questions, setQuestions] = useState([]);
  const [deleteId, setDeleteId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const deleteQuestion = async () => {
    try {
      await questionApi.destroy(deleteId);
      fetchQuizDeatils();
      setShowModal(false);
    } catch (error) {
      logger.error(error);
    }
  };
  const fetchQuizDeatils = async () => {
    try {
      const response = await quizzesApi.show(id);
      setTitle(response.data.quiz.title);
      setQuestions(response.data.quiz.questions);
    } catch (error) {
      logger.error(error);
    }
  };
  useEffect(() => {
    fetchQuizDeatils();
  }, []);
  if (questions.length <= 0) {
    return (
      <div>
        <Navbar />
        <div className="ml-8 px-2 mt-4">
          <div className="absolute right-0 mr-20 mt-4">
            <Button
              label="Add questions"
              size="large"
              icon={Plus}
              iconPosition="left"
              style="secondary"
              to={`/quiz/${id}/questions/add`}
            />
          </div>
          <Typography style="h2" className="mt-4">
            {title}
          </Typography>
          <Typography style="h3" className="flex justify-center mt-40 pt-10">
            There are no questions in this quiz
          </Typography>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      <div className="ml-8 px-2 mt-4">
        <div className="absolute right-0 mr-20 mt-4">
          <Button
            label="Add questions"
            size="large"
            icon={Plus}
            iconPosition="left"
            style="secondary"
            to={`/quiz/${id}/questions/add`}
          />
        </div>
        <Typography style="h2" className="mt-6">
          {title}
        </Typography>
        <div className="w-3/4 mt-8 ml-20 ">
          {questions.map((question, i) => (
            <div key={i} className="p-6 flex justify-between">
              <div>
                <div className="flex mb-2">
                  <Typography style="h4" className="w-32 min-w-md">
                    {" "}
                    Question {i + 1}{" "}
                  </Typography>{" "}
                  <Typography style="h4" className="max-w-xs xl:max-w-xl">
                    {" "}
                    {question.description}
                  </Typography>
                </div>
                {question.options.map((answer, index) => (
                  <div key={index} className="flex">
                    <div className="flex">
                      <Typography className="text-gray-600">
                        Option {index + 1}:
                      </Typography>{" "}
                      <Typography className="ml-16 text-black">
                        {answer.content}
                      </Typography>
                    </div>
                    {answer.answer && (
                      <div className="flex mt-1 ml-2">
                        <CheckCircle color="#00ba88" size={18} />
                        <Typography style="body3" className=" text-green-600 ">
                          Correct answer
                        </Typography>
                      </div>
                    )}
                  </div>
                ))}
              </div>
              <div className="ml-5 flex h-3 ">
                <Button
                  className=" mr-5 "
                  icon={Edit}
                  label="Edit"
                  to={`/quiz/${id}/question/${question.id}/edit`}
                />
                <Button
                  style="danger"
                  className=" mr-5 "
                  icon={Delete}
                  label="Delete"
                  onClick={() => {
                    setShowModal(true);
                    setDeleteId(question.id);
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <DeleteModal
        showModal={showModal}
        setShowModal={setShowModal}
        deleteQ={deleteQuestion}
      />
    </div>
  );
};
