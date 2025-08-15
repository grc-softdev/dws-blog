import { useQuery } from "@tanstack/react-query";
import styled from "styled-components";
import Navbar from "./components/Navbar";
import SideComponent from "./components/SideComponent";
import PostCard from "./components/PostCard";
import Sort from "./components/Sort";
import { useState, useMemo } from "react";

function App() {
  const PageWrapper = styled.main`
    min-height: 100vh;
    margin-left: 16px;
    margin-right: 16px;

    @media (min-width: 768px) {
      margin-left: 32px;
      margin-right: 32px;
    }

    @media (min-width: 1200px) {
      margin-left: 56px;
      margin-right: 56px;
    }
  `;

  const Header = styled.section`
  display:  flex;
  align-items: center;
  justify-content: space-between;
  `;

  const Sections = styled.section`
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 16px;

    @media (min-width: 768px) {
      gap: 20px;
    }

    @media (min-width: 1200px) {
      gap: 24px;
    }
  `;

  const Container = styled.div`
    display: grid;
    grid-template-columns: 1fr;
    gap: 16px;

    @media (min-width: 768px) {
      grid-template-columns: repeat(2, 1fr);
      gap: 20px;
    }

    @media (min-width: 1200px) {
      grid-template-columns: repeat(3, 1fr);
      gap: 24px;
    }
  `;
  const [order, setOrder] = useState<"newest" | "oldest">("newest");

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["posts"],
    queryFn: async () => {
      const res = await fetch("https://tech-test-backend.dwsbrazil.io/posts/");
      if (!res.ok) throw new Error("Error to search posts");
      return res.json();
    },
  });

  const sortedPosts = useMemo(() => {
    if (!data) return [];
    return [...data].sort((a, b) => {
      if (order === "newest") {
        return a.title.localeCompare(b.title);
      } else {
        return b.title.localeCompare(a.title);
      }
    });
  }, [data, order]);

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error: {(error as Error).message}</p>;

  return (
    <PageWrapper>
      <Navbar />
      <Header>
      <h2>DWS Blog</h2>
      <Sort order={order} onSortChange={setOrder} />
      </Header>

      <Sections>
        <SideComponent />
        <Container>
          {sortedPosts.map((post) => (
            <PostCard
              key={post.id}
              id={post.id}
              title={post.title}
              image={post.thumbnail_url}
              author={post.author.name}
              date={post.createdAt}
              categories={post.categories}
              text={post.content}
            />
          ))}
        </Container>
      </Sections>
    </PageWrapper>
  );
}

export default App;