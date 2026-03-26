// Events / "What We Do" — core services content (SportsDisciplines), no video library
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import SportsDisciplines from "../LandingPage/SportsDisciplines";

const EventPage = () => (
    <div className="min-h-[100vh] bg-white dark:bg-cerulean-blue-900 font-['Poppins'] transition-colors duration-300">
        <Header />
        <SportsDisciplines />
        <Footer />
    </div>
);

export default EventPage;
