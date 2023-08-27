import React, { useContext } from "react";
import { UserContext } from "../UserContext";
import { AiFillGithub } from "react-icons/ai";
import { BsTelegram } from "react-icons/bs";

const Footer = () => {
  const { darkMode } = useContext(UserContext);
  return (
    <div
      className={`${
        darkMode
          ? "bg-gradient-to-r from-zinc-900 to-zinc-800 text-dark-text"
          : "bg-gradient-to-br from-gray-200 to-white  text-light-mode-text"
      } w-full md:p-10 md:fixed md:bottom-0  flex flex-col shadow-xl rounded-t-3xl items-center gap-5`}
    >
      <div className="flex flex-col gap-5 items-center p-5">
        <h2
          className={`${
            darkMode
              ? " from-red-300  to-indigo-600"
              : "from-red-300  to-indigo-600"
          }  text-3xl animate-pulse font-bold bg-gradient-to-r bg-clip-text text-transparent`}
        >
          @BlogMate
        </h2>
        <div
          className={`${
            darkMode ? "text-dark-text" : "text-light-mode-text"
          } flex justify-center gap-5  text-2xl`}
        >
          <a
            className="duration-300 focus:scale-[1.20] hover:scale-[1.20] active:scale-100"
            target="_blank"
            href="https://t.me/shaiiitan1"
          >
            <BsTelegram />
          </a>

          <a
            className="duration-300 focus:scale-[1.20] hover:scale-[1.20] active:scale-100"
            target="_blank"
            href="https://github.com/kojifansite"
          >
            <AiFillGithub />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Footer;
