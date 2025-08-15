import styled from "styled-components";
import { RiArrowUpDownFill } from "react-icons/ri";

interface OrderProps {
  order: "newest" | "oldest";
}

interface SortProps {
  onSortChange: (order: OrderProps["order"]) => void;
  order: OrderProps["order"];
}

const SortContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: var(--body-size);
  color: var(--gray-darkest);

  span.label {
    font-weight: bold;
  }
`;

const SortButton = styled.button<{ order: OrderProps["order"] }>`
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 4px 8px;
  border-radius: 16px;
  background-color: transparent;
  border: none;
  cursor: pointer;
  color: ${({ order }) => (order === "newest" ? "var(--gray-darkest)" : "var(--gray-medium)")};
  transition: all 0.2s ease;

  svg {
    color: ${({ order }) => (order === "newest" ? "teal" : "teal")};
    transition: all 0.2s ease;
  }

  &:hover {
    background-color: var(--cyan-dark);
    color: #fff;
    svg {
      color: #fff;
    }
  }
`;

const Sort = ({ order, onSortChange }: SortProps) => {
  const toggleOrder = () => {
    onSortChange(order === "newest" ? "oldest" : "newest");
  };
  return (
    <SortContainer>
      <span className="label">Sort by:</span>
      <SortButton order={order} onClick={toggleOrder}>
        {order === "newest" ? "Newest first" : "Oldest first"}
        <RiArrowUpDownFill />
      </SortButton>
    </SortContainer>
  );
};

export default Sort;