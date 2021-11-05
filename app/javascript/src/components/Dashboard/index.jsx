import React from "react";

import { Plus } from "@bigbinary/neeto-icons";
import { Button } from "@bigbinary/neetoui/v2";

import Navbar from "../Navbar";

const Dashboard = () => {
  return (
    <div>
      <Navbar />
      <div className="absolute right-0 mr-20 mt-4 bg-blue-800">
        <Button
          label="Add new quiz"
          size="large"
          icon={Plus}
          iconPosition="left"
          style="secondary"
        />
      </div>
    </div>
  );
};

export default Dashboard;
