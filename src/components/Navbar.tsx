import styled from "styled-components";
import logo from "../assets/logo.png";
import SearchBar from "./SearchBar";

const Container = styled.header`
  height: 70px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #dcdcdc;
`;

const Brand = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Logo = styled.img`
  width: 150px;
  height: auto;
`;

const Tagline = styled.span`
  font-size: var(--body-small-size);
  margin-top: 10px;
  margin-left: -10px;
`;

const Navbar = () => {
  return (
    <Container>
      <Brand>
        <Logo src={logo} alt="Dentsu logo" />
        <Tagline>world services</Tagline>
      </Brand>
      <SearchBar />
    </Container>
  );
};

export default Navbar;
