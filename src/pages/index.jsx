import { prisma } from "../../server/db/client";
import { useState, useEffect } from "react";
import axios from "axios";
import Card from "components/Card/Card";
import Button from "components/Button/Button";

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
        <Button text="Submit" type="submit" />
      </form>
      <div className="card-cont">
        {newPosts.map((post) => (
          <Card key={post.id} title={post.title} content={post.content} />
        ))}
      </div>
    </div>
  );
}

export async function getServerSideProps() {
  const posts = await prisma.post.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return {
    props: {
      posts: JSON.parse(JSON.stringify(posts)),
    },
  };
}
