import { useQuery } from "@tanstack/react-query";
import PostList from "./components/PostList";
import styled from "styled-components";
import Navbar from "./components/Navbar";
import SideComponent from "./components/SideComponent";

function App() {
  const PageWrapper = styled.div`
    min-height: 100vh;
    background: linear-gradient(
      135deg,
      rgba(191, 233, 255, 1) 0%,
      rgba(255, 204, 230, 1) 100%
    );
  `;

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["posts"],
    queryFn: async () => {
      const res = await fetch("https://tech-test-backend.dwsbrazil.io/posts/");
      if (!res.ok) throw new Error("Error to search posts");
      return res.json();
    },
  });

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error: {(error as Error).message}</p>;

  return (
    <div>
      <Navbar />
      <div>
        <SideComponent />
        <PageWrapper>
          {data.map((post: any) => (
            <PostList
              key={post.id}
              title={post.title}
              image={post.thumbnail_url}
              author={post.author.name}
              date={post.createdAt}
              categories={post.categories}
              text={post.content}
            />
          ))}
        </PageWrapper>
      </div>
    </div>
  );
}

export default App;
