import styles from "@/styles/Home.module.css";
import { useState, useEffect } from "react";
import SubmitForm from "components/SubmitForm/SubmitForm";
import axios from "axios";
import { prisma } from "../../server/db/client";

export default function Home({ posts }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  // const [posts, setPosts] = useState([]);

  // useEffect(() => {
  //   setPosts(...posts);
  // }, []);

  let newPosts = { ...posts };
  useEffect(() => {
    console.log(newPosts);
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await axios.post("/api/posts", { title, content });
    // setPosts([...posts, res.data])
    console.log(res.data);
  };

  return (
    <>
      <main className={styles.main}>
        <SubmitForm handleSubmit={handleSubmit} />
        {/* {posts.map((post) => {
          return (
            <div key={post.id}>
              <h2>{post.title}</h2>
              <p>{post.content}</p>
            </div>
          );
        })} */}
      </main>
    </>
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
