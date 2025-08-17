import { FaSpinner } from "react-icons/fa";
import styled, { keyframes } from "styled-components";

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const Spinner = styled(FaSpinner)`
  font-size: 32px;
  color: var(--accent-dark, --accent-medium);
  animation: ${spin} 1s linear infinite;
`;

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 52px;
  margin-top: 52px;
`;

type LoadingProps = {
  message?: string;
};

const Loading = ({ message }: LoadingProps) => {
  return (
    <Container>
      <Spinner />
      {message && <span style={{ marginLeft: "8px" }}>{message}</span>}
    </Container>
  );
};

export default Loading;