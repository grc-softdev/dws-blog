import styled from "styled-components";
import Authors from "./Authors";
import Categories from "./Categories";
import { GiSettingsKnobs } from "react-icons/gi";
import { useState } from "react";
import { Button } from "./ui/Button";

const Section = styled.div`
  background-color: #fff;
  border-radius: 12px;
  flex-direction: column;
  align-items: start;
  justify-content: start;
  margin-top: 10px;
  width: 314px;
`;

const SideComponent = ({ onApplyFilters }) => {
  const [tempCategory, setTempCategory] = useState<string | null>(null);
  const [tempAuthor, setTempAuthor] = useState<string | null>(null);

  return (
    <Section>
      <h3>
        <GiSettingsKnobs /> Filters
      </h3>
      <Categories onSelectCategory={setTempCategory} />
      <Authors onSelectAuthor={setTempAuthor} />
      <Button onClick={() => onApplyFilters(tempCategory, tempAuthor)}>
        Apply Filters
      </Button>
    </Section>
  );
};

export default SideComponent;