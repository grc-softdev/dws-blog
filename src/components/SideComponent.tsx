import styled from "styled-components";
import Authors from "./Authors";
import Categories from "./Categories";
import { GiSettingsKnobs } from "react-icons/gi";
import { useEffect, useState } from "react";
import { Button } from "./ui/Button";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { setCategories, setAuthor } from "../store/filtersSlice";

type SideComponentProps = {
  onApplyFilters: (category: string, author: string | null) => void;
};

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

const SideComponent = ({ onApplyFilters }: SideComponentProps) => {
  const dispatch = useAppDispatch();
  const { selectedCategories: globalCategories, selectedAuthor: globalAuthor } = useAppSelector((s) => s.filters);

  const [tempCategories, setTempCategories] = useState<string[]>([]);
  const [tempAuthor, setTempAuthor] = useState<string | null>(null);


  console.log({tempCategories})

  useEffect(() => {
    setTempCategories(globalCategories);
    setTempAuthor(globalAuthor);
  }, [globalCategories, globalAuthor]);


  const handleToggleCategory = (categoryId: string) => {
    setTempCategories((prev) =>
      prev.includes(categoryId)
        ? prev.filter((id) => id !== categoryId) 
        : [...prev, categoryId]
    );
  };

  const handleApply = () => {
    dispatch(setCategories(tempCategories));
    dispatch(setAuthor(tempAuthor));
  };

  return (
    <Section>
      <Header>
        <GiSettingsKnobs /> Filters
      </Header>
      <Categories onSelectCategories={handleToggleCategory} selectedCategories={tempCategories}/>
      <Authors onSelectAuthor={setTempAuthor} />

      <Button
        py="12px"
        fullWidth
        onClick={handleApply}
      >
        Apply filters
      </Button>
    </Section>
  );
};

export default SideComponent;
