import styled from "styled-components";
import PostCard from "./PostCard";

type PostListProps = {
  title: string;
  image: string;
  author: string;
  date: string;
  categories: CategoryProp[];
  text: string;
};

export type CategoryProp = {
  name: string;
  id: string;
};

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 16px;
  padding: 0 16px;

  /* Tablet */
  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
    padding: 0 32px;
  }

  /* Desktop */
  @media (min-width: 1200px) {
    grid-template-columns: repeat(3, 1fr);
    gap: 24px;
    padding: 0 56px;
  }
`;

const PostList = ({ title, image, author, date, categories, text }: PostListProps) => {
  return (
    <Container>
      <PostCard
        title={title}
        image={image}
        author={author}
        date={date}
        categories={categories}
        text={text}
      />
    </Container>
  );
};

export default PostList;