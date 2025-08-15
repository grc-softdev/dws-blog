import styled from "styled-components";
import Authors from "./Authors";
import Categories from "./Categories";
import { GiSettingsKnobs } from "react-icons/gi";
import { useState } from "react";

const Section = styled.div`
  background-color: #fff;
  border-radius: 12px;
  border: 0.75px solid #e0e0e0;
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
      <button onClick={() => onApplyFilters(tempCategory, tempAuthor)}>
        Apply Filters
      </button>
    </Section>
  );
};

export default SideComponent;