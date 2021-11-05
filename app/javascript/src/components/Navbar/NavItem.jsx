import React from "react";

import { Link } from "react-router-dom";

const NavItem = ({ iconClass, name, path }) => {
  return (
    <Link
      to={path}
      className="inline-flex items-center px-1 pt-1 mr-3
      font-semibold text-4xl leading-5
      text-black "
    >
      {iconClass && <i className={`${iconClass} text-black`}></i>}
      {name}
    </Link>
  );
};

export default NavItem;
