import { useQuery } from "@tanstack/react-query";
import styled from "styled-components";

type Author = {
  name: string;
  id: string;
};

type AuthorsProps = {
  onSelectAuthor: (categoryId: string) => void;
  onCloseDropdown?: () => void;
  selectedId?: string; 
};

const Title = styled.h4`
  font-size: 14px;
  font-weight: 700;
  margin: 12px 0 8px;
`;

const List = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const Item = styled.div<{ $selected?: boolean }>`
  padding: 8px 0;
  cursor: pointer;
  border-bottom: 1px solid #eee;
  font-size: 14px;

  color: ${({ $selected }) => ($selected ? "var(--secondary-medium)" : "#333")};
  font-weight: ${({ $selected }) => ($selected ? 600 : 400)};

  &:last-child {
    border-bottom: none;
  }
  
`;

const Authors = ({ onSelectAuthor, onCloseDropdown }: AuthorsProps) => {
  const { data = [], isLoading, isError, error } = useQuery<Author[], Error>({
    queryKey: ["authors"],
    queryFn: async () => {
      const res = await fetch("https://tech-test-backend.dwsbrazil.io/authors/");
      if (!res.ok) throw new Error("Error to search authors");
      return res.json();
    },
    staleTime: 5 * 60 * 1000,
  });

  if (isLoading) return <p>Loading authors...</p>;
  if (isError) return <p>Error: {error.message}</p>;

  return (
    <div>
      <Title>Author</Title>
      <List>
        {data.map((author) => (
          <Item
            key={author.id}
            onClick={() => {
              onSelectAuthor(author.id)
              onCloseDropdown?.()
            }}
          >
            {author.name}
          </Item>
        ))}
      </List>
    </div>
  );
};

export default Authors;