//;
import styled from "styled-components";
import { Link } from "react-scroll";
import PrimaryButton from "./PrimaryButton";
import logo from "../assets/img/logo.svg";

const Navigation = () => {
  return (
    <NavigationStyled>
      <div className="logo">
        <img src={logo} alt="" />
      </div>
      <ul>
        <li>
          <Link to="header" spy={true} smooth={true}>
            Home
          </Link>
        </li>
        <li>
          <Link to="features" spy={true} smooth={true}>
            Features
          </Link>
        </li>
        <li>
          <Link to="about" spy={true} smooth={true}>
            About
          </Link>
        </li>
        <li>
          <Link to="support" spy={true} smooth={true}>
            Support
          </Link>
        </li>
        <li>
          <Link to="projects" spy={true} smooth={true}>
            Projects
          </Link>
        </li>
        <li>
          <Link to="questions" spy={true} smooth={true}>
            Questions
          </Link>
        </li>
        <li>
          <Link to="contact" spy={true} smooth={true}>
            Contact
          </Link>
        </li>
      </ul>
      <PrimaryButton name="Signup" to="/login" />
    </NavigationStyled>
  );
};

const NavigationStyled = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;

  ul {
    display: flex;
    justify-content: space-between;
    width: 40%;
    li {
      cursor: pointer;
    }
  }
`;

export default Navigation;
