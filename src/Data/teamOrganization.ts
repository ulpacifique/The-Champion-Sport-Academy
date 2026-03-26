/** Board letters / placeholders, management roles, and coach roster — used only in About Us (Strategic Partners → team sections). */

export const BOARD_MEMBERS = ["A", "B", "C", "D", "E", "F", "G", "H"];

export const MANAGEMENT_TEAM = [
    { role: "Head Coach", name: "Head Coach" },
    { role: "Manager", name: "Manager" },
    { role: "Secretary", name: "Secretary" },
];

export const COACHES = [
    { name: "Coach Kharif", role: "Head Karate Coach", experience: "Expert Trainer", specialty: "Youth Development & Karate", image: `${import.meta.env.BASE_URL}athletes/Khalif.PNG` },
    { name: "Coach Dushime Sharifu", role: "National Team Athlete", experience: "10+ Years", specialty: "Acrobatics & Fitness", image: `${import.meta.env.BASE_URL}athletes/Dushime.jpg` },
    { name: "Coach ABAYISENGA Paremonique", role: "Certified National Coach", experience: "12+ Years", specialty: "Artistic & Rhythmic", image: `${import.meta.env.BASE_URL}athletes/palmonique.jpg` },
    { name: "Coach Pacifique", role: "Instructor", experience: "3+ Years", specialty: "Taekwondo & Gymnastics", image: `${import.meta.env.BASE_URL}athletes/Coach Pacifique.jpg` },
    { name: "Coach Sylvan", role: "Gymnastics Coach", experience: "1 Year", specialty: "Floor & Vault Training", image: `${import.meta.env.BASE_URL}athletes/Coach Sylvan.jpg` },
    { name: "Coach Tracy", role: "Assistant Coach", experience: "3 Years", specialty: "Core Technique & Flexibility", image: `${import.meta.env.BASE_URL}athletes/Coach Tracy.jpg` },
    { name: "Fille", role: "Academy Receptionist", experience: "Admin Expert", specialty: "Student Relations", image: `${import.meta.env.BASE_URL}athletes/Receptionist Fille.jpg` },
    { name: "Mama Bonfils", role: "Safeguarding Officer", experience: "Welfare Guard", specialty: "Safety Oversight", image: `${import.meta.env.BASE_URL}athletes/Safeguarding Officer.jpg` },
];
