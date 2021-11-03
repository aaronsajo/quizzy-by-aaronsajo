import React, { useState } from "react";

import { Button, Input } from "@bigbinary/neetoui/v2";

import authApi from "apis/auth";
import { setAuthHeaders } from "apis/axios";
import { setToLocalStorage } from "helpers/storage";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async event => {
    event.preventDefault();
    try {
      setLoading(true);
      const response = await authApi.login({ login: { email, password } });
      setToLocalStorage({
        authToken: response.data.authentication_token,
        email,
        userId: response.data.id,
        userName: response.data.name,
      });
      setAuthHeaders();
      setLoading(false);
      window.location.href = "/about";
    } catch (error) {
      logger.error(error);
      setLoading(false);
    }
  };
  loading;

  return (
    <div
      className="flex items-center justify-center min-h-screen
    px-4 py-12 lg:px-8 bg-gray-50 sm:px-6"
    >
      <div className="w-full max-w-md">
        {/* <h2
        className="mt-6 text-3xl font-extrabold leading-9
        text-center text-bb-gray-700"
      >
        Sign In
      </h2>
      <div className="text-center">
        <Link
          to="/signup"
          className="mt-2 text-sm font-medium text-bb-purple
          transition duration-150 ease-in-out focus:outline-none
          focus:underline"
        >
          Or Register Now
        </Link>
      </div> */}
        <form className="mt-8 text-center" onSubmit={handleSubmit}>
          <Input
            label="Email"
            type="email"
            placeholder="oliver@example.com"
            onChange={e => setEmail(e.target.value)}
          />

          <Input
            label="Password"
            type="password"
            placeholder="********"
            onChange={e => setPassword(e.target.value)}
            className="py-4"
          />

          <Button type="submit" label="Log-in" />
        </form>
      </div>
    </div>
  );
};

export default Login;
