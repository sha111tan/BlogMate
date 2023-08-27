import React, { useContext, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../UserContext";
import {
  GoogleAuthProvider,
  GithubAuthProvider,
  signInWithPopup,
  FacebookAuthProvider,
} from "firebase/auth";
import { auth } from "../firebase";
import { FaGithub, FaFacebook } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

const Login = () => {
  const [redirect, setRedirect] = useState(false);
  const [err, setErr] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const { setUserInfo, userInfo, darkMode } = useContext(UserContext);

  const loginWithGoogle = async (e) => {
    e.preventDefault();
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        const user = result.user;
        setUserInfo(user);
        setRedirect(true);
      })
      .catch((error) => {
        setErr(true);
        setErrorMessage(error.message);
      });
  };

  const loginWithFacebook = (e) => {
    e.preventDefault();
    const provider = new FacebookAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        // The signed-in user info.
        const user = result.user;
        // This gives you a Facebook Access Token. You can use it to access the Facebook API.
        const credential = FacebookAuthProvider.credentialFromResult(result);
        const accessToken = credential.accessToken;
        setUserInfo(user);
        setRedirect(true);
      })
      .catch((error) => {
        setErr(true);
        console.log(error.message);
        setErrorMessage(error.message);
      });
  };

  const loginWithGithub = (e) => {
    e.preventDefault();
    const provider = new GithubAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        const credential = GithubAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        const user = result.user;
        console.log(user);
        setRedirect(true);
      })
      .catch((error) => {
        setErr(true);
        console.log(error.message);
        setErrorMessage(error.message);
      });
  };

  useEffect(() => {
    auth.onAuthStateChanged((state) => {
      setUserInfo(state);
    });
  }, [userInfo]);

  if (redirect) {
    return <Navigate to="/" />;
  }

  return (
    <div
      className={`${
        darkMode
          ? "bg-gradient-to-r from-zinc-900 to-zinc-800"
          : "sm:bg-light-mode"
      } min-h-body  rounded-3xl w-screen flex items-center justify-center`}
    >
      <div
        className={`sm:rounded-xl shadow-form flex flex-col items-center py-5 pb-5 sm:pb-10 sm:w-[500px] w-full sm:min-h-max responsive-h`}
      >
        <h1
          className={`${
            darkMode
              ? " from-red-300 to-indigo-600"
              : "from-red-300  to-indigo-600"
          } text-3xl font-bold bg-gradient-to-r bg-clip-text text-transparent mb-5`}
        >
          Регистрация в BlogMate
        </h1>
        <span className={`${darkMode ? " text-white" : ""} font-bold text-sm`}>
          {err
            ? errorMessage.split("(")[1].replace(")", "")
            : "Войдите в свой аккаунт"}
        </span>
        <div className="flex flex-col sm:px-16 px-10 pb-5 pt-5 flex-1 w-full justify-between">
          <div className="flex flex-col gap-5 sm:pb-0 pb-10">
            <button
              onClick={loginWithGoogle}
              className="bg-white shadow-lg ease-out duration-300 focus:scale-[1.10] hover:scale-[1.10] active:scale-100 font-semibold p-4 my-2 rounded-2xl"
            >
              <span className="flex items-center justify-center gap-5 relative">
                <FcGoogle size={25} className="absolute left-0" />
                Войти через Google
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
