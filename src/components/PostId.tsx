import { useParams, useNavigate } from "react-router-dom";
import styled from "styled-components";
import Navbar from "../components/Navbar";
import PostCard from "../components/PostCard";
import { Button } from "../components/ui/Button";
import { FaArrowLeft } from "react-icons/fa";
import { usePost, usePosts } from "../hooks/usePosts";
import { formattedDate } from "../utils/format";
import { Grid, Wrapper } from "./layout/Layout";

const Container = styled.div`
  max-width: 1100px;
  margin: 0 auto;
  margin-bottom: 8px;
`;

const TopBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Title = styled.h1`
  font-size: clamp(28px, 4vw, 48px);
  line-height: 1.15;
  font-weight: 800;
  letter-spacing: -0.01em;
  margin: 16px 0 12px;
`;

const Meta = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  color: var(--gray-extra-dark, #5e5f63);
  font-size: 14px;
  margin-bottom: 16px;
`;

const Avatar = styled.img`
  width: 28px;
  height: 28px;
  border-radius: 50%;
  object-fit: cover;
  box-shadow: 0 0 0 2px #fff;
`;

const AuthorName = styled.span`
  color: var(--navy-medium, #060725);
  font-weight: 700;
`;

const Cover = styled.img`
  width: 100%;
  height: auto;
  border-radius: 16px;
  object-fit: cover;
  box-shadow: 0 10px 30px rgba(2, 3, 24, 0.1);
  margin: 12px 0 20px;

  @media (min-width: 768px) {
    margin: 16px 0 24px;
  }
`;

const Prose = styled.article`
  color: var(--neutral-darkest, #202122);
  font-size: 16px;
  line-height: 1.6;

  p {
    margin: 0 0 16px;
  }
  h2,
  h3 {
    margin: 28px 0 12px;
    line-height: 1.25;
  }
  ul,
  ol {
    padding-left: 20px;
    margin: 0 0 16px;
  }
  img {
    max-width: 100%;
    border-radius: 12px;
  }
  a {
    color: var(--accent-medium, #009598);
    text-decoration: underline;
  }
`;

const Divider = styled.hr`
  border: none;
  border-top: 1px solid var(--neutral-extra-light, #e0e2e6);
  margin: 32px 0;
`;

const SectionTitle = styled.h2`
  font-size: clamp(20px, 2.5vw, 28px);
  margin: 0 0 16px;
  padding-inline: 8px;

  @media (min-width: 480px) {
    padding-inline: 12px;
  }

  @media (min-width: 768px) {
    padding-inline: 16px;
  }
`;

const PostId = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const postById = usePost(id);
  const posts = usePosts();

  if (postById.isLoading) return <p>Loading...</p>;
  if (postById.isError)
    return <p>Error: {(postById.error as Error).message}</p>;

  const data = postById.data!;
  const avatar = data.author?.profilePicture;
  const authorId = data.author?.id;
  const date = data.createdAt;

  const latestByAuthor = (posts.data || [])
    .filter(
      (p) =>
        p.id !== data.id &&
        (authorId
          ? p.author?.id === authorId
          : p.author?.name === data.author?.name)
    )
    .slice(0, 3);

  return (
    <Wrapper>
      <Navbar />
      <Container>
        <TopBar>
          <Button
            variant="secondary"
            iconLeft={<FaArrowLeft />}
            onClick={() => navigate(-1)}
          >
            Back
          </Button>
          <div />
        </TopBar>

        <Title>{data.title}</Title>

        <Meta>
          <Avatar src={avatar} alt={data.author?.name} />
          <span>
            Written by: <AuthorName>{data.author?.name}</AuthorName>
          </span>
          <span style={{ color: "var(--neutral-dark, #7f8185)" }}>
            • {formattedDate(date)}
          </span>
        </Meta>

        {data.thumbnail_url && (
          <Cover src={data.thumbnail_url} alt={data.title} />
        )}

        <Prose dangerouslySetInnerHTML={{ __html: data.content }} />

        <Divider />

        <SectionTitle>Latest articles</SectionTitle>
        <Grid>
          {latestByAuthor.map((p) => (
            <PostCard
              key={p.id}
              id={p.id}
              title={p.title}
              image={p.thumbnail_url}
              author={p.author?.name}
              date={p.createdAt}
              categories={p.categories}
              text={p.content}
            />
          ))}
        </Grid>
      </Container>
    </Wrapper>
  );
};

export default PostId;
