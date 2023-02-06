import React from "react";

export default function Card({ title, content }) {
  return (
    <>
      <div className="flex flex-col max-w-md mx-auto justify-center items-start bg-gray-200 px-4 py-2 rounded-lg w-full">
        <h2 className="text-xl text-[#182232] font-semibold">{title}</h2>
        <p>{content}</p>
      </div>
    </>
  );
}
