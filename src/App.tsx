import { useQuery } from "@tanstack/react-query";
import styled from "styled-components";
import Navbar from "./components/Navbar";
import SideComponent from "./components/SideComponent";
import PostCard from "./components/PostCard";

function App() {
  const PageWrapper = styled.main`
  min-height: 100vh;

  /* Mobile */
  margin-left: 16px;
  margin-right: 16px;

  /* Tablet */
  @media (min-width: 768px) {
    margin-left: 32px;
    margin-right: 32px;
  }

  /* Desktop */
  @media (min-width: 1200px) {
    margin-left: 56px;
    margin-right: 56px;
  }
`;

  const Sections = styled.section`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 16px; /* gutter mobile */

  @media (min-width: 768px) {
    gap: 20px; /* gutter tablet */
  }

  @media (min-width: 1200px) {
    gap: 24px; /* gutter desktop */
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
    <PageWrapper>
      <Navbar />
      <h2>DWS Blog</h2>
      <Sections>
        <SideComponent />
        <Container>
          {data.map((post: any) => (
            <PostCard
              key={post.id}
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
