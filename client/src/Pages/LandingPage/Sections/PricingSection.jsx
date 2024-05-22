//;
import styled from "styled-components";
import { InnerLayout } from "../styles/Layout";
import Card from "../components/Card";
import middlewareImage from "../assets/img/middleware.webp";
import uiImage from "../assets/img/user-interface-copy.webp";
import vodImage from "../assets/img/vod-platform.jpg";

// Mocked gallery data, this would ideally come from props or an API
const galleryData = [
  {
    title: "Middleware TV Development",
    description:
      "Development of middleware solutions for TV operators, powering set-top boxes for accessing live TV, on-demand content, etc.",
    image: middlewareImage,
  },
  {
    title: "User Interface Design",
    description:
      "Design and development of user interfaces for set-top boxes and associated applications, ensuring user-friendly experiences.",
    image: uiImage,
  },
  {
    title: "Video-on-Demand Solutions",
    description:
      "Providing solutions for distributing video-on-demand content, allowing users to watch movies, TV shows, and other content at their convenience.",
    image: vodImage,
  },
];

const PaymentSection = () => {
  return (
    <ProjectStyled id="projects">
      <InnerLayout>
        <h2>Projects</h2>
        <div className="card-con">
          {galleryData.map((item, index) => (
            <Card
              key={index}
              account={item.title}
              text={item.description}
              button={"View More"}
              card={item.image}
            />
          ))}
        </div>
      </InnerLayout>
    </ProjectStyled>
  );
};

const ProjectStyled = styled.section`
  .card-con {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 3rem;
    padding-top: 3.4rem;

    @media screen and (max-width: 689px) {
      grid-template-columns: repeat(1, 1fr);
    }
  }

  h2 {
    color: purple; /* Set the color to purple */
    text-align: center; /* Center the text */
    margin-bottom: 2rem; /* Add some bottom margin for spacing */
  }
`;
export default PaymentSection;
