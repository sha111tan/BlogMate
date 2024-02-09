import React, { useContext, useState } from "react";
import { UserContext } from "../UserContext";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";

const Comments = () => {
  const { userInfo, info } = useContext(UserContext);
  const [comment, setComment] = useState(info?.comments);
  const [input, setInput] = useState("");

  const postComment = () => {
    let commentObj = {
      user: userInfo.displayName,
      userImage: userInfo.photoURL,
      comment: input,
    };
    let commentDetails = comment.unshift(commentObj);
    const docRef = doc(db, "posts", info.id);
    updateDoc(docRef, {
      comments: comment,
    });
    setInput("");
  };

  return (
    <div
      className="bg-white text-light-mode-text p-5 mb-5 rounded-3xl shadow-md pb-10 w-full flex flex-col"
    >
      <>
        <h3 className="pt-3 pb-5 font-bold text-2xl">Комментарии</h3>
        {userInfo && (
          <div
            className="flex pb-5 flex-col items-center gap-3 border-b border-light-mode-text"
          
          >
            <div className="flex items-center gap-3 w-full">
              <img
                src={userInfo.photoURL}
                className="w-10 h-10 object-cover rounded-full"
              />
              <span
                className="text-black font-semibold"
              >
                {userInfo.displayName}
              </span>
            </div>
            <textarea
              type="text"
              className={`bg-transparent w-full p-5 rounded-lg resize-none outline-none`}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Напишите комментарий..."
            />
            <div className="flex w-full justify-end">
              <button
                onClick={postComment}
                className="py-2 px-3 bg-gradient-to-r font-bold from-gray-700 to-gray-900 text-white shadow-md ease-out duration-300 focus:scale-[1.10] hover:scale-[1.10] active:scale-100 text-xs rounded-2xl"
              >
                Опубликовать
              </button>
            </div>
          </div>
        )}
      </>
      <div className="flex flex-col py-10 gap-5">
        {info?.comments?.length !== 0 ? (
          info?.comments?.map((comment, i) => (
            <div key={i} className="flex flex-col gap-3">
              <div className="flex items-center gap-3 pt-1">
                <img
                  src={comment?.userImage}
                  className="rounded-full w-8 h-8 max-w-none"
                />
                <span
                  className="text-dark font-semibold"
                >
                  {comment?.user}
                </span>
              </div>
              <div
                className="border-light-mode-textflex flex-col gap-3 w-full"
              >
                <span className="text-dark">
                  {comment?.comment}
                </span>
              </div>
            </div>
          ))
        ) : (
          <div>Комментариев нет!</div>
        )}
      </div>
    </div>
  );
};

export default Comments;
