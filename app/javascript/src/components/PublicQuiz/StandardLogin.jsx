import React from "react";

import { Typography, Input, Button } from "@bigbinary/neetoui/v2";

import Navbar from "../Navbar";

export const StandardLogin = ({
  title,
  userDetails,
  setUserDetails,
  handleLogin,
}) => {
  return (
    <div>
      <Navbar />
      <div className="ml-16 w-3/4">
        <Typography style="h2" className="my-12">
          Welcome to {title}{" "}
        </Typography>
        <form onSubmit={handleLogin}>
          <div className="w-2/5">
            <Input
              label="email:"
              type="email"
              placeholder="oliver@example.com"
              value={userDetails.email}
              required="required"
              onChange={e =>
                setUserDetails(values => ({ ...values, email: e.target.value }))
              }
            />
            <br />
            <Input
              label="First Name:"
              placeholder="Enter your first name"
              value={userDetails.firstName}
              required="required"
              onChange={e =>
                setUserDetails(values => ({
                  ...values,
                  firstName: e.target.value,
                }))
              }
            />
            <br />
            <Input
              label="Last Name:"
              placeholder="Enter your last  name"
              value={userDetails.lastName}
              required="required"
              onChange={e =>
                setUserDetails(values => ({
                  ...values,
                  lastName: e.target.value,
                }))
              }
            />
            <br />
            <Button label="Submit" type="submit" />
          </div>
        </form>
      </div>
    </div>
  );
};
