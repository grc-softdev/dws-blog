import styled from "styled-components";

export const Wrapper = styled.main`
  min-height: 100vh;
  padding-bottom: 100px;

  /* Mobile first */
  margin-left: 12px;
  margin-right: 12px;

  @media (min-width: 480px) {
    margin-left: 16px;
    margin-right: 16px;
  }

  @media (min-width: 768px) {
    margin-left: 32px;
    margin-right: 32px;
  }

  @media (min-width: 1200px) {
    margin-left: 56px;
    margin-right: 56px;
  }
`;

export const Container = styled.div`
  width: 100%;
  max-width: 1100px;
  margin: 0 auto;
  margin-bottom: 16px;
  padding: 0 8px;

  @media (min-width: 480px) {
    padding: 0 12px;
  }

  @media (min-width: 768px) {
    padding: 0 16px;
  }
`;

export const Grid = styled.div`
display: grid;
  gap: 24px;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  justify-items: center;
  padding-inline: 8px;

  @media (min-width: 480px) {
    padding-inline: 12px;
  }

  @media (min-width: 768px) {
    padding-inline: 16px;
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
  }

  @media (min-width: 1200px) {
    grid-template-columns: repeat(3, 1fr);
    gap: 24px;
  }
`;
