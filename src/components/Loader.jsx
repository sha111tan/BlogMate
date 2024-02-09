import React, { useContext } from "react";
import { UserContext } from "../UserContext";

const Loader = () => {
  
  return (
    <div
      className="flex items-center justify-center w-full min-h-body bg-gradient-to-br from-gray-200 to-white shadow-lg rounded-3xl"
    >
      <div className="lds-ellipsis">
        <div className="bg-white"></div>
        <div className="bg-white"></div>
        <div className="bg-white"></div>
        <div className="bg-white"></div>
      </div>
    </div>
  );
};

export default Loader;
