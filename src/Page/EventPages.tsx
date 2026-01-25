// app/pages/EventPage.tsx
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import { useState, useEffect } from "react";
import { videoAPI } from "../Services/Api";

interface Video {
  id: number;
  title: string;
  description: string;
  videoUrl: string;
  thumbnailUrl: string;
  duration: string;
  category: string;
  views: number;
  createdAt: string;
  isActive: boolean;
}

const EventPage = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [videos, setVideos] = useState<Video[]>([]);
  const [categories, setCategories] = useState<string[]>(["All"]);
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Fetch videos and categories from backend
  useEffect(() => {
    fetchVideos();
    fetchCategories();
  }, []);

  const fetchVideos = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await videoAPI.getAllVideos();
      setVideos(response.data);
    } catch (err) {
      console.error('Error fetching videos:', err);
      setError('Failed to load videos. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await videoAPI.getCategories();
      // Add "All" to the beginning of categories
      setCategories(["All", ...response.data]);
    } catch (err) {
      console.error('Error fetching categories:', err);
    }
  };

  // Filter videos based on category
  const filteredVideos = selectedCategory === "All" 
    ? videos 
    : videos.filter(video => video.category === selectedCategory);

  const openVideoModal = (video: Video) => {
    setSelectedVideo(video);
    setIsModalOpen(true);
    // Increment views when video is opened
    videoAPI.incrementViews(video.id).catch(console.error);
    // Prevent body scroll when modal is open
    document.body.style.overflow = 'hidden';
  };

  const closeVideoModal = () => {
    setIsModalOpen(false);
    setSelectedVideo(null);
    document.body.style.overflow = 'unset';
  };

  // Loading state
  if (loading) {
    return (
      <div className="min-h-[100vh] bg-cerulean-blue-950 font-['Poppins']">
        <Header/>
        <main className="py-16 px-4 md:px-8 lg:px-16">
          <div className="max-w-7xl mx-auto text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto"></div>
            <p className="text-white mt-4">Loading videos...</p>
          </div>
        </main>
        <Footer/>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-[100vh] bg-cerulean-blue-950 font-['Poppins']">
        <Header/>
        <main className="py-16 px-4 md:px-8 lg:px-16">
          <div className="max-w-7xl mx-auto text-center">
            <div className="text-red-400 mb-4">
              <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Error Loading Content</h3>
            <p className="text-gray-400 mb-6">{error}</p>
            <button
              onClick={fetchVideos}
              className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-300"
            >
              Try Again
            </button>
          </div>
        </main>
        <Footer/>
      </div>
    );
  }

  // Empty state - no videos in the database
  if (videos.length === 0) {
    return (
      <div className="min-h-[100vh] bg-cerulean-blue-950 font-['Poppins']">
        <Header/>
        
        <main className="py-16 px-4 md:px-8 lg:px-16">
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                Video Library
              </h1>
              <p className="text-lg text-gray-300 max-w-3xl mx-auto mb-6">
                Watch full coverage, highlights, and exclusive content from The Champions Sports Academy
              </p>
            </div>

            {/* No Videos Message */}
            <div className="text-center py-16">
              <div className="text-gray-400 mb-4">
                <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">No Videos Available</h3>
              <p className="text-gray-400 mb-6">
                No videos have been added yet. Check back soon for exciting content!
              </p>
              <p className="text-gray-500 text-sm mt-8">
                Admin: Add videos through the admin panel to display them here.
              </p>
            </div>
          </div>
        </main>
        
        <Footer/>
      </div>
    );
  }

  return (
    <div className="min-h-[100vh] bg-cerulean-blue-950 font-['Poppins']">
      <Header/>
      
      <main className="py-16 px-4 md:px-8 lg:px-16">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Video Library
            </h1>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto mb-6">
              Watch full coverage, highlights, and exclusive content from The Champions Sports Academy
            </p>
          </div>

          {/* Category Filter - Only show if we have multiple categories */}
          {categories.length > 1 && (
            <div className="flex flex-wrap justify-center gap-3 mb-12">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-5 py-2 rounded-full transition-colors duration-300 ${
                    selectedCategory === category
                      ? 'bg-blue-600 text-white'
                      : 'bg-cerulean-blue-800 text-gray-300 hover:bg-cerulean-blue-700'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          )}

          {/* Videos Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredVideos.map((video) => (
              <div 
                key={video.id}
                className="bg-cerulean-blue-900 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 cursor-pointer"
                onClick={() => openVideoModal(video)}
              >
                  {/* Video Thumbnail */}
                <div className="relative pt-[56.25%] bg-cerulean-blue-800">
                  {video.thumbnailUrl ? (
                    <img 
                      src={video.thumbnailUrl.startsWith('http') ? video.thumbnailUrl : `http://localhost:8081${video.thumbnailUrl}`} 
                      alt={video.title}
                      className="absolute top-0 left-0 w-full h-full object-cover"
                      onError={(e) => {
                        // If thumbnail fails to load, show fallback
                        const target = e.target as HTMLImageElement;
                        target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='225' viewBox='0 0 400 225'%3E%3Crect width='400' height='225' fill='%231e3a8a'/%3E%3Cpath d='M150 90L250 150L150 210Z' fill='%236366f1'/%3E%3C/svg%3E";
                      }}
                    />
                  ) : (
                    // Fallback if no thumbnail
                    <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-900 to-purple-900 flex items-center justify-center">
                      <svg className="w-16 h-16 text-white/50" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-20 h-20 bg-white/90 rounded-full flex items-center justify-center group hover:bg-white transition-all hover:scale-110">
                      <svg className="w-10 h-10 text-blue-600 ml-1" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                  </div>
                  <div className="absolute bottom-4 right-4 bg-black/70 text-white text-sm px-3 py-1 rounded">
                    {video.duration}
                  </div>
                  <div className="absolute top-4 left-4">
                    <span className="inline-block bg-blue-600 text-white px-3 py-1 rounded-full text-sm">
                      {video.category}
                    </span>
                  </div>
                </div>
                
                {/* Video Info */}
                <div className="p-6">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-xl font-bold text-white mb-2">
                      {video.title}
                    </h3>
                  </div>
                  
                  <p className="text-gray-300 mb-4 line-clamp-2">
                    {video.description}
                  </p>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400 text-sm">
                      {new Date(video.createdAt).toLocaleDateString()}
                    </span>
                    {video.views > 0 && (
                      <div className="flex items-center text-gray-400 text-sm">
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                        {video.views.toLocaleString()}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Empty Filter State */}
          {filteredVideos.length === 0 && (
            <div className="text-center py-16">
              <div className="text-gray-400 mb-4">
                <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">No Videos Found</h3>
              <p className="text-gray-400 mb-6">No videos available for "{selectedCategory}" category</p>
              <button
                onClick={() => setSelectedCategory("All")}
                className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-300"
              >
                Show All Videos
              </button>
            </div>
          )}
        </div>
      </main>

      {/* Video Modal */}
      {isModalOpen && selectedVideo && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
            onClick={closeVideoModal}
          >
            <div 
              className="bg-cerulean-blue-900 rounded-2xl w-full max-w-4xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Video Player */}
              <div className="relative pt-[56.25%] bg-black">
                <video
                  controls
                  autoPlay
                  className="absolute top-0 left-0 w-full h-full"
                  poster={selectedVideo.thumbnailUrl ? (selectedVideo.thumbnailUrl.startsWith('http') ? selectedVideo.thumbnailUrl : `http://localhost:8081${selectedVideo.thumbnailUrl}`) : undefined}
                >
                  <source src={selectedVideo.videoUrl.startsWith('http') ? selectedVideo.videoUrl : `http://localhost:8081${selectedVideo.videoUrl}`} />
                  Your browser does not support the video tag.
                </video>
                <button
                  onClick={closeVideoModal}
                  className="absolute top-4 right-4 bg-black/70 text-white p-2 rounded-full hover:bg-black/90 transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              {/* Video Details */}
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h2 className="text-2xl font-bold text-white mb-2">
                      {selectedVideo.title}
                    </h2>
                    <div className="flex items-center gap-4 mb-4">
                      <span className="inline-block bg-blue-600 text-white px-3 py-1 rounded-full">
                        {selectedVideo.category}
                      </span>
                      <span className="text-gray-400">
                        {new Date(selectedVideo.createdAt).toLocaleDateString()}
                      </span>
                      <span className="text-gray-400">{selectedVideo.duration}</span>
                      {selectedVideo.views > 0 && (
                        <span className="text-gray-400">
                          {selectedVideo.views.toLocaleString()} views
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                
                <p className="text-gray-300 mb-6">
                  {selectedVideo.description}
                </p>
                
                <div className="flex justify-end">
                  <button
                    onClick={closeVideoModal}
                    className="px-6 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
      
      <Footer/>
    </div>
  );
};

export default EventPage;