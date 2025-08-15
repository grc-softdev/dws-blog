import styled from "styled-components";
import type { CategoryProp } from "./PostList";

type PostCardProps = { 
  title: string; 
  image: string;
  author: string;
  date: string;
  categories: CategoryProp[];
  text: string;
}

const Card = styled.div`
  background: #fff;
  border-radius: 12px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  width: 314px;
  height: 425px;
`;

const CardImage = styled.div`
  img {
    display: block;
    width: 100%;
    height: 196px;
  }
`;

const CardContent = styled.div`
  padding: 1rem;
  gap: 1 rem;
`;

const CardMeta = styled.div`
  display: flex;
  align-items: center;
  justify-content: start;
  font-size: var(--body-small-size);
  color: var(--gray-medium);
  margin-bottom: 0.5rem;

  .dot {
    margin: 0 0.5rem;
    color: var(--pink-dark)
  }
`;

const CardTitle = styled.h2`
  font-size: var(--h3-size);
  font-weight: var(--bold);
  color: var(--gray-darkest);
  margin-bottom: 0.5rem;
`;

const CardDescription = styled.p`
  font-size: var(--body-small-size);
  line-height: var(--body-line-height);
  color: var(--gray-dark);
  margin-bottom: 1rem;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const CardTags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;

  .tag {
    background: var(--gray-lightest);
    color: var(--gray-dark);
    font-size: var(--caption-size);
    padding: 0.5rem 0.75rem;
    border-radius: 16px;
  }
`;

const PostCard = ({ title, image, author, date, categories, text }: PostCardProps) => {
  const formattedDate = new Date(date).toLocaleDateString("en-BR", {
    month: "short",
    day: "2-digit",
    year: "numeric",
  });

  return (
    <Card>
      <CardImage>
        <img src={image} alt="Article" />
      </CardImage>
      <CardContent>
        <CardMeta>
          <span className="date">{formattedDate}</span>
          <span className="dot">•</span>
          <span className="author">{author}</span>
        </CardMeta>

        <CardTitle>{title}</CardTitle>
        <CardDescription>{text}</CardDescription>

        <CardTags>
          {categories.map((category) => (
            <span className="tag" key={category.id}>
              {category.name}
            </span>
          ))}
        </CardTags>
      </CardContent>
    </Card>
  );
};

export default PostCard;