import { useQuery } from "@tanstack/react-query";
import styled from "styled-components";
import Navbar from "./components/Navbar";
import SideComponent from "./components/SideComponent";
import PostCard from "./components/PostCard";
import Sort from "./components/Sort";
import { useMemo } from "react";
import { useAppDispatch, useAppSelector } from "./store/hooks";
import {
  setCategory,
  setAuthor,
} from "./store/filtersSlice";

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
    display: flex;
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

function App() {
  const dispatch = useAppDispatch();
  const { order, searchTerm, selectedCategory, selectedAuthor } =
    useAppSelector((s) => s.filters);

  const handleApplyFilters = (
    category: string | null,
    author: string | null
  ) => {
    dispatch(setCategory(category));
    dispatch(setAuthor(author));
  };

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["posts"],
    queryFn: async () => {
      const res = await fetch("https://tech-test-backend.dwsbrazil.io/posts/");
      if (!res.ok) throw new Error("Error to search posts");
      return res.json();
    },
  });

  const filteredAndSortedPosts = useMemo(() => {
    if (!data) return [];
    let filtered = data;

    const query = searchTerm.trim().toLowerCase();
    if (query) {
    filtered = filtered.filter((post: any) => {
      const title = (post.title ?? "").toLowerCase();
      const content = (post.content ?? "").toLowerCase();
      const authorName = (post.author?.name ?? "").toLowerCase();
      return (
        title.includes(query) ||
        content.includes(query) ||
        authorName.includes(query)
      );
    });
  }

    if (selectedCategory) {
      filtered = filtered.filter((post) =>
        post.categories.some((cat) => cat.id === selectedCategory)
      );
    }

    if (selectedAuthor) {
      filtered = filtered.filter((post) => post.author.id === selectedAuthor);
    }

    return [...filtered].sort((a, b) =>
      order === "newest"
        ? a.title.localeCompare(b.title)
        : b.title.localeCompare(a.title)
    );
  }, [data, order, selectedCategory, selectedAuthor, searchTerm]);

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error: {(error as Error).message}</p>;

  return (
    <PageWrapper>
      <Navbar/>
      <Header>
        <h2>DWS Blog</h2>
        <Sort />
      </Header>
      <Sections>
        <SideComponent onApplyFilters={handleApplyFilters}/>
        <Container>
  {filteredAndSortedPosts.length === 0 ? (
    <p>There's no result</p>
  ) : (
    filteredAndSortedPosts.map((post) => (
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
    ))
  )}
</Container>
      </Sections>
    </PageWrapper>
  );
}

export default App;