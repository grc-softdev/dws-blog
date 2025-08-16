import { useQuery } from "@tanstack/react-query";
import styled from "styled-components";

type Category = {
  name: string;
  id: string;
};

type CategoriesProps = {
  onSelectCategory: (categoryId: string) => void;
  selectedId?: string;
}

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

  color: ${({ $selected }) => ($selected ? "var(--cyan-medium)" : "#333")};
  font-weight: ${({ $selected }) => ($selected ? 600 : 400)};

  &:last-child {
    border-bottom: none;
  }

  &:hover {
    color: var(--cyan-medium);
  }
  
  &:focus {
  color: var(--cyan-medium);
  border: 1px solid var(--cyan-medium);
  }
`;

const Categories = ({ onSelectCategory, selectedId }: CategoriesProps) => {
  const { data = [], error, isLoading, isError } = useQuery<Category[], Error>({
    queryKey: ["categories"],
    queryFn: async () => {
      const response = await fetch("https://tech-test-backend.dwsbrazil.io/categories/");
      if (!response.ok) throw new Error("Error to search categories");
      return (await response.json()) as Category[];
    },
    staleTime: 1000 * 60 * 5,
  });

  if (isLoading) return <div>Loading Categories...</div>;
  if (isError) return <div>Error: {error.message}</div>;

  return (
    <div>
      <Title>Category</Title>
      <List>
        {data.map((category) => (
          <Item
            key={category.id}
            $selected={category.id === selectedId}
            onClick={() => onSelectCategory(category.id)}
          >
            {category.name}
          </Item>
        ))}
      </List>
    </div>
  );
};

export default Categories;