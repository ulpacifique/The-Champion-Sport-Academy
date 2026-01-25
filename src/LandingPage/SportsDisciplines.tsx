import { Carousel } from "@mantine/carousel";
import { IconArrowLeft, IconArrowRight, IconTrophy } from "@tabler/icons-react";
import { useState, useEffect } from "react";
import { programAPI } from "../Services/Api";

const SportsDisciplines = () => {
    const [programs, setPrograms] = useState<any[]>([]);

    useEffect(() => {
        const fetchPrograms = async () => {
            try {
                // Fetch ALL programs, or create a specific endpoint for active/landing ones
                const response = await programAPI.getAllPrograms();
                // Filter for ACTIVE only for the public page
                const activePrograms = response.data.filter((p: any) => p.status === 'ACTIVE');
                setPrograms(activePrograms);
            } catch (error) {
                console.error("Failed to fetch sports programs", error);
            }
        };
        fetchPrograms();
    }, []);

    return (
        <div className="mt-20 pb-5">
            <div className="text-4xl text-center mb-3 font-semibold text-white">
                Our <span className="text-bright-sun-400">Sports</span> Disciplines
            </div>
            <div className="text-lg mb-10 mx-auto text-gray-400 text-center w-1/2">
                Explore our comprehensive training programs designed to develop champions in every sport
            </div>

            <Carousel
                slideSize="22%"
                slideGap="md"
                loop
                align="start"
                className="focus-visible:[&_button]:!outline-none [&_button]:!bg-bright-sun-400 [&_button]:!border-none [&_button]:hover:!opacity-75 [&_button]:opacity-0 hover:[&_button]:opacity-100"
                nextControlIcon={<IconArrowRight className="h-8 w-8" />}
                previousControlIcon={<IconArrowLeft className="h-8 w-8" />}
            >
                {programs.length > 0 ? (
                    programs.map((program, index) => (
                        <Carousel.Slide key={program.id || index}>
                            <div className="flex flex-col items-center w-64 gap-2 border border-bright-sun-400 p-5 rounded-xl hover:cursor-pointer hover:shadow-[0_0_5px_2px_black] my-5 transition duration-300 ease-in-out !shadow-bright-sun-300">
                                <div className="p-2 bg-bright-sun-400 rounded-full">
                                    <div className="h-8 w-8 flex items-center justify-center text-2xl">
                                        <IconTrophy size={24} className="text-white" />
                                    </div>
                                </div>
                                <div className="text-white text-xl font-semibold text-center">{program.name}</div>
                                <div className="text-sm text-center text-gray-400 h-10 overflow-hidden">{program.description || `Join our ${program.sportName} team!`}</div>
                                <div className="text-bright-sun-400 text-lg">
                                    {program.currentParticipants}+ athletes trained
                                </div>
                            </div>
                        </Carousel.Slide>
                    ))
                ) : (
                    <div className="text-center text-gray-500 w-full">Loading programs...</div>
                )}
            </Carousel>
        </div>
    );
};

export default SportsDisciplines;