// app/utils/videoData.ts
export interface VideoItem {
  id: string;
  title: string;
  description: string;
  videoUrl: string;
  thumbnail: string;
  duration: string;
  category: string;
  date: string;
  views?: number;
}

export const ourVideos: VideoItem[] = [
  {
    id: "1",
    title: "Championship Finals 2024",
    description: "Full coverage of our annual championship finals with commentary and player interviews.",
    videoUrl: "/videos/championship-finals-2024.mp4",
    thumbnail: "/thumbnails/championship-finals.jpg",
    duration: "2:45:30",
    category: "Basketball",
    date: "Dec 15, 2024",
    views: 1245
  },
  {
    id: "2",
    title: "Summer Tournament Highlights",
    description: "Best plays from our summer tournament series across all age divisions.",
    videoUrl: "/videos/summer-tournament.mp4",
    thumbnail: "/thumbnails/summer-tournament.jpg",
    duration: "1:22:15",
    category: "Football",
    date: "Nov 30, 2024",
    views: 987
  },
  {
    id: "3",
    title: "Elite Training Sessions",
    description: "Behind the scenes look at our elite athlete training program and drills.",
    videoUrl: "/videos/elite-training.mp4",
    thumbnail: "/thumbnails/elite-training.jpg",
    duration: "45:20",
    category: "Training",
    date: "Dec 10, 2024",
    views: 1567
  },
  {
    id: "4",
    title: "Swimming Championship",
    description: "Complete coverage of the national swimming championship with record-breaking moments.",
    videoUrl: "/videos/swimming-championship.mp4",
    thumbnail: "/thumbnails/swimming-championship.jpg",
    duration: "1:35:40",
    category: "Swimming",
    date: "Nov 25, 2024",
    views: 876
  },
  {
    id: "5",
    title: "Tennis Open Finals",
    description: "Highlights from the thrilling finals match between top seeded players.",
    videoUrl: "/videos/tennis-finals.mp4",
    thumbnail: "/thumbnails/tennis-finals.jpg",
    duration: "1:15:10",
    category: "Tennis",
    date: "Dec 5, 2024",
    views: 1102
  },
  {
    id: "6",
    title: "Athlete Interviews",
    description: "Exclusive interviews with our star athletes about their journey and training.",
    videoUrl: "/videos/athlete-interviews.mp4",
    thumbnail: "/thumbnails/athlete-interviews.jpg",
    duration: "30:45",
    category: "Interviews",
    date: "Nov 20, 2024",
    views: 1345
  }
];

// For homepage preview (first 3 videos)
export const getFeaturedVideos = (): VideoItem[] => {
  return ourVideos.slice(0, 3);
};

// Get all videos
export const getAllVideos = (): VideoItem[] => {
  return ourVideos;
};

// Get videos by category
export const getVideosByCategory = (category: string): VideoItem[] => {
  if (category === "All") return ourVideos;
  return ourVideos.filter(video => video.category === category);
};

// Get unique categories
export const getVideoCategories = (): string[] => {
  const categories = ourVideos.map(video => video.category);
  return ["All", ...Array.from(new Set(categories))];
};