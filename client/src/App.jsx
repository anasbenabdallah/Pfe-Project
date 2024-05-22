import { useLocation } from "react-router-dom";

import Routes from "./routes/index";
import ThemeCustomization from "./themes";
import ScrollTop from "./Components/ScrollTop";
import Chatbot from "./Pages/Chatbot.jsx";

// ==============================|| APP - THEME, ROUTER, ScrollTop ||============================== //

const App = () => {
  const location = useLocation(); // Hook to access the location object

  // Define the paths where Chatbot should not be rendered
  const excludedPaths = ["/register", "/login", "/"];

  // Function to check if the current path is not one of the excluded paths
  const shouldRenderChatbot = () => !excludedPaths.includes(location.pathname);

  return (
    <ThemeCustomization>
      <ScrollTop>
        <Routes />{" "}
        {/* Make sure your Routes are defined in the routes/index file */}
        {shouldRenderChatbot() && <Chatbot />}{" "}
        {/* i exluded the chatbot because if user not registres or logged there is no need to sue chatbot*/}
      </ScrollTop>
    </ThemeCustomization>
  );
};

export default App;
