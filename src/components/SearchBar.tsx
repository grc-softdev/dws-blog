import styled from "styled-components";
import { FaSearch } from "react-icons/fa";
import { useEffect, useState } from "react";

type SearchBarProps = {
  onSearchChange: (v: string) => void
}

const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  background-color: #f5f5f7;
  border-radius: 50px;
  padding: 8px 12px;
  width: 500px;
  border: 1px solid #e0e0e0;
  margin-bottom: 4px;
`;

const SearchInput = styled.input`
  flex: 1;
  border: none;
  outline: none;
  background: transparent;
  font-size: 16px;
  color: #333;

  &::placeholder {
    color: #777;
  }
`;

const SearchButton = styled.button`
  background-color: #0b0b1a;
  border: none;
  border-radius: 50%;
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  svg {
    color: white;
    font-size: 14px;
  }
`;

export default function SearchBar({ onSearchChange }: SearchBarProps) {
  const [value, setValue] = useState("");

  useEffect(() => {
    const id = setTimeout(() => onSearchChange(value), 250); // debounce
    return () => clearTimeout(id);
  }, [value, onSearchChange]);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearchChange(value);
  };
  return (
    <form onSubmit={submit}>
    <SearchContainer>
      <SearchInput
        type="text"
        placeholder="Search"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <SearchButton type="submit">
        <FaSearch />
      </SearchButton>
    </SearchContainer>
  </form>
  );
}
