import styled from "styled-components";

function Card({ account, amount, text, button, card, active, inactive }) {
  return (
    <CardStyled>
      <h4 className="card-title">{account}</h4>
      <h4 className="card-title"></h4>
      <p className="c-para">{text}</p>
      <div className="button-con">
        <button>{button}</button>
      </div>
      <div className="card-image-con">
        <img src={card} alt="" />
      </div>
      <div className="plan-con">
        <img src={active} alt="" />
        <img src={inactive} alt="" />
      </div>
    </CardStyled>
  );
}

const CardStyled = styled.div`
  background-color: white;
  padding: 3rem 2rem;
  border-radius: 50px;
  box-shadow: 0px 25px 50px rgba(22, 25, 79, 0.05);
  .card-title {
    font-size: 1.7rem;
    color: #000;
    text-align: center;
    padding: 1.5rem 0;
    span {
      font-size: 1.1rem;
    }
  }
  .button-con {
    text-align: center;
    padding: 1.4rem 0;
    button {
      border: 2px solid #16194f;
      padding: 0.6rem 1.5rem;
      outline: none;
      cursor: pointer;
      background: transparent;
      border-radius: 20px;
      font-size: inherit;
      color: #16194f;
    }
  }
  .card-image-con {
    display: flex;
    justify-content: center;
    img {
      width: 100%; /* Adjust the image width */
      max-width: 300px; /* Optionally set max-width for responsiveness */
    }
  }
  .plan-con {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 1.4rem 0;
    img {
      padding: 0 0.2rem;
    }
  }
  .text-check {
    display: flex;
    align-items: center;
    padding: 0.3rem 0;
    font-size: 1.1rem;
    img {
      padding-right: 0.3rem;
      width: 24px;
    }
    &:nth-child(6) {
      color: #b7b7b7;
    }
    &:nth-child(7) {
      color: #b7b7b7;
    }
    &:nth-child(8) {
      color: #b7b7b7;
    }
  }
`;
export default Card;
