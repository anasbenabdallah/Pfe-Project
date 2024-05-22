import { useState } from "react";
import styled from "styled-components";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import LinkedInIcon from "@mui/icons-material/LinkedIn";

const initialState = {
  name: "",
  email: "",
  message: "",
};

export const ContactSection = () => {
  const [{ name, email, message }, setState] = useState(initialState);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setState((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(
      "Votre message a été envoyé avec succès. Nous vous répondrons dès que possible."
    );
    setState({ ...initialState });
  };

  return (
    <StyledContact id="contact">
      <div className="contact-container">
        <div className="left-column">
          <h2>Contactez-nous</h2>
          <p>
            Remplissez le formulaire ci-dessous pour nous envoyer un e-mail et
            nous vous répondrons dès que possible.
          </p>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              placeholder="Nom"
              required
              value={name}
              onChange={handleChange}
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              required
              value={email}
              onChange={handleChange}
            />
            <textarea
              name="message"
              placeholder="Message"
              required
              rows="4"
              value={message}
              onChange={handleChange}
            ></textarea>
            <button type="submit">Envoyer le message</button>
          </form>
        </div>
        <div className="right-column">
          <h3>Coordonnées</h3>
          <p>
            <LocationOnIcon />
            200 Av. de Provence, 13190 Allauch, France
          </p>
          <p>
            <PhoneIcon />
            +33 4 91 45 71 80
          </p>
          <p>
            <EmailIcon />
            info@wyplay.com
          </p>
          <div className="social-icons">
            <a href="/">
              <FacebookIcon />
            </a>
            <a href="/">
              <TwitterIcon />
            </a>
            <a href="/">
              <LinkedInIcon />
            </a>
          </div>
        </div>
      </div>
      <div className="footer">
        <p>&copy; {new Date().getFullYear()} Wyplay. Tous droits réservés.</p>
      </div>
    </StyledContact>
  );
};

const StyledContact = styled.div`
  background-color: #2c3e50;
  color: white;
  padding: 60px 0;
  font-family: "Roboto", sans-serif;
  min-height: 100vh;

  .contact-container {
    display: flex;
    justify-content: space-around;
    align-items: start;
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;

    .left-column,
    .right-column {
      flex: 1;
      padding: 20px;

      h2 {
        font-size: 32px;
        margin-bottom: 20px;
        color: #ecf0f1;
      }

      h3 {
        font-size: 28px;
        margin-bottom: 20px;
        color: #ecf0f1;
      }

      p {
        font-size: 18px;
        line-height: 1.6;
        color: #bdc3c7;

        svg {
          vertical-align: middle;
          margin-right: 10px;
        }
      }

      form {
        display: flex;
        flex-direction: column;

        input,
        textarea {
          margin-bottom: 15px;
          padding: 15px;
          border: none;
          border-radius: 5px;
          font-size: 16px;
          color: #2c3e50;
        }

        button {
          padding: 15px;
          background-color: #2980b9;
          color: white;
          border: none;
          border-radius: 5px;
          font-size: 18px;
          cursor: pointer;
          transition: background-color 0.3s ease;

          &:hover {
            background-color: #1abc9c;
          }
        }
      }
    }

    .right-column {
      display: flex;
      flex-direction: column;

      .social-icons {
        margin-top: 20px;

        a {
          color: white;
          margin-right: 15px;
          font-size: 24px;
          transition: color 0.3s ease;

          &:hover {
            color: #1abc9c;
          }

          svg {
            vertical-align: middle;
          }
        }
      }
    }
  }

  .footer {
    text-align: center;
    margin-top: 40px;
    padding: 20px 0;
    background-color: #34495e;

    p {
      font-size: 16px;
      color: #bdc3c7;
      margin: 0;
    }
  }
`;

export default ContactSection;
