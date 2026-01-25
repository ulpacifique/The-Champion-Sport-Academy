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
  const getThumbnailUrl = (url: string | undefined) => {
    if (!url) return null;
    if (url.startsWith('http')) return url;
    if (url.startsWith('/')) return `http://localhost:8081${url}`;
    return `http://localhost:8081/uploads/thumbnails/${url}`;
  };

  if (loading) {
    return (
      <section className="py-16 px-4 md:px-8 lg:px-16 bg-gradient-to-b from-cerulean-blue-950 to-cerulean-blue-900">
        <div className="max-w-7xl mx-auto text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto"></div>
          <p className="text-white mt-4">Loading videos...</p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-16 px-4 md:px-8 lg:px-16 bg-gradient-to-b from-cerulean-blue-950 to-cerulean-blue-900">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-red-400 text-xl mb-4">{error}</p>
          <button
            onClick={fetchVideos}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Retry
          </button>
        </div>
      </section>
    );
  }

  if (videos.length === 0) {
    return (
      <section className="py-16 px-4 md:px-8 lg:px-16 bg-gradient-to-b from-cerulean-blue-950 to-cerulean-blue-900">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-gray-300 text-xl">No videos available</p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 px-4 md:px-8 lg:px-16 bg-gradient-to-b from-cerulean-blue-950 to-cerulean-blue-900">
      <div className="max-w-7xl mx-auto">
        {/* ... rest of your JSX ... */}

        {/* Videos Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {videos.map((video) => {
            const thumbnailUrl = getThumbnailUrl(video.thumbnailUrl);

            return (
              <div key={video.id} className="bg-cerulean-blue-800 rounded-xl overflow-hidden shadow-lg">
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
                  {/* ... rest of thumbnail code ... */}
                </div>
                {/* ... rest of video card ... */}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Events;