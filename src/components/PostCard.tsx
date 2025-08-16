import { Link } from "react-router-dom";
import styled from "styled-components";

type PostCardProps = {
  title: string;
  image: string;
  author: string;
  date: string;
  categories: CategoryProp[];
  text: string;
  id: string;
};

type CategoryProp = {
  name: string;
  id: string;
};

const Card = styled.div`
  background: #fff;
  border-radius: 12px;
  border: 0.75px solid #e0e0e0;
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
  align-items: start;
  justify-content: start;
  font-size: var(--body-small-size);
  color: var(--neutrals-medium);
  margin-bottom: 0.5rem;

  .dot {
    margin: 0 0.5rem;
    color: var(--secondary-dark);
  }
`;

const CardTitle = styled.h2`
  font-size: var(--h3-size);
  font-weight: var(--bold);
  color: var(--neutrals-darkest);
  margin-bottom: 0.5rem;
`;

const CardDescription = styled.p`
  font-size: var(--body-small-size);
  line-height: var(--body-line-height);
  color: var(--neutrals-dark);
  margin-bottom: 1rem;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const CardTags = styled.div`
  flex-wrap: wrap;
  gap: 0.5rem;

  .tag {
    background: var(--neutrals-lightest);
    color: var(--neutrals-dark);
    font-size: var(--caption-size);
    padding: 0.5rem 0.75rem;
    border-radius: 42px;
  }
`;

const PostCard = ({
  title,
  image,
  author,
  date,
  categories,
  text,
  id,
}: PostCardProps) => {
  const formattedDate = new Date(date).toLocaleDateString("en-BR", {
    month: "short",
    day: "2-digit",
    year: "numeric",
  });

  const apply = "apply";

  return (
    <Link to={`/posts/${id}`} style={{ textDecoration: "none" }}>
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
            {categories?.length ? (
              categories.map((category) => (
                <span className="tag" key={category.id}>
                  {category.name}
                </span>
              ))
            ) : (
              <span className="tag">{apply}</span>
            )}
          </CardTags>
        </CardContent>
      </Card>
    </Link>
  );
};

export default PostCard;
