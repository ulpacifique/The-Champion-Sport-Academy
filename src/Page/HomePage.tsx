import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import HeroSection from "../LandingPage/HeroSection";
import Partners from "../LandingPage/Partners";
import SportsDisciplines from "../LandingPage/SportsDisciplines";

import AboutUs from "../LandingPage/AboutUs";
import OurServices from "../LandingPage/OurServices";

const HomePage = () => {
    return (
        <div className="min-h-[100vh] bg-cerulean-blue-950 font-['Poppins']">
            <Header />

            {/* Add IDs to each section for smooth scrolling */}
            <section id="home" className="scroll-mt-24">
                <HeroSection />
            </section>

            <section id="partners" className="scroll-mt-24">
                <Partners />
            </section>

            <section id="sports-disciplines" className="scroll-mt-24">
                <SportsDisciplines />
            </section>
            <section id="aboutUs" className="scroll-mt-24">
                <AboutUs />
            </section>
            <section id="our-services" className="scroll-mt-24">
                <OurServices />
            </section>

            <section id="footer" className="scroll-mt-24">
                <Footer />
            </section>
        </div>
    );
}
export default HomePage;