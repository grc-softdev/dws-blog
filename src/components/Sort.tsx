import styled from "styled-components";
import { RiArrowUpDownFill } from "react-icons/ri";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { setOrder } from "../store/filtersSlice";

interface OrderProps {
  order: "newest" | "oldest";
}

const SortContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: var(--body-size);
  color: var(--neutral-darkest);
`;

const Span = styled.span`
 color: var(--neutral-dark);
  font-weight: bold;
  @media (max-width: 768px) {
    display: none;
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
  margin-top: 18px;
  color: ${({ order }) =>
    order === "newest" ? "var(--neutral-darkest)" : "var(--neutral-medium)"};
  transition: all 0.2s ease;

  svg {
    color: ${({ order }) => (order === "newest" ? "teal" : "teal")};
    transition: all 0.2s ease;
  }

  &:hover {
    background-color: var(--accent-medium);
    color: #fff;
    svg {
      color: #fff;
    }
  }
`;

const Sort = () => {
  const dispatch = useAppDispatch();
  const order = useAppSelector((state) => state.filters.order);

  const toggleOrder = () => {
    dispatch(setOrder(order === "newest" ? "oldest" : "newest"));
  };

  return (
    <SortContainer>
      <Span className="label">Sort by:</Span>
      <SortButton order={order} onClick={toggleOrder}>
        {order === "newest" ? "Newest first" : "Oldest first"}
        <RiArrowUpDownFill />
      </SortButton>
    </SortContainer>
  );
};

export default Sort;