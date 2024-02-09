import React, { useContext } from "react";
import { UserContext } from "../UserContext";
import { Link } from "react-router-dom";

const BlogPost = ({ id, title, summary, files: cover, author, timestamp }) => {
 

  const dateInMillis = timestamp.seconds * 1000;
  var date = new Date(dateInMillis).toDateString().slice(4, 15);

  return (
    <div
      className={`flex flex-col p-2 mt-5 rounded-lg gap-3 md:gap-5 w-full animate-slideUp h-full`}
    >
      <div className="flex-[2]">
        <Link to={`/post/${id}`}>
          <img
            src={cover}
            alt="Blog iamge"
            className={`w-full h-52 ease-out duration-300 cubic-bezier(0.22, 0.61, 0.36, 1) focus:scale-[1.05] hover:scale-[1.05] active:scale-100 object-cover rounded-3xl shadow-md text-white flex items-center justify-center`}
          />
        </Link>
      </div>
      <div className="flex-[3] flex flex-col justify-start px-3 md:py-3 md:px-0 relative group">
        <Link to={`/post/${id}`}>
          <h1
            className="text-slate-900 text-2xl font-semibold line-clamp-2"
          >
            {title}
          </h1>
        </Link>
        <span
          className="flex flex-wrap py-5 gap-2 items-center font-medium text-slate-900"
          
        >
          <span>{`By ${author.userName}`}</span>
          <div
            className="h-3/4 w-[2px] bg-black"
    
          ></div>
          {date}
        </span>
        <p
          className="text-slate-500 line-clamp-2"
        >
          {summary}
        </p>
      </div>
    </div>
  );
};

export default BlogPost;
