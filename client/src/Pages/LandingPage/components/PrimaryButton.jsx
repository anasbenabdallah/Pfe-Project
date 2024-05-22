//;
import styled from "styled-components";
import { Link } from "react-router-dom";
const PrimaryButton = ({ name, to }) => {
  return (
    <Link to={to}>
      <ButtonStyled>{name}</ButtonStyled>
    </Link>
  );
};

const ButtonStyled = styled.button`
  padding: 0.7rem 2rem;
  background-color: var(--accent-pink);
  border: none;
  outline: none;
  border-radius: 18px;
  color: inherit;
  font-size: 1rem;
  font-family: inherit;
  cursor: pointer;
`;

export default PrimaryButton;
