/**
 * Our Core Values – single source of truth.
 * Title: "OUR CORE VALUES"
 * Subtitle: "THE PRINCIPLES THAT GUIDE OUR GROWTH."
 */
export const CORE_VALUES_TITLE = "Our Core Values";
export const CORE_VALUES_SUBTITLE = "The principles that guide our growth.";

export interface CoreValueItem {
  name: string;
  description: string;
  color: string;
  borderColor: string;
  iconColor: string;
}

export const coreValuesData: CoreValueItem[] = [
  {
    name: "Discipline",
    description: "At The Champions Sports Academy, discipline means being committed to training, respecting rules, and giving consistent effort during every practice. Through structured sport programmes such as gymnastics and karate, children develop positive habits including punctuality, perseverance, responsibility, and self-control.\n\nIn a supportive environment, discipline helps children build strong character, improve their skills, and grow into responsible and confident individuals in sport and in life.",
    color: "from-blue-500/10 to-blue-600/10",
    borderColor: "border-blue-500/20",
    iconColor: "text-blue-600 dark:text-blue-400",
  },
  {
    name: "Friendship",
    description: "Friendship at The Champions Sports Academy reflects the power of sport to bring children together in a positive and supportive environment. Through training and participation in sport programmes, children learn to cooperate, support one another, and build strong relationships regardless of their background. Sport becomes a platform for unity, teamwork, and social connection.",
    color: "from-bright-sun-300/10 to-bright-sun-300/20",
    borderColor: "border-bright-sun-300/30",
    iconColor: "text-bright-sun-600 dark:text-bright-sun-300",
  },
  {
    name: "Teamwork",
    description: "At The Champions Sports Academy, teamwork means working together, supporting one another, and growing as a group through sport. Children learn to encourage their teammates, celebrate each other's progress, and cooperate during training and competitions.\n\nThrough teamwork, they develop important life skills such as communication, cooperation, empathy, and respect, while also building confidence, a sense of belonging, and responsibility toward the team.",
    color: "from-green-500/10 to-green-600/10",
    borderColor: "border-green-500/20",
    iconColor: "text-green-600 dark:text-green-400",
  },
  {
    name: "Respect",
    description: "Respect is a fundamental value that shapes the culture of The Champions Sports Academy. Children are taught to respect themselves, their teammates, coaches, rules, and the spirit of sport. Through this value, they learn fair play, discipline, integrity, and appreciation for diversity, helping them become responsible individuals both in sport and in everyday life.",
    color: "from-purple-500/10 to-purple-600/10",
    borderColor: "border-purple-500/20",
    iconColor: "text-purple-600 dark:text-purple-400",
  },
  {
    name: "Excellence",
    description: "At The Champions Sports Academy, excellence means encouraging every child to give their best effort and continuously improve in sport and in life. Children are guided to develop their abilities step by step through training, dedication, and perseverance. Excellence is not only about winning medals, but about personal growth, confidence, and striving to reach one's full potential.",
    color: "from-red-500/10 to-red-600/10",
    borderColor: "border-red-500/20",
    iconColor: "text-red-600 dark:text-red-400",
  },
];
