import styles from "../styles/Home.module.css";
import { prisma } from "../../server/db/client";
import { useState, useEffect } from "react";
import axios from "axios";

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
    <main className={styles.main}>
      <div>
        <h1 className="text-2xl">Home</h1>
        <form
          onSubmit={handleSubmit}
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
        {newPosts.map((post) => (
          <div key={post.id}>
            <h2>{post.title}</h2>
            <p>{post.content}</p>
          </div>
        ))}
      </div>
    </main>
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
