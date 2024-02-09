import React, { useContext, useEffect } from "react";
import Blog from "../components/Blog";
import Footer from "../components/Footer";
import { UserContext } from "../UserContext";
import { Link } from "react-router-dom";
import { IoMdAdd } from "react-icons/io";
import { auth } from "../firebase";

const Home = () => {
  const { userInfo, setUserInfo } = useContext(UserContext);

  useEffect(() => {
    auth.onAuthStateChanged((state) => {
      setUserInfo(state);
    });
  }, [userInfo]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <div
        className="bg-gradient-to-br from-gray-200 to-white flex flex-col shadow-lg min-h-screen rounded-3xl items-center  pb-20"

      >
        <Blog />
        {userInfo && (
          <Link
            to="/create"
            className="flex flex-col items-center cursor-pointer text-white ease-out duration-300 border-black focus:scale-[1.10] hover:scale-[1.10] active:scale-100 bg-gradient-to-r from-gray-700 to-gray-900 z-10 rounded-full fixed right-5 p-4 bottom-5"
          >
            <IoMdAdd size={30} />
          </Link>
        )}
      </div>
      <Footer />
    </>
  );
};

export default Home;
