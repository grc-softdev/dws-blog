
import styled from "styled-components";
import Authors from "./Authors";
import Categories from "./Categories";

const Section = styled.div`
  background-color: #fff;
  border-radius: 12px;
  flex-direction: column;
  align-items: start;
  justify-content: start;
  margin-top: 10px;
  width: 314px;
`;

const SideComponent = () => {
  return (
    <Section>
      <h3>Filters</h3>
    <Categories/>
    <Authors/>
    </Section>
  )
};

export default SideComponent;
