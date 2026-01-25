import Marquee from "react-fast-marquee";
import { trustedBy } from "../Data/TrustedbyData";

const TrustedBy = () => {
    return (
        <div className="mt-20 pb-5">
            <div className="text-4xl text-center mb-10 font-semibold text-white">
                Trusted by <span className="text-bright-sun-400">Leading</span> Organizations
            </div>
            <Marquee pauseOnHover={true}>
                {trustedBy.map((org, index) => (
                    <div 
                        key={index} 
                        className="mx-8 px-2 py-1 hover:bg-gray-800 rounded-xl cursor-pointer transition-colors duration-300"
                    >
                        <img 
                            className="h-14" 
                            src={`/${org}.png`} 
                            alt={org}
                        />
                    </div>
                ))}
            </Marquee>
        </div>
    );
};

export default TrustedBy;