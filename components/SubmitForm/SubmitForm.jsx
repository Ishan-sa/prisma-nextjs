import { useState } from "react";
import { useRouter } from "next/router";

export default function SubmitForm({ onSubmit = () => {} }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  return (
    <>
      <div>
        <h1 style={{ textAlign: "center" }}>Home</h1>
        <form
          onSubmit={onSubmit}
          style={{
            display: "flex",
            flexDirection: "column",
            maxWidth: "400px",
          }}
        >
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea
            value={content}
            placeholder="Post"
            onChange={(e) => setContent(e.target.value)}
          />
          <button type="submit">Submit</button>
        </form>
      </div>
    </>
  );
}
