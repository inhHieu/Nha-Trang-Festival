import React from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

function ViewAll({link, children}) {
  return (
    <Link className="group" to={link}>
          {children}
          <FontAwesomeIcon
            icon="fa-solid fa-arrow-right"
            className="ml-1 mr-2 text-08 text-sea-blue duration-300 group-hover:ml-2 group-hover:mr-1"
          />
        </Link>
  )
}

export default ViewAll