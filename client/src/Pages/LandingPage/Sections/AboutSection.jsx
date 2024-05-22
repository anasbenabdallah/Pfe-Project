//;
import styled from "styled-components";
import { InnerLayout } from "../styles/Layout";
import about from "../assets/img/about.jpg";

// Example data, you might load this via props or context in a real application
const aboutData = {
  paragraph:
    "Wyplay est spécialisée dans le développement de solutions logicielles pour la télévision numérique.",
  Why: [
    "Expertise en solutions logicielles.",
    "Middleware TV modulaire.",
    "Partenariats avec opérateurs.",
    "Solutions sur mesure.",
  ],
  Why2: [
    "Amélioration continue vidéo.",
    "Support pour Android TV.",
    "Services de diffusion OTT.",
    "Streaming de contenus multimédia.",
  ],
};

const AboutSection = () => {
  return (
    // ici en met le meme id indiquer dans le navbar pour quand en clique sur navbar scrolll down take place
    <AboutStyled id="about">
      <InnerLayout>
        <div className="chart-con">
          <div className="chart-left">
            <img
              src={about}
              alt=""
              style={{
                width: "100%",
                borderRadius: "20px",
                boxShadow: "0px 25px 50px rgba(22, 25, 79, 0.05)",
              }}
            />
          </div>
          <div className="chart-right">
            <h2>About Us</h2>
            <p>{aboutData.paragraph}</p>
            <h3>Why Choose Us?</h3>
            <div className="list-style">
              <div className="list">
                <ul>
                  {aboutData.Why.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>
              <div className="list">
                <ul>
                  {aboutData.Why2.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </InnerLayout>
    </AboutStyled>
  );
};

const AboutStyled = styled.section`
  .chart-con {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 2rem;
    align-items: center;

    @media screen and (max-width: 1347px) {
      grid-template-columns: repeat(1, 1fr);
    }

    .chart-left,
    .chart-right {
      padding: 2rem;
      color: purple;
    }

    .list-style {
      display: flex;
      justify-content: space-between;
      color: black;

      .list {
        width: 50%;
      }
    }
  }
`;

export default AboutSection;
