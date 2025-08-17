import { useQuery } from "@tanstack/react-query";
import styled from "styled-components";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { setCategories } from "../store/filtersSlice";
import Loading from "./ui/Loading";

type Category = {
  name: string;
  id: string;
};

type CategoriesProps =
  | {
      isMobile: true;
      setTempCategories?: never;
      tempCategories?: never;
    }
  | {
      isMobile?: false;
      setTempCategories: (categoryId: string) => void;
      tempCategories?: string[];
    };

const Title = styled.h4`
  font-size: 14px;
  font-weight: 700;
  margin: 12px 0 8px;
`;

const List = styled.ul`
  display: flex;
  flex-direction: column;
  padding: 0;
  margin: 0;
  list-style: none;
  li + li {
    border-top: 1px solid var(--neutral-extra-light);
  }
`;

const Item = styled.button<{ selected?: boolean }>`
  width: 100%;
  text-align: left;
  background: ${({ selected }) =>
    selected
      ? "color-mix(in srgb, var(--accent-light) 5%, transparent)"
      : "transparent"};

  background: ${({ selected }) => (selected ? "accent-dark" : "transparent")};

  color: ${({ selected }) =>
    selected ? "var(--accent-dark)" : "var(--neutral-darkest)"};
  border: ${({ selected }) =>
    selected ? "1px solid var(--accent-dark)" : "1px solid transparent"};
  border-radius: 12px;
  padding: 12px 16px;
  font-size: 14px;
  font-weight: ${({ selected }) => (selected ? 600 : 400)};
  cursor: pointer;
  outline: none;
  transition: background 120ms ease, color 120ms ease, border-color 120ms ease;

  &:hover {
    color: var(--accent-dark);
    background: ${({ selected }) =>
      selected
        ? "color-mix(in srgb, var(--accent-light) 5%, transparent)"
        : "transparent"};
  }

  &:focus-visible {
    box-shadow: 0 0 0 2px color-mix(in srgb, var(--accent-light) 40%, white);
    border-color: var(--accent-dark);
  }
`;

const Categories = ({
  setTempCategories,
  tempCategories,
  isMobile,
}: CategoriesProps) => {
  const {
    data = [],
    error,
    isLoading,
    isError,
  } = useQuery<Category[], Error>({
    queryKey: ["categories"],
    queryFn: async () => {
      const response = await fetch(
        "https://tech-test-backend.dwsbrazil.io/categories/"
      );
      if (!response.ok) throw new Error("Error to search categories");
      return (await response.json()) as Category[];
    },
    staleTime: 1000 * 60 * 5,
  });

  const { selectedCategories } = useAppSelector((s) => s.filters);
  const dispatch = useAppDispatch();

  const toggle = (list: string[], id: string) =>
    list.includes(id) ? list.filter((x) => x !== id) : [...list, id];

  if (isLoading) return <Loading />;
  if (isError) return <div>Error: {error.message}</div>;

  return (
    <div>
      <Title>Category</Title>
      <List>
        {data.map((category) => {
          const isSelected = isMobile
            ? selectedCategories?.includes(category.id) ?? false
            : tempCategories?.includes(category.id) ?? false;
          return (
            <li key={category.id}>
              <Item
                selected={isSelected}
                onClick={() => {
                  if (!isMobile) {
                    setTempCategories(category.id);
                    return;
                  }
                  dispatch(
                    setCategories(toggle(selectedCategories, category.id))
                  );
                }}
              >
                {category.name}
              </Item>
            </li>
          );
        })}
      </List>
    </div>
  );
};

export default Categories;
