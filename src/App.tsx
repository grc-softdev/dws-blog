import styled from "styled-components";
import Navbar from "./components/Navbar";
import SideComponent from "./components/SideComponent";
import PostCard from "./components/PostCard";
import Sort from "./components/Sort";
import { useMemo } from "react";
import { useAppSelector } from "./store/hooks";
import { Dropdown } from "./components/ui/Dropdown";
import Categories from "./components/Categories";
import Authors from "./components/Authors";
import { usePosts } from "./hooks/usePosts";
import { Wrapper } from "./components/layout/Layout";
import Loading from "./components/ui/Loading";

const TopBar = styled.section`
  display: flex;
  align-items: center;
  justify-content: space-between;
   /* Mobile */
  @media (max-width: 768px) {
    justify-content: space-evenly;
  }
`;

const Title = styled.h2`
  @media (max-width: 768px) {
    display: none;
  }
`;

const RightArea = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  margin-bottom: 16px;
`;

const MobileFilters = styled.div`
  display: flex;
  gap: 8px;
  @media (min-width: 768px) {
    display: none;
  }
`;

const Sections = styled.section`
  display: flex;
  align-items: flex-start;
  justify-content: center;
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
  gap: 24px;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  justify-items: center;
  padding-inline: 8px;

  @media (min-width: 768px) {
    grid-template-columns: repeat(1, 1fr);
    gap: 20px;
    
  @media (min-width: 1889px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 24px;
  }

  @media (min-width: 1200px) {
    grid-template-columns: repeat(3, 1fr);
    gap: 24px;
  }
`;

const NoResults = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  font-weight: 500;
  color: var(--neutral-dark);
`;

function App() {
  const { order, searchTerm, selectedCategories, selectedAuthors } =
    useAppSelector((s) => s.filters);
    console.log({selectedCategories})
  const { data, isLoading, isError, error } = usePosts();

  const filteredAndSortedPosts = useMemo(() => {
    if (!data) return [];
    let filtered = data;

    const query = searchTerm.trim().toLowerCase();
    if (query) {
      filtered = filtered.filter((post) => {
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

    if (selectedCategories.length > 0) {
      filtered = filtered.filter((post) =>
        post.categories.some((cat) =>
          selectedCategories.includes(cat.id)
        )
      );
    }

    if (selectedAuthors.length > 0) {
      filtered = filtered.filter((post) => {
        const authorId = post.author.id
        return selectedAuthors.includes(authorId)
      })
    }

    return [...filtered].sort((a, b) =>
      order === "newest"
        ? a.title.localeCompare(b.title)
        : b.title.localeCompare(a.title)
    );
  }, [data, order, selectedCategories, selectedAuthors, searchTerm]);

  if (isLoading) return <Loading />;
  if (isError) return <p>Error: {(error as Error).message}</p>;

  return (
    <Wrapper>
      <Navbar />
      <TopBar>
        <Title>DWS Blog</Title>
        <RightArea>
          <MobileFilters>
            <Dropdown isMobile label="Category">
              <Categories isMobile />
            </Dropdown>

            <Dropdown isMobile label="Author">
              <Authors isMobile />
            </Dropdown>
          </MobileFilters>

          <Sort />
        </RightArea>
      </TopBar>

      <Sections>
        <SideComponent/>

        <Container>
          {filteredAndSortedPosts.length === 0 ? (
            <Wrapper><NoResults>No results.</NoResults></Wrapper>
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
    </Wrapper>
  );
}

export default App;
