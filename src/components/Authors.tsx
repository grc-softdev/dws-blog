import { useQuery } from "@tanstack/react-query";
import styled from "styled-components";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { setAuthors } from "../store/filtersSlice";
import Loading from "./ui/Loading";

type Author = {
  name: string;
  id: string;
};

type AuthorsProps =
  | {
      isMobile: true;
      setTempAuthors?: never;
      tempAuthors?: never;
    }
  | {
      isMobile?: false;
      setTempAuthors: (authorId: string) => void;
      tempAuthors?: string[];
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

const Authors = ({
  setTempAuthors,
  tempAuthors,
  isMobile
}: AuthorsProps) => {
  const {
    data = [],
    isLoading,
    isError,
    error,
  } = useQuery<Author[], Error>({
    queryKey: ["authors"],
    queryFn: async () => {
      const res = await fetch(
        "https://tech-test-backend.dwsbrazil.io/authors/"
      );
      if (!res.ok) throw new Error("Error to search authors");
      return res.json();
    },
    staleTime: 5 * 60 * 1000,
  });

  const { selectedAuthors } =
  useAppSelector((s) => s.filters);
  const dispatch = useAppDispatch();

  if (isLoading) return <Loading/>;
  if (isError) return <p>Error: {error.message}</p>;

  const toggle = (list: string[], id: string) =>
    list.includes(id) ? list.filter(x => x !== id) : [...list, id];

  return (
    <div>
      <Title>Author</Title>
      <List>
        {data.map((author) => {
        const isSelected = isMobile ? selectedAuthors?.includes(author.id) ?? false : tempAuthors?.includes(author.id) ?? false;
          return (
            <li key={author.id}>
            <Item
            selected={isSelected}
              key={author.id}
              onClick={() => {
                if (!isMobile) {
                  setTempAuthors(author.id);
                  return;
                }
                dispatch(setAuthors(toggle(selectedAuthors, author.id)));
              }}
            >
              {author.name}
            </Item>
            </li>
          );
        })}
      </List>
    </div>
  );
};

export default Authors;
