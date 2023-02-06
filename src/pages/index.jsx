import styles from "../styles/Home.module.css";
import { prisma } from "../../server/db/client";
import { useState, useEffect } from "react";
import axios from "axios";
import SubmitForm from "components/SubmitForm/SubmitForm";

export default function Home({ posts }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [newPosts, setNewPosts] = useState(posts);

  useEffect(() => {
    setNewPosts(posts);
  }, [posts]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await axios.post("/api/posts", { title, content });
    setNewPosts([...newPosts, res.data]);
  };

  return (
    <div>
      <div className="flex justify-center items-center py-6 bg-gray-200">
        <h1 className="text-2xl font-bold">Home</h1>
      </div>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col max-w-md mx-auto gap-3 p-[2rem]"
      >
        <input
          className="border border-gray-300 rounded-md p-2"
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          rows={8}
          cols={50}
          className="border border-gray-300 rounded-md p-2"
          value={content}
          placeholder="Content"
          onChange={(e) => setContent(e.target.value)}
        />
        <button
          type="submit"
          className="px-2 py-2 bg-blue-500 rounded-lg text-white"
        >
          Submit
        </button>
      </form>
      <div className="card-cont">
        {newPosts.map((post) => (
          <div
            key={post.id}
            className="flex flex-col max-w-md mx-auto justify-center items-start bg-gray-200 px-4 py-2 rounded-lg w-full"
          >
            <h2 className="text-xl text-[#182232] font-semibold">
              {post.title}
            </h2>
            <p>{post.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export async function getServerSideProps() {
  const posts = await prisma.post.findMany();

  return {
    props: {
      posts: JSON.parse(JSON.stringify(posts)),
    },
  };
}
