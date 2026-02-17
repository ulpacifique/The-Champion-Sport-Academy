// app/pages/AdminVideoPage.tsx
import { useState, useEffect } from 'react';
import { videoAPI, ASSET_BASE_URL } from '../Services/Api';

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

const AdminVideoPage = () => {
  const [videos, setVideos] = useState<Video[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingVideo, setEditingVideo] = useState<Video | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);

  // Form state
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    duration: '',
    category: '',
    videoUrl: '',
    thumbnailUrl: '', // Added for auto-fetched thumbnail
  });

  // File state
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
  const [thumbnailPreview, setThumbnailPreview] = useState<string | null>(null);
  const [isFetchingMeta, setIsFetchingMeta] = useState(false);

  // Load videos and categories
  useEffect(() => {
    fetchVideos();
    fetchCategories();
  }, []);


  const fetchVideos = async () => {
    try {
      const response = await videoAPI.getAllVideos();
      setVideos(response.data);
    } catch (error) {
      console.error('Error fetching videos:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await videoAPI.getCategories();
      setCategories(response.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const handleUrlBlur = async () => {
    if (!formData.videoUrl) return;
    // User said "all retrieved", implying auto-fill. 
    // We will aggressive fetch now as per user request.
    // if (formData.title) return;

    setIsFetchingMeta(true);
    try {
      // Using noembed for easy metadata fetching without API key
      const response = await fetch(`https://noembed.com/embed?url=${formData.videoUrl}`);
      const data = await response.json();

      if (data.title) {
        setFormData(prev => ({
          ...prev,
          title: data.title,
          thumbnailUrl: data.thumbnail_url || '',
          // content_id or author_name could be used for description if needed
        }));

        // Set preview
        if (data.thumbnail_url && !thumbnailFile) {
          setThumbnailPreview(data.thumbnail_url);
        }
      }
    } catch (error) {
      console.error("Failed to fetch YouTube metadata", error);
    } finally {
      setIsFetchingMeta(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };





  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.videoUrl && !editingVideo) {
      alert('Please enter a YouTube Video URL.');
      return;
    }

    try {
      const formDataToSend = new FormData();
      formDataToSend.append('title', formData.title);
      formDataToSend.append('description', formData.description);
      // Duration might need to be fetched from YouTube API or manually entered, 
      // for now we'll keep it if it's there or empty. 
      // If the backend requires it, we might need a duration input or extract it.
      formDataToSend.append('duration', formData.duration || '0:00');
      formDataToSend.append('category', formData.category);
      formDataToSend.append('videoUrl', formData.videoUrl);

      if (formData.thumbnailUrl) {
        formDataToSend.append('thumbnailUrl', formData.thumbnailUrl);
      }

      if (thumbnailFile) {
        formDataToSend.append('thumbnailFile', thumbnailFile);
      }

      setUploadProgress(10);

      if (editingVideo) {
        // Update existing video
        await videoAPI.updateVideo(editingVideo.id, formDataToSend);
        setUploadProgress(100);
        alert('Video updated successfully!');
      } else {
        // Create new video
        await videoAPI.createVideo(formDataToSend);
        setUploadProgress(100);
        alert('Video added successfully!');
      }

      // Reset form
      resetForm();
      fetchVideos();
      fetchCategories();

    } catch (error: any) {
      console.error('Error saving video:', error);
      alert(`Error saving video: ${error.response?.data?.message || error.message || 'Unknown error'}`);
      setUploadProgress(0);
    }
  };

  const handleEdit = (video: Video) => {
    setEditingVideo(video);
    setFormData({
      title: video.title,
      description: video.description || '',
      duration: video.duration,
      category: video.category,
      videoUrl: video.videoUrl || '',
      thumbnailUrl: video.thumbnailUrl || '',
    });

    // Set previews from existing files
    if (video.thumbnailUrl) {
      setThumbnailPreview(`${ASSET_BASE_URL}${video.thumbnailUrl}`);
    }

    setShowForm(true);
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this video?')) {
      try {
        await videoAPI.deleteVideo(id);
        fetchVideos();
        alert('Video deleted successfully!');
      } catch (error) {
        console.error('Error deleting video:', error);
        alert('Error deleting video. Please try again.');
      }
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      duration: '',
      category: '',
      videoUrl: '',
      thumbnailUrl: '',
    });
    setThumbnailFile(null);
    setThumbnailPreview('');
    setUploadProgress(0);
    setShowForm(false);
    setEditingVideo(null);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };


  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Video Management</h1>
            <p className="text-gray-600">Upload and manage video content</p>
          </div>
          <button
            onClick={() => setShowForm(!showForm)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg flex items-center"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            {showForm ? 'Cancel' : 'Upload New Video'}
          </button>
        </div>

        {/* Video Upload Form */}
        {showForm && (
          <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
            <h2 className="text-xl font-bold mb-4">
              {editingVideo ? 'Edit Video' : 'Upload New Video'}
            </h2>

            {/* Upload Progress Bar */}
            {uploadProgress > 0 && uploadProgress < 100 && (
              <div className="mb-6">
                <div className="flex justify-between text-sm text-gray-600 mb-1">
                  <span>Uploading...</span>
                  <span>{uploadProgress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${uploadProgress}%` }}
                  ></div>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">

              {/* YouTube URL - Primary Input */}
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                <label className="block text-sm font-medium text-blue-900 mb-1">
                  YouTube Video URL *
                </label>
                <input
                  type="url"
                  name="videoUrl"
                  value={formData.videoUrl}
                  onChange={handleInputChange}
                  onBlur={handleUrlBlur}
                  placeholder="Paste YouTube link here (e.g. https://www.youtube.com/watch?v=...)"
                  className="w-full px-4 py-2 border border-blue-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  autoFocus
                  required
                />
                <div className="flex justify-between mt-2">
                  <p className="text-sm text-blue-700">
                    <span className="font-semibold">Tip:</span> Paste the link and click anywhere else to automatically fill Title and Thumbnail.
                  </p>
                  {isFetchingMeta && <span className="text-sm font-semibold text-blue-600 animate-pulse">Fetching details...</span>}
                </div>
              </div>

              {/* Basic Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Title *
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Category *
                  </label>
                  <input
                    type="text"
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    list="categories"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                  <datalist id="categories">
                    {categories.map((category) => (
                      <option key={category} value={category} />
                    ))}
                  </datalist>
                </div>
              </div>



              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Describe your video..."
                />
              </div>

              {/* Thumbnail Upload Section (Kept as File Upload) */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Thumbnail Image
                  <span className="text-gray-500 text-sm ml-2">
                    (Optional, Max 5MB)
                  </span>
                </label>
                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg">
                  <div className="space-y-1 text-center">
                    <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                      <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <div className="flex text-sm text-gray-600">
                      <label className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none">
                        <span>{thumbnailFile ? 'Change thumbnail' : 'Upload thumbnail'}</span>
                        <input
                          type="file"
                          accept="image/*"
                          // onChange handler to be implemented/verified if it exists or needs creation
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                              setThumbnailFile(file);
                              setThumbnailPreview(URL.createObjectURL(file));
                            }
                          }}
                          className="sr-only"
                        />
                      </label>
                      <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="text-xs text-gray-500">
                      PNG, JPG, GIF up to 5MB
                    </p>
                  </div>
                </div>

                {thumbnailPreview && (
                  <div className="mt-4">
                    <img
                      src={thumbnailPreview}
                      alt="Thumbnail preview"
                      className="w-full max-w-xs rounded-lg shadow-md"
                    />
                    {thumbnailFile && (
                      <button
                        type="button"
                        onClick={() => {
                          setThumbnailFile(null);
                          setThumbnailPreview('');
                        }}
                        className="mt-2 text-sm text-red-600 hover:text-red-900"
                      >
                        Remove Thumbnail
                      </button>
                    )}
                  </div>
                )}
              </div>

              {/* Form Actions */}
              <div className="flex justify-end space-x-4 pt-4 border-t">
                <button
                  type="button"
                  onClick={resetForm}
                  className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={loading}
                >
                  {editingVideo ? 'Update Video' : 'Add Video'}
                </button>
              </div>
            </form>
          </div>
        )}


        {/* Videos List */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">Uploaded Videos ({videos.length})</h3>
          </div>

          {videos.length === 0 ? (
            <div className="text-center py-12">
              <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
              <h3 className="mt-2 text-sm font-medium text-gray-900">No videos uploaded</h3>
              <p className="mt-1 text-sm text-gray-500">Get started by uploading your first video.</p>
              {!showForm && (
                <div className="mt-6">
                  <button
                    onClick={() => setShowForm(true)}
                    className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                  >
                    <svg className="-ml-1 mr-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    Upload Video
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Video
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Category
                    </th>

                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Views
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Uploaded
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {videos.map((video) => (
                    <tr key={video.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <div className="h-16 w-28 flex-shrink-0 bg-gray-200 rounded overflow-hidden">

                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">
                              {video.title}
                            </div>
                            <div className="text-sm text-gray-500 truncate max-w-xs">
                              {video.description || 'No description'}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          {video.category}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900">
                        {video.duration}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900">
                        {video.views?.toLocaleString() || 0}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">
                        {formatDate(video.createdAt)}
                      </td>
                      <td className="px-6 py-4 text-sm font-medium space-x-2">
                        <button
                          onClick={() => handleEdit(video)}
                          className="text-blue-600 hover:text-blue-900"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(video.id)}
                          className="text-red-600 hover:text-red-900"
                        >
                          Delete
                        </button>
                        <a
                          href={video.videoUrl.startsWith('http') ? video.videoUrl : `${ASSET_BASE_URL}${video.videoUrl}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-green-600 hover:text-green-900"
                        >
                          View
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminVideoPage;