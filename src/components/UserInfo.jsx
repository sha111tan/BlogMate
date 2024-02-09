import React, { useContext, useState } from "react";
import { IoMdAddCircle, IoMdRemoveCircle } from "react-icons/io";
import { BiArrowBack } from "react-icons/bi";
import { UserContext } from "../UserContext";
import { updateProfile } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate, Link } from "react-router-dom";

const FileInput = () => {
  const [image, setImage] = useState(null);
  const { url, setUrl, userInfo} = useContext(UserContext);

  const uploadImage = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("image", image);

    const response = await fetch(
      "https://api.imgbb.com/1/upload?key=52d55e3fe45e98af912de1d70861a822",
      {
        method: "POST",
        body: formData,
      }
    );

    const data = await response.json();
    console.log(data?.data?.url);
    setUrl(data?.data?.url);
  };

  const handleFileInputChange = (e) => {
    setImage(e.target.files[0]);
  };

  return (
    <div className="flex flex-col items-center">
      <div className="w-28 h-28 rounded-full outline-none relative">
        <img
          src={url !== "" ? url : userInfo?.photoURL}
          className="w-full h-full rounded-full object-cover"
        />
        <label htmlFor="image" className="absolute right-0 bottom-2">
          {url == "" ? (
            <IoMdAddCircle
              size={25}
              className="bg-white text-accent rounded-full"
            />
          ) : (
            <IoMdRemoveCircle
              size={25}
              className="bg-white text-red rounded-full"
            />
          )}
        </label>
        <input
          type="file"
          className="hidden"
          id="image"
          onChange={handleFileInputChange}
        />
      </div>
      <button
        onClick={uploadImage}
        className="mt-5 p-3 ease-out font-bold duration-300 cubic-bezier(0.22, 0.61, 0.36, 1) shadow-xl focus:scale-[1.10] hover:scale-[1.10] active:scale-100 text-white rounded-xl bg-gradient-to-r from-gray-700 to-gray-900"
      >
        Применить изменения
      </button>
      <span
        className="text-light-mode-text text-xs pt-1"
      ></span>
    </div>
  );
};

const UserInfo = () => {
  const { darkMode, userInfo, url } = useContext(UserContext);
  const navigate = useNavigate();
  const photoURL = url !== "" ? url : userInfo?.photoURL;
  const [name, setName] = useState(userInfo?.displayName || "");

  const updateUser = (e) => {
    e.preventDefault();
    updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: photoURL,
    })
      .then(() => {
        // Profile updated!
        console.log(userInfo);
        navigate("/");
      })
      .catch((error) => {
        // An error occurred
        console.log(error);
      });
  };

  return (
    <div
      className="sm:bg-light-mode min-h-body rounded-3xl shadow-md w-screen flex items-center justify-center"
    >
      <div
        className="bg-gradient-to-br from-gray-200 to-white shadow-md sm:rounded-xl rounded-3xl shadow-form flex flex-col items-center pb-5 sm:pb-10 sm:w-[500px] w-full sm:min-h-max min-h-body"
      >
        <Link
          to="/"
          className="text-light-mode-text pt-5 sm:hidden flex items-center gap-2 text-sm hover:underline underline-offset-4 pb-5"
        >
          <BiArrowBack /> Вернуться на Главную
        </Link>
        <h1
          className="text-2xl md:text-3xl font-bold text-center mt-10 mb-5"
        >
          Профиль
        </h1>
        <form
          onSubmit={updateUser}
          className="flex flex-col sm:px-16 px-10 pb-5 pt-5 flex-1 w-full justify-between"
        >
          <div className="flex flex-col gap-5 items-center justify-center">
            <FileInput />
            <input
              onChange={(e) => setName(e.target.value)}
              value={name}
              type="name"
              name="name"
              id="name"
              size={1}
              className="border-light-mode border-2 bg-white text-black p-4 text-lg rounded-3xl outline-none shadow-md placeholder:text-sm w-full"
              placeholder="Куда мы лезем, боже... "
              required
            />
          </div>
          <div className="flex flex-col gap-5 sm:pb-0 pb-10">
            <button className="bg-gradient-to-r from-gray-700 to-gray-900 ease-out duration-300 cubic-bezier(0.22, 0.61, 0.36, 1) focus:scale-[1.10] hover:scale-[1.10] active:scale-100 text-white font-semibold p-4 my-5 rounded-2xl hover:bg-dark">
              Продолжить
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserInfo;
