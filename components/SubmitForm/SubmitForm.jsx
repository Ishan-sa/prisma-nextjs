import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/router";
import { Cagliostro } from "@next/font/google";

export default function SubmitForm({ handleSubmit }) {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  return (
    <>
      <div>
        <h1 style={{ textAlign: "center" }}>Home</h1>
        <form
          style={{
            display: "flex",
            flexDirection: "column",
            padding: "1rem",
            maxWidth: "500px",
            gap: "1rem",
          }}
          onSubmit={handleSubmit}
        >
          <input
            type="text"
            name=""
            id=""
            value={title}
            placeholder="Title"
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Content"
          ></textarea>
          <button type="submit">Submit</button>
        </form>
      </div>
    </>
  );
}
