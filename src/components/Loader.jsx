import React, { useContext } from "react";
import { UserContext } from "../UserContext";

const Loader = () => {
  const { darkMode } = useContext(UserContext);
  return (
    <div
      className={`flex items-center justify-center w-full min-h-body ${
        darkMode
          ? "bg-gradient-to-r from-zinc-900 to-zinc-800"
          : "bg-gradient-to-br from-gray-200 to-white"
      }shadow-lg rounded-3xl`}
    >
      <div className="lds-ellipsis">
        <div className={!darkMode ? "bg-black" : "bg-white"}></div>
        <div className={!darkMode ? "bg-black" : "bg-white"}></div>
        <div className={!darkMode ? "bg-black" : "bg-white"}></div>
        <div className={!darkMode ? "bg-black" : "bg-white"}></div>
      </div>
    </div>
  );
};

export default Loader;
