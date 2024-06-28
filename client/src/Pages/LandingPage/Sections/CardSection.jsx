import styled from "styled-components";
import { InnerLayout } from "../styles/Layout";
import {
  faComments,
  faBullhorn,
  faUsers,
  faMagic,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const featuresData = [
  {
    icon: faComments,
    title: "Messagerie",
    text: "C'est un espace où les utilisateurs peuvent discuter ou inviter d'autres personnes à des discussions privées (chat) pour partager leurs intérêts, du contenu multimédia, obtenir de l'aide pour résoudre un problème rencontré, ou discuter des nouvelles fonctionnalités ajoutées qu'ils souhaitent voir dans les prochaines mises à jour du service WyPlay.",
  },
  {
    icon: faBullhorn,
    title: "Feedback",
    text: "Mettre en place un système de collecte et d'analyse des retours d'information des utilisateurs afin d'améliorer continuellement l'expérience utilisateur. Les commentaires des utilisateurs seront examinés régulièrement pour identifier les points forts et les domaines à améliorer de l'application.",
  },
  {
    icon: faUsers,
    title: "publication",
    text: "Concevoir une interface de gestion des publications intuitive pour permettre aux administrateurs de gérer efficacement les utilisateurs, le contenu et les paramètres de l'application. Les fonctionnalités de gestion incluent la modération des utilisateurs et des contenus, la visualisation des statistiques et la configuration des préférences de l'application.",
  },
  {
    icon: faMagic,
    title: "Système de Recommandation Personnalisée",
    text: "Intégrer un système intelligent de recommandation pour proposer aux utilisateurs du contenu pertinent et adapté à leurs préférences et à leur historique de navigation. Les recommandations personnalisées contribueront à améliorer l'engagement et la rétention des utilisateurs sur la plateforme.",
  },
];

const CardSection = () => {
  return (
    <CardSectionStyled id="features">
      <InnerLayout>
        <h1 className="section-title">Fonctionnalités</h1>
        <div className="card-container">
          {featuresData.map((feature, index) => (
            <div key={index} className="card">
              <StyledFontAwesomeIcon icon={feature.icon} />
              <h2
                data-aos="fade-right"
                data-aos-duration="3000"
                className="secondary-heading"
              >
                {feature.title}
              </h2>
              <p>{feature.text}</p>
            </div>
          ))}
        </div>
      </InnerLayout>
    </CardSectionStyled>
  );
};

const StyledFontAwesomeIcon = styled(FontAwesomeIcon)`
  font-size: 3rem; // Adjust the icon size as needed
  margin-bottom: 1rem;
  color: purple; // Change icon color to match your design
`;

const CardSectionStyled = styled.section`
  .section-title {
    text-align: center;
    font-size: 2.5rem; // Adjust as needed
    margin-bottom: 2rem; // Provides space between the title and the cards
    color: purple; // Change color to purple
  }

  .card-container {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 2rem;

    @media screen and (max-width: 845px) {
      grid-template-columns: repeat(1, 1fr);
    }

    .card {
      background-color: white; // Add styling as needed
      padding: 20px;
      box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
      text-align: center;
      transition: transform 0.3s ease-in-out;

      &:hover {
        transform: translateY(-10px);
      }

      h2 {
        margin-bottom: 1rem;
      }

      p {
        font-size: 1rem;
      }
    }
  }
`;

export default CardSection;
