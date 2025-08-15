import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import styled from "styled-components";
import Navbar from "../components/Navbar";

const Wrapper = styled.main`
  min-height: 100vh;
  margin: 16px;

  @media (min-width: 768px) {
    margin: 32px;
  }

  @media (min-width: 1200px) {
    margin: 56px;
  }
`;

const PostId = () => {
    const { id } = useParams();

    const { data, isLoading, isError, error } = useQuery({
      queryKey: ["post", id],
      queryFn: async () => {
        const res = await fetch(`https://tech-test-backend.dwsbrazil.io/posts/${id}`);
        if (!res.ok) throw new Error("Error to search post");
        return res.json();
      },
    });
  
    if (isLoading) return <p>Loading...</p>;
    if (isError) return <p>Error: {(error as Error).message}</p>;
  
    return (
      <>
        <Navbar />
        <Wrapper>
          <h1>{data.title}</h1>
          <p>Por {data.author?.name} — {new Date(data.createdAt).toLocaleDateString("pt-BR")}</p>
          <img src={data.thumbnail_url} alt={data.title} style={{ maxWidth: "100%", margin: "16px 0" }} />
          <div dangerouslySetInnerHTML={{ __html: data.content }} />
        </Wrapper>
      </>
    );
}

export default PostId