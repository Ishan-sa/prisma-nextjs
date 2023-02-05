import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/router";

export default function Profile({ handleSubmit }) {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await axios.post("/api/posts", { title, content });
    // setPosts([...posts, res.data]);
  };
  return (
    <>
      <div>
        <h1>Select the language</h1>
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
