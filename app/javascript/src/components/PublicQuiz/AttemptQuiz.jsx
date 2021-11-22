import React, { useEffect, useState } from "react";

import { PageLoader } from "@bigbinary/neetoui/v2";
import { useParams } from "react-router-dom";

import attemptAnswerApi from "apis/attempts_answers";
import quizzesApi from "apis/quizzes";
import usersApi from "apis/users";

import { AttendQuiz } from "./AttendQuiz";
import { StandardLogin } from "./StandardLogin";

import Navbar from "../Navbar";

export const AttemptQuiz = () => {
  const { slug } = useParams();
  const [title, setTitle] = useState("");
  const [userDetails, setUserDetails] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });
  const [quizId, setQuizId] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [attemptId, setAttemptId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState({});

  const checkSlug = async () => {
    try {
      const response = await quizzesApi.checkSlug(slug);
      setTitle(response.data.title);
      setQuizId(response.data.id);
    } catch (error) {
      logger.error(error);
    }
  };
  const handleChange = e => {
    const name = e.target.name;
    const value = e.target.value;
    setSelectedAnswer({ ...selectedAnswer, [name]: value });
  };
  const handleLogin = async () => {
    try {
      setLoading(true);
      const response = await usersApi.login({
        user: {
          email: userDetails.email,
          first_name: userDetails.firstName,
          last_name: userDetails.lastName,
        },
        quiz_id: quizId,
      });
      setAttemptId(response.data.attempt_id);
      if (!response.data.eligible) {
        window.location.assign(
          `/public/${slug}/result/${response.data.attempt_id}`
        );
      } else {
        setIsLoggedIn(true);
        setLoading(false);
      }
    } catch (error) {
      logger.error(error);
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    const result = Object.keys(selectedAnswer).map(key => ({
      question_id: key,
      attempted_answer: selectedAnswer[key],
    }));

    const payload = {
      answer: {
        attempt_id: attemptId,
        attempts: result,
      },
    };
    try {
      await attemptAnswerApi.create(payload);
      window.location.assign(`/public/${slug}/result/${attemptId}`);
    } catch (error) {
      logger.error(error);
    }
  };

  useEffect(() => {
    checkSlug();
  }, []);
  if (loading) {
    return (
      <div>
        <Navbar />
        <div className="mt-32">
          <PageLoader />
        </div>
      </div>
    );
  }

  if (!isLoggedIn) {
    return (
      <div>
        (
        <StandardLogin
          title={title}
          userDetails={userDetails}
          setUserDetails={setUserDetails}
          handleLogin={handleLogin}
        />
        )
      </div>
    );
  }

  return (
    <AttendQuiz
      title={title}
      handleSubmit={handleSubmit}
      quizId={quizId}
      handleChange={handleChange}
    />
  );
};
