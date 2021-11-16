import React, { useEffect, useState } from "react";

import { Typography, Input, Button, Radio } from "@bigbinary/neetoui/v2";
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

    setIsEligible(response.data.eligible);
    setIsLoggedIn(true);
    const questionResponse = await questionApi.list(response.data.id);
    setData(questionResponse.data.questions);
  };
  const handleChange = e => {
    const name = e.target.name;
    const value = e.target.value;
    setResult(res => ({ ...res, [name]: value }));
  };
  result;
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
                      name={question.description}
                      label={option.content}
                      value={option.content}
                      onChange={handleChange}
                      className="my-1 "
                    />
                  </div>
                ))}
              </Radio>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return <h1>hello</h1>;
};
