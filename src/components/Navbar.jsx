import React, { useContext, useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../UserContext";
import { IoMdAdd } from "react-icons/io";
import {
  MdLightMode,
  MdNightlightRound,
  MdClose,
  MdLogout,
  MdLogin,
  MdOutlineFeed,
} from "react-icons/md";
import { FaRegUserCircle } from "react-icons/fa";
import {
  HiOutlineMenuAlt1,
  HiOutlineMoon,
  HiOutlineBookmark,
} from "react-icons/hi";
import { AiFillGithub } from "react-icons/ai";
import { BsTelegram } from "react-icons/bs";
import { getAuth, signOut } from "firebase/auth";

const Navbar = () => {
  const { userInfo, navOpen, setNavOpen } =
    useContext(UserContext);

  const logout = () => {
    // log out user
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        setNavOpen(false);
      })
      .catch((error) => {
        // An error happened.
      });
  };
  if (navOpen) {
    document.body.classList.add("fix");
  } else {
    document.body.classList.remove("fix");
  }

  return (
    <nav
      className="bg-white z-50 px-5 bg-opacity-80 rounded-b-3xl shadow-md shadow-black/[0.03] backdrop-blur-[0.5rem] flex items-center justify-center  sticky top-0"
    >
      <div className="h-[60px] md:relative w-full flex items-center justify-evenly max-w-6xl">
        {/* логотип */}
        <Link to="/" className="">
          <img
            className="w-24 duration-300 focus:scale-[1.15] hover:scale-[1.15]   active:scale-100 "
            src="/logo.png"
            alt="Harsh"
          />
        </Link>
        <div className="flex items-center gap-5 text-white">
          {userInfo !== null ? (
            <div>
              {userInfo ? (
                <Link
                  to={`/details/${userInfo?.displayName}`}
                  onClick={() => setNavOpen(false)}
                >
                  <img
                    src={userInfo?.photoURL}
                    className="w-10 h-10 md:w-10 md:h-10 rounded-full object-cover duration-300 focus:scale-[1.20] hover:scale-[1.20]   active:scale-100  border-light-mode-text"
                  />
                </Link>
              ) : (
                <FaRegUserCircle size={25} />
              )}
            </div>
          ) : (
            <>
              <Link
                to="/login"
                className="text-white shadow-md px-3  py-1 rounded-xl ease-out duration-300 focus:scale-[1.10] hover:scale-[1.10] active:scale-100 bg-gradient-to-r from-gray-700 to-gray-900 font-semibold cursor-pointer"
                onClick={() => setNavOpen(false)}
              >
                Войти
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
