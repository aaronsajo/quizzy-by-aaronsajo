import React, { useEffect, useState } from "react";

import { CheckCircle, Delete, Edit, Plus } from "@bigbinary/neeto-icons";
import { Button, Typography, PageLoader } from "@bigbinary/neetoui/v2";
import { useParams, Link } from "react-router-dom";

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
  const [slug, setSlug] = useState(null);
  const [loading, setLoading] = useState(false);
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
      setLoading(true);
      const response = await quizzesApi.show(id);
      setTitle(response.data.quiz.title);
      setQuestions(response.data.quiz.questions);
      setSlug(response.data.quiz.slug);
      setLoading(false);
    } catch (error) {
      logger.error(error);
      setLoading(false);
    }
  };
  const handlePublish = async () => {
    const response = await quizzesApi.createSlug(id);
    setSlug(response.data.slug);
  };

  useEffect(() => {
    fetchQuizDeatils();
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
        <div className="right-0 absolute  mr-20 mt-4">
          <Button
            label="Add questions"
            size="large"
            icon={Plus}
            iconPosition="left"
            style="secondary"
            to={`/quiz/${id}/questions/add`}
          />
          {!slug && (
            <Button
              label="Publish"
              size="large"
              icon={Plus}
              iconPosition="left"
              style="secondary"
              onClick={() => handlePublish()}
              className="ml-5"
            />
          )}
        </div>

        <Typography style="h2" className="mt-6">
          {title}
        </Typography>
        <div className="w-3/4 mt-8 ml-20 ">
          {slug && (
            <Typography>
              Published, your public link is-{" "}
              <Link to={`/public/${slug}`} className=" text-blue-500 ">
                {window.location.origin + "/public/" + slug}
              </Link>{" "}
            </Typography>
          )}
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
