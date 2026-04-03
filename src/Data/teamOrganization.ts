/** Managers and coach roster — used only in About Us (Strategic Partners → team sections). */

export type BoardProfileItem = { role: string; description: string };

export type BoardProfileGroup = {
    title: string;
    emoji: string;
    items: BoardProfileItem[];
};

/** Board of Directors — profile cards + advisory copy (About Us). */
export const BOARD_PROFILE_GROUPS: BoardProfileGroup[] = [
    {
        title: "Board of Directors",
        emoji: "🔵",
        items: [
            {
                role: "Chairperson of the Board",
                description:
                    "Provides overall leadership of the Board, ensuring strategic direction, effective governance, and alignment with the Academy’s vision and mission.",
            },
            {
                role: "Vice Chairperson of the Board",
                description:
                    "Supports the Chairperson and ensures continuity of leadership, contributing to coordination and effectiveness of Board functions.",
            },
            {
                role: "Board Secretary",
                description:
                    "Oversees governance processes, ensures compliance, and manages Board documentation, meetings, and institutional records.",
            },
        ],
    },
    {
        title: "Executive Leadership",
        emoji: "🟡",
        items: [
            {
                role: "CEO / Executive Director",
                description:
                    "Leads the Academy’s operations and implements the strategic direction set by the Board, ensuring alignment between programmes, business growth, and social impact.",
            },
        ],
    },
    {
        title: "Strategic Directors",
        emoji: "🟡",
        items: [
            {
                role: "Director of Legal & Governance",
                description:
                    "Ensures compliance with legal frameworks and governance standards, manages risk, and supports ethical and transparent operations.",
            },
            {
                role: "Director of Marketing & Partnerships",
                description:
                    "Leads branding, communication, and strategic partnerships, driving visibility, sponsorship, and organizational growth.",
            },
        ],
    },
    {
        title: "Programmes & Projects",
        emoji: "🟡",
        items: [
            {
                role: "Director of Programmes & Projects",
                description:
                    "Oversees the design and implementation of sport programmes and projects, ensuring alignment with physical literacy, long-term athlete development, and the Academy’s core values.",
            },
        ],
    },
];

export const BOARD_ADVISORY_EXPERTISE = [
    "Finance & Investment",
    "Sport Development & Coaching",
    "Social Impact & Safeguarding",
    "Infrastructure & Innovation",
    "Education & Research",
    "International Relations",
];

export const MANAGERS = [
    { role: "Programme and Projects Manager" },
    { role: "Administration and Finance Manager" },
];

export const COACHES = [
    { name: " Harif",sname: "NIYITANGA", role: " Karate Head  Coach", experience: "Expert Trainer", specialty: "Youth Development & Karate", image: `${import.meta.env.BASE_URL}athletes/Khalif.PNG` },
    { name: "Coach   Sharifu",sname: " DUSHIME", role: "Gymnastics Head Coach", experience: "10+ Years", specialty: "Acrobatics & Fitness", image: `${import.meta.env.BASE_URL}athletes/Dushime.jpg` },
    { name: "Coach  Paremonique",sname: " ABAYISENGA", role: "Gymnastics Coach", experience: "12+ Years", specialty: "Artistic & Rhythmic", image: `${import.meta.env.BASE_URL}athletes/palmonique.jpg` },
    { name: "Coach Pacifique,",sname: " UWIHIRWE ", role: "Gymnastics Coach", experience: "3+ Years", specialty: "Taekwondo & Gymnastics", image: `${import.meta.env.BASE_URL}athletes/Coach Pacifique.jpg` },
    { name: "Coach Sylvan,",sname: " TUYIZERE", role: "Gymnastics Coach", experience: "1 Year", specialty: "Floor & Vault Training", image: `${import.meta.env.BASE_URL}athletes/Coach Sylvan.jpg` },
    { name: "Coach THerese,",sname: " IRAFASHA", role: "Assistant Coach", experience: "3 Years", specialty: "Core Technique & Flexibility", image: `${import.meta.env.BASE_URL}athletes/Coach Tracy.jpg` },
    { name: "Alphonsine ,",sname: " NIYONSHUTI", role: "Academy Receptionist", experience: "Admin Expert", specialty: "Student Relations", image: `${import.meta.env.BASE_URL}athletes/Receptionist Fille.jpg` },
    
];
