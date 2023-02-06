import React from "react";

export default function Button({ text, type }) {
  return (
    <>
      <button
        type={type}
        className="px-2 py-2 bg-blue-500 rounded-lg text-white hover:bg-blue-600"
      >
        {text}
      </button>
    </>
  );
}
