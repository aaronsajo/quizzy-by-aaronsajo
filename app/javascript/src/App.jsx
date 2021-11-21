import React, { useEffect, useState } from "react";

import { either, isEmpty, isNil } from "ramda";
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import { registerIntercepts, setAuthHeaders } from "apis/axios";
import Login from "components/Authentication/Login";
import PrivateRoute from "components/Common/PrivateRoute";
import { getFromLocalStorage } from "helpers/storage";

import { initializeLogger } from "./common/logger";
import Dashboard from "./components/Dashboard";
import { Report } from "./components/Dashboard/Report";
import { ReportDownload } from "./components/Dashboard/ReportDownload";
import { AttemptQuiz } from "./components/PublicQuiz/AttemptQuiz";
import { PublicDashboard } from "./components/PublicQuiz/PublicDashboard";
import { ResultPage } from "./components/PublicQuiz/ResultPage";
import { AddQuestions } from "./components/Questions/AddQuestions";
import { EditQuestions } from "./components/Questions/EditQuestions";
import EditQuiz from "./components/Quizzes/EditQuiz";
import CreateQuiz from "./components/Quizzes/QuizForm";
import { ShowQuiz } from "./components/Quizzes/ShowQuiz";

const App = () => {
  const [loading, setLoading] = useState(true);
  const authToken = getFromLocalStorage("authToken");
  const isLoggedIn = !either(isNil, isEmpty)(authToken) && authToken !== "null";
  useEffect(() => {
    initializeLogger();
    registerIntercepts();
    setAuthHeaders(setLoading);
  }, []);

  if (loading) {
    return <>loading</>;
  }

  return (
    <div>
      <Router>
        <ToastContainer />
        <Switch>
          <Route exact path="/login" component={Login} />
          <Route exact path="/quiz/create" component={CreateQuiz} />
          <Route exact path="/quiz/edit/:id" component={EditQuiz} />
          <Route exact path="/quiz/:id/show" component={ShowQuiz} />
          <Route exact path="/public/:slug" component={PublicDashboard} />
          <Route exact path="/quiz/attempt/report" component={Report} />
          <Route
            exact
            path="/public/:slug/result/:attemptId"
            component={ResultPage}
          />
          <Route
            exact
            path="/quiz/attempt/report/download"
            component={ReportDownload}
          />
          <Route
            exact
            path="/public/:slug/attempt/new"
            component={AttemptQuiz}
          />
          <Route
            exact
            path="/quiz/:quizid/question/:id/edit"
            component={EditQuestions}
          />
          <Route
            exact
            path="/quiz/:id/questions/add"
            component={AddQuestions}
          />

          <PrivateRoute
            path="/"
            redirectRoute="/login"
            condition={isLoggedIn}
            component={Dashboard}
          />
        </Switch>
      </Router>
    </div>
  );
};

export default App;
