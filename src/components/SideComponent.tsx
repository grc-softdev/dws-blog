import styled from "styled-components";
import Authors from "./Authors";
import Categories from "./Categories";
import { GiSettingsKnobs } from "react-icons/gi";
import { useState } from "react";
import { Button } from "./ui/Button";
import { useAppDispatch } from "../store/hooks";
import { setCategories, setAuthors } from "../store/filtersSlice";

const Section = styled.div`
  background-color: #fff;
  border-radius: 12px;
  padding: 16px;
  width: 280px;
  max-width: 280px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  border: 1px solid var(--neutral-light);

  @media (max-width: 767px) {
    display: none;
  }

  @media (width: 767px) {
    min-width: 280px;
  }
`;

const Header = styled.h3`
  font-size: 18px;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 8px;
  margin: 0;
`;

const SideComponent = () => {
  const dispatch = useAppDispatch();

  const [tempCategories, setTempCategories] = useState<string[]>([]);
  const [tempAuthors, setTempAuthors] = useState<string[]>([]);

  const handleToggleCategory = (categoryId: string) => {
    setTempCategories((prev) =>
      prev.includes(categoryId)
        ? prev.filter((id) => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  const handleToggleAuthor = (authorId: string) => {
    setTempAuthors((prev) =>
      prev.includes(authorId)
        ? prev.filter((id) => id !== authorId)
        : [...prev, authorId]
    );
  };

  const handleApply = () => {
    dispatch(setCategories(tempCategories));
    dispatch(setAuthors(tempAuthors));
  };

  return (
    <Section>
      <Header>
        <GiSettingsKnobs /> Filters
      </Header>
      <Categories
        setTempCategories={handleToggleCategory}
        tempCategories={tempCategories}
      />
      <Authors setTempAuthors={handleToggleAuthor} tempAuthors={tempAuthors} />

      <Button py="12px" fullWidth onClick={handleApply}>
        Apply filters
      </Button>
    </Section>
  );
};

export default SideComponent;
