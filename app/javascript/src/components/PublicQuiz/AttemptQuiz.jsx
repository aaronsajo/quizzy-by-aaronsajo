import React, { useEffect, useState } from "react";

import { Typography, Input, Button } from "@bigbinary/neetoui/v2";
import { useParams } from "react-router-dom";

import { questionApi } from "apis/questions";
import quizzesApi from "apis/quizzes";
import usersApi from "apis/users";

import Navbar from "../Navbar";

export const AttemptQuiz = () => {
  const { slug } = useParams();
  const [email, setEmail] = useState("");
  const [title, setTitle] = useState("");
  const [firstName, setFirstName] = useState("");
  const [quizId, setQuizId] = useState(null);
  const [lastName, setLastName] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isEligible, setIsEligible] = useState(true);
  const [data, setData] = useState([]);
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

    setIsEligible(response.data.eligible);
    setIsLoggedIn(true);
    const questionResponse = await questionApi.list(quizId);
    setData(questionResponse.data.questions);
  };
  useEffect(() => {
    checkSlug();
  }, []);
  if (!isLoggedIn) {
    return (
      <div>
        <Navbar />
        <div className="ml-16 w-3/4">
          <Typography style="h2" className="my-12">
            Welcome to {title}{" "}
          </Typography>
          <div className="w-2/5">
            <Input
              label="email:"
              placeholder="oliver@example.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
            <br />
            <Input
              label="First Name:"
              placeholder="Enter your first name"
              value={firstName}
              onChange={e => setFirstName(e.target.value)}
            />
            <br />
            <Input
              label="Last Name:"
              placeholder="Enter your last  name"
              value={lastName}
              onChange={e => setLastName(e.target.value)}
            />
            <br />
            <Button label="Submit" onClick={() => handleLogin()} />
          </div>
        </div>
      </div>
    );
  }

  if (isEligible) {
    return (
      <div>
        <Navbar />
        <div className="w-3/5 ml-16 mt-12">
          {data.map((question, i) => (
            <div key={i}>
              <div>Question :{question.description}</div>
              {question.options.map((option, index) => (
                <div key={index}>
                  option{index + 1}. {option.content}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    );
  }

  return <h1>hello</h1>;
};
