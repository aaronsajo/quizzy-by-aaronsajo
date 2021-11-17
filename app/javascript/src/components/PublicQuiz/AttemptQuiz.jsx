import React, { useEffect, useState } from "react";

import { useParams } from "react-router-dom";

import attemptAnswerApi from "apis/attempts_answers";
import quizzesApi from "apis/quizzes";
import usersApi from "apis/users";

import { AttendQuiz } from "./AttendQuiz";
import { StandardLogin } from "./StandardLogin";

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
    const response = await quizzesApi.checkSlug(slug);
    setTitle(response.data.title);
    setQuizId(response.data.id);
  };
  const handleChange = e => {
    const name = e.target.name;
    const value = e.target.value;
    setSelectedAnswer({ ...selectedAnswer, [name]: value });
  };
  const handleLogin = async () => {
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
    }
    setIsLoggedIn(true);
    setLoading(false);
  };

  const handleSubmit = async () => {
    console;
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
    await attemptAnswerApi.create(payload);

    window.location.assign(`/public/${slug}/result/${attemptId}`);
  };

  useEffect(() => {
    checkSlug();
  }, []);
  if (loading) {
    return <h1>Loading...</h1>;
  }

  if (isLoggedIn) {
    return (
      <AttendQuiz
        title={title}
        handleSubmit={handleSubmit}
        quizId={quizId}
        handleChange={handleChange}
      />
    );
  }

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
};
