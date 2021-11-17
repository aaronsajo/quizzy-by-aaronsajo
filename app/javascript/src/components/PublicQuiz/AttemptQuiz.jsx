import React, { useEffect, useState } from "react";

import { useParams } from "react-router-dom";

import attemptApi from "apis/attempts_answers";
import { questionApi } from "apis/questions";
import quizzesApi from "apis/quizzes";
import usersApi from "apis/users";

import { AttendQuiz } from "./AttendQuiz";
import { StandardLogin } from "./StandardLogin";

import Navbar from "../Navbar";

export const AttemptQuiz = () => {
  const { slug } = useParams();
  const [email, setEmail] = useState("");
  const [title, setTitle] = useState("");
  const [firstName, setFirstName] = useState("");
  const [quizId, setQuizId] = useState(null);
  const [lastName, setLastName] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isEligible, setIsEligible] = useState(false);
  const [data, setData] = useState([]);
  const [attemptId, setAttemptId] = useState(null);
  const [result, setResult] = useState([]);

  const checkSlug = async () => {
    const response = await quizzesApi.checkSlug(slug);
    setTitle(response.data.title);
    setQuizId(response.data.id);
  };

  const handleLogin = async () => {
    const response = await usersApi.login({
      user: { email, first_name: firstName, last_name: lastName },
      quiz_id: quizId,
    });
    setAttemptId(response.data.attempt_id);
    setIsEligible(response.data.eligible);
    setIsLoggedIn(true);
    const questionResponse = await questionApi.list(quizId);
    setData(questionResponse.data.questions);
  };

  const handleChange = e => {
    const name = e.target.name;
    const value = e.target.value;
    setResult(res => [...res, { question_id: name, attempted_answer: value }]);
  };
  const handleSubmit = () => {
    const payload = {
      answer: {
        attempt_id: attemptId,
        attempts: result,
      },
    };
    attemptApi.create(payload);
    setIsEligible(false);
  };

  useEffect(() => {
    checkSlug();
  }, []);
  if (isLoggedIn && !isEligible) {
    return <h1>You have already submited</h1>;
  }

  return (
    <div>
      <Navbar />
      {!isLoggedIn && (
        <StandardLogin
          title={title}
          email={email}
          setEmail={setEmail}
          firstName={firstName}
          setFirstName={setFirstName}
          lastName={lastName}
          setLastName={setLastName}
          handleLogin={handleLogin}
        />
      )}

      {isEligible && (
        <AttendQuiz
          title={title}
          data={data}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
        />
      )}
    </div>
  );
};
