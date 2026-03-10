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
    description: "Cultivating self-control and commitment through structured training",
    color: "from-blue-500/10 to-blue-600/10",
    borderColor: "border-blue-500/20",
    iconColor: "text-blue-600 dark:text-blue-400",
  },
  {
    name: "Friendship",
    description: "Building lasting relationships and sportsmanship",
    color: "from-bright-sun-300/10 to-bright-sun-300/20",
    borderColor: "border-bright-sun-300/30",
    iconColor: "text-bright-sun-600 dark:text-bright-sun-300",
  },
  {
    name: "Teamwork",
    description: "Collaborating for shared success and growth",
    color: "from-green-500/10 to-green-600/10",
    borderColor: "border-green-500/20",
    iconColor: "text-green-600 dark:text-green-400",
  },
  {
    name: "Respect",
    description: "Valuing others, coaches, and the sport",
    color: "from-purple-500/10 to-purple-600/10",
    borderColor: "border-purple-500/20",
    iconColor: "text-purple-600 dark:text-purple-400",
  },
  {
    name: "Excellence",
    description: "Striving for highest standards in everything",
    color: "from-red-500/10 to-red-600/10",
    borderColor: "border-red-500/20",
    iconColor: "text-red-600 dark:text-red-400",
  },
];
