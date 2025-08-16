import styled from "styled-components";
import Authors from "./Authors";
import Categories from "./Categories";
import { GiSettingsKnobs } from "react-icons/gi";
import { useState } from "react";
import { Button } from "./ui/Button";

type SideComponentProps = {
  onApplyFilters: (category: string | null, author: string | null) => void;
};

const Section = styled.div`
  background-color: #fff;
  border-radius: 12px;
  padding: 16px;
  width: 314px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  border: 1px solid var(--gray-light);
  
  @media (max-width: 767px) {
    display: none;
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
  const [tempCategory, setTempCategory] = useState<string | null>(null);
  const [tempAuthor, setTempAuthor] = useState<string | null>(null);

  return (
    <Section>
      <Header>
        <GiSettingsKnobs /> Filters
      </Header>

      <Categories onSelectCategory={setTempCategory} />
      <Authors onSelectAuthor={setTempAuthor} />

      <Button fullWidth onClick={() => onApplyFilters(tempCategory, tempAuthor)}>
        Apply filters
      </Button>
    </Section>
  );
};

export default SideComponent;