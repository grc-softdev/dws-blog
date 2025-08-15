import styled from "styled-components";
import logo from "../assets/logo.png";
import SearchBar from "./SearchBar";
import { Link } from "react-router-dom";

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
margin-left: -20px;
  width: 150px;
  height: auto;
`;

const Tagline = styled.span`
  font-size: var(--body-small-size);
  margin-top: 10px;
  margin-left: -10px;
`;

const Navbar = ({ onSearchChange, searchTerm }) => {
  return (
    <Container>
      <Link to={`/`} style={{ textDecoration: "none", color: "inherit" }}>
        <Brand>
          <Logo src={logo} alt="logo" />
          <Tagline>world services</Tagline>
        </Brand>
      </Link>
      <SearchBar onSearchChange={onSearchChange} searchTerm={searchTerm} />
    </Container>
  );
};

export default Navbar;
