import React, { useState, useContext } from "react";
import { v4 as uuid } from "uuid";
import { MdAddAPhoto, MdRemoveCircle } from "react-icons/md";
import { IoMdReverseCamera } from "react-icons/io";
import { BiArrowBack } from "react-icons/bi";
import { Navigate, Link } from "react-router-dom";
import Editor from "../components/Editor";
import { UserContext } from "../UserContext";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase";

const FileInput = () => {
  const [file, setFile] = useState(null);
  const { postImage, setPostImage, darkMode } = useContext(UserContext);
  const files = postImage == "" ? "" : postImage;

  const handleFileInputChange = (event) => {
    const file = event.target.files[0];
    setFile(file);

    const reader = new FileReader();
    reader.onload = (e) => {
      e.preventDefault();
      setPostImage(e.target.result);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="flex flex-col relative">
      <label htmlFor="image" className="absolute right-2 top-2">
        {postImage == "" ? (
          <MdAddAPhoto
            size={25}
            className={`darkMode?'text-light-mode-text':'text-darker'`}
          />
        ) : (
          <IoMdReverseCamera size={25} className="text-red" />
        )}
      </label>
      <input
        type="file"
        className="hidden"
        id="image"
        onChange={handleFileInputChange}
        required
      />
      <img
        src={files}
        className="border-light-mode border-2 text-black h-40 text-lg rounded-3xl outline-none shadow-md"
      />
    </div>
  );
};

const Post = () => {
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [category, setCategory] = useState("");
  const [content, setContent] = useState("");
  const [redirect, setRedirect] = useState(false);
  const { darkMode, userInfo, postImage } = useContext(UserContext);
  const files = postImage == "" ? "" : postImage;

  const createNewPost = async (e) => {
    e.preventDefault();

    const unique_id = uuid();
    const _id = unique_id.slice(0, 8).toUpperCase();

    // create new post
    await setDoc(doc(db, "posts", _id), {
      title,
      summary,
      category,
      files,
      content,
      uid: userInfo.uid,
      comments: [],
      author: {
        userName: userInfo.displayName,
        email: userInfo.email,
        profile: userInfo.photoURL,
      },
      id: _id,
      timestamp: serverTimestamp(),
    });
    setRedirect(true);
  };

  if (redirect) {
    return <Navigate to="/" />;
  }

  return (
<<<<<<< Updated upstream
    <div
      className={`${
        darkMode ? "bg-gradient-to-r from-zinc-900 to-zinc-800" : "flex justify-center min-h-body bg-gradient-to-br from-gray-200 to-white"
      } flex justify-center min-h-body`}
    >
=======
    <div className="flex justify-center min-h-body bg-gradient-to-br from-gray-200 to-white">
>>>>>>> Stashed changes
      <div className="max-w-xl mx-auto flex flex-col items-center p-5 w-full">
        <Link
          to="/"
          className={`${
            darkMode ? "text-dark-text" : "text-light-mode-text"
          } flex items-center gap-2 text-sm  hover:underline underline-offset-4 pb-5`}
        >
          <BiArrowBack /> Вернуться на Главную
        </Link>
        <h1
          className={`${
            darkMode ? "text-white" : ""
          } text-3xl font-semibold text-center mt-5 mb-10`}
        >
          Создать статью:
        </h1>
        <form className="flex flex-col gap-5" onSubmit={createNewPost}>
          <div className="flex flex-col gap-3">
            <h2
              className={`${
                darkMode ? "text-dark-text" : "text-light-mode-text"
              } text-2xl`}
            >
              Название статьи:
            </h2>
            <input
              className={`${
                darkMode ? "text-white" : ""
<<<<<<< Updated upstream
              } border-light-mode bg-white border-2 text-black p-4 text-lg rounded-3xl outline-none shadow-md placeholder:text-sm w-full`}
=======
              } border-light-mode bg-white border-2 text-black p-4 text-lg rounded-3xl outline-none shadow-md resize-none placeholder:text-sm w-full`}
>>>>>>> Stashed changes
              type="text"
              required
              name="title"
              id="title"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-3">
            <h2
              className={`${
                darkMode ? "text-dark-text" : "text-light-mode-text"
              } text-2xl`}
            >
              Краткое описание:
            </h2>
            <textarea
              className={`${
                darkMode ? "text-white" : ""
<<<<<<< Updated upstream
              } border-light-mode bg-white border-2 text-black p-4 text-lg rounded-3xl outline-none shadow-md placeholder:text-sm w-full resize-none h-24`}
=======
              } border-light-mode border-2 bg-white text-black p-4 text-lg rounded-3xl outline-none shadow-md placeholder:text-sm w-full resize-none h-24`}
>>>>>>> Stashed changes
              type="text"
              required
              name="summary"
              id="summary"
              placeholder="Summary"
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
            />
          </div>

          <div
            className={`flex flex-col  gap-3 ${
              darkMode ? "text-dark-text" : "text-light-mode-text"
            }`}
          >
            <h2 className={`text-2xl`}>Добавить изображение:</h2>
            <FileInput />
          </div>

          <div className="flex flex-col gap-3">
            <h2
              className={`${
                darkMode ? "text-dark-text" : "text-light-mode-text"
              } text-2xl `}
            >
              Текст статьи:
            </h2>
            <Editor
              value={content}
              onChange={setContent}
              theme={darkMode && "text-white"}
            />
          </div>

          <button className="bg-gradient-to-r from-gray-700 to-gray-900 duration-300 focus:scale-[1.05] hover:scale-[1.05]   active:scale-100 text-white font-semibold p-4 my-10 rounded-2xl hover:bg-dark">
            Опубликовать
          </button>
        </form>
      </div>
    </div>
  );
};

export default Post;
