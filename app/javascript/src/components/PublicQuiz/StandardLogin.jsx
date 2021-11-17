import React from "react";

import { Typography, Input, Button } from "@bigbinary/neetoui/v2";

export const StandardLogin = ({
  title,
  email,
  setEmail,
  firstName,
  setFirstName,
  lastName,
  setLastName,
  handleLogin,
}) => {
  return (
    <div>
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
};
