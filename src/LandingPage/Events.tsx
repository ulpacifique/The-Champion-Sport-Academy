import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Video } from '../Types/Video';
import { videoAPI } from '../Services/Api';

const Events = () => {
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchVideos();
  }, []);

  const fetchVideos = async () => {
    try {
      setLoading(true);
      setError(null);
      console.log('Fetching videos...');

      const response = await videoAPI.getAllVideos();
      console.log('API Response:', response);

      const videosData = response.data.slice(0, 3);
      console.log('Processed videos:', videosData);

      setVideos(videosData);
    } catch (error) {
      console.error('Error fetching videos:', error);
      setError('Failed to load videos');
      setVideos([]);
    } finally {
      setLoading(false);
    }
  };

  // Helper function to get full thumbnail URL
  const getThumbnailUrl = (video: Video) => {
    if (video.thumbnailUrl) {
      if (video.thumbnailUrl.startsWith('http')) return video.thumbnailUrl;
      if (video.thumbnailUrl.startsWith('/')) return `http://localhost:8081${video.thumbnailUrl}`;
      return `http://localhost:8081/uploads/thumbnails/${video.thumbnailUrl}`;
    }

    // Fallback to YouTube thumbnail if no custom thumbnail
    if (video.videoUrl && (video.videoUrl.includes('youtube.com') || video.videoUrl.includes('youtu.be'))) {
      const videoId = video.videoUrl.includes('v=')
        ? video.videoUrl.split('v=')[1].split('&')[0]
        : video.videoUrl.split('/').pop();
      // Return null if we can't extract an ID, forcing fallbacks elsewhere
      return videoId ? `https://img.youtube.com/vi/${videoId}/hqdefault.jpg` : null;
    }

    return null;
  };

  if (loading) {
    return (
      <section className="py-16 px-4 md:px-8 lg:px-16 bg-white dark:bg-gradient-to-b dark:from-cerulean-blue-950 dark:to-cerulean-blue-900 transition-colors duration-300">
        <div className="max-w-7xl mx-auto text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cerulean-blue-600 dark:border-white mx-auto"></div>
          <p className="text-cerulean-blue-900 dark:text-white mt-4 font-medium">Loading videos...</p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-16 px-4 md:px-8 lg:px-16 bg-white dark:bg-gradient-to-b dark:from-cerulean-blue-950 dark:to-cerulean-blue-900 transition-colors duration-300">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-red-600 dark:text-red-400 text-xl mb-4 font-bold">{error}</p>
          <button
            onClick={fetchVideos}
            className="px-8 py-3 bg-cerulean-blue-600 dark:bg-blue-600 text-white rounded-xl hover:bg-cerulean-blue-700 dark:hover:bg-blue-700 font-bold uppercase tracking-wider transition-all shadow-lg"
          >
            Retry Connection
          </button>
        </div>
      </section>
    );
  }

  if (videos.length === 0) {
    return (
      <section className="py-16 px-4 md:px-8 lg:px-16 bg-white dark:bg-gradient-to-b dark:from-cerulean-blue-950 dark:to-cerulean-blue-900 transition-colors duration-300">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-gray-500 dark:text-gray-300 text-xl font-medium italic">No videos available at the moment.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 px-4 md:px-8 lg:px-16 bg-white dark:bg-gradient-to-b dark:from-cerulean-blue-950 dark:to-cerulean-blue-900 transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        {/* Videos Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {videos.map((video) => {
            const thumbnailUrl = getThumbnailUrl(video);

            return (
              <div key={video.id} className="bg-gray-50 dark:bg-cerulean-blue-800 rounded-2xl overflow-hidden shadow-xl dark:shadow-none border border-gray-100 dark:border-white/5 group hover:scale-[1.02] transition-all duration-500">
                {/* Video Thumbnail */}
                <div className="relative pt-[56.25%] bg-cerulean-blue-900">
                  {thumbnailUrl ? (
                    <img
                      src={thumbnailUrl}
                      alt={video.title}
                      className="absolute top-0 left-0 w-full h-full object-cover"
                      onError={(e) => {
                        console.error('Failed to load thumbnail:', thumbnailUrl);
                        e.currentTarget.style.display = 'none';
                      }}
                    />
                  ) : (
                    <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-900 to-purple-900 flex items-center justify-center">
                      <svg className="w-16 h-16 text-white/50" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                  )}
                </div>
                {/* Video Info */}
                <div className="p-6">
                   <h3 className="text-cerulean-blue-900 dark:text-white font-black mb-2 text-xl italic tracking-tighter uppercase line-clamp-2">{video.title}</h3>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Events;