import React from "react";

import { Download } from "@bigbinary/neeto-icons";
import { Button } from "@bigbinary/neetoui/v2";

import Navbar from "../Navbar";

export const Report = () => {
  return (
    <div>
      <Navbar />
      <div className="ml-16 mt-10">
        <div className="absolute right-0 mr-20 mt-4">
          <Button
            label="Download"
            size="large"
            icon={Download}
            iconPosition="left"
            style="secondary"
            to="/"
          />
        </div>
        <h2 className="text-gray-600">Reports</h2>
      </div>
    </div>
  );
};
