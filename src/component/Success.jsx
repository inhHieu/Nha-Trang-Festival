import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Success() {
  return (
    <div className="absolute w-44 h-32 bg-white shadow-2xl rounded-lg overflow-clip ">
      <div className="w-full h-1/6 bg-green-500"></div>
      <FontAwesomeIcon icon="fa-solid fa-check" className="text-green-500 text-[3.5rem] w-full text-center pt-2" />
      <p className=" w-full text-center">Success</p>
    </div>
  );
}

export default Success;
