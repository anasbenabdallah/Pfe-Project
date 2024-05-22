import { useEffect } from "react";
import CardSection from "./Sections/CardSection";
import AboutSection from "./Sections/AboutSection";
import Footer from "./Sections/Footer";
import Header from "./Sections/Header";
import SupportSection from "./Sections/SupportSection";
import FAQSection from "./Sections/FAQSection";
import PaymentSection from "./Sections/PricingSection";
import { OuterLayout } from "./styles/Layout";
import aos from "aos";
import "aos/dist/aos.css";
import ScrolledButton from "./components/ScrolledButton";
import GlobalStyle from "./GlobalStyle";

function App() {
  useEffect(() => {
    aos.init({ duration: 3000 });
  }, []);

  return (
    <div>
      <GlobalStyle />

      <div className="App">
        <Header />
        <OuterLayout>
          <main>
            <CardSection />
            <AboutSection />
            <SupportSection />
            <PaymentSection />
            <FAQSection />
          </main>
        </OuterLayout>
        <Footer />
        <ScrolledButton />
      </div>
    </div>
  );
}

export default App;
