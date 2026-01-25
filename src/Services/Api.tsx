// app/services/api.ts
import axios from 'axios';

const API_BASE_URL = 'http://localhost:8081/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Video API calls with file upload
export const videoAPI = {
  // Get all videos
  getAllVideos: () => api.get('/videos'),

  // Get videos by category
  getVideosByCategory: (category: string) =>
    api.get(`/videos/category/${category}`),

  // Get all categories
  getCategories: () => api.get('/videos/categories'),

  // Create video with file upload
  createVideo: (formData: FormData) =>
    api.post('/videos', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }),

  // Update video with file upload
  updateVideo: (id: number, formData: FormData) =>
    api.put(`/videos/${id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }),

  // Delete video
  deleteVideo: (id: number) => api.delete(`/videos/${id}`),

  // Increment views
  incrementViews: (id: number) => api.post(`/videos/${id}/view`),
};

// Child/Student API
export const childAPI = {
  // Get all children (with optional filters)
  getAllChildren: (filters?: any) => api.get('/children', { params: filters }),

  // Register new child
  registerChild: (data: any) => api.post('/children/register', data),

  // Update child
  updateChild: (id: number, data: any) => api.put(`/children/${id}`, data),

  // Get child by ID
  getChildById: (id: number) => api.get(`/children/${id}`),
};

// Progress API
export const progressAPI = {
  // Get progress by child ID
  getProgressByChild: (childId: number) => api.get(`/progress/${childId}`),

  // Update/Add progress
  updateProgress: (data: any) => api.post('/progress', data),
};

// Dashboard API
export const dashboardAPI = {
  getStats: () => api.get('/dashboard/stats'),
};

// Coach API
export const coachAPI = {
  getAllCoaches: () => api.get('/coaches'),
  getCoachById: (id: number) => api.get(`/coaches/${id}`),
  createCoach: (data: any) => api.post('/coaches', data),
  getDashboardStats: () => api.get('/coaches/dashboard/stats'),
  getMyAthletes: () => api.get('/coaches/my/athletes'),
};

export const managerAPI = {
  getDashboardStats: () => api.get('/manager/dashboard/stats'),
};

// Program API
export const programAPI = {
  getAllPrograms: () => api.get('/programs'),
  getActivePrograms: () => api.get('/programs/active'),
  getProgramById: (id: number) => api.get(`/programs/${id}`),
  createProgram: (data: any) => api.post('/programs', data),
  updateProgram: (id: number, data: any) => api.put(`/programs/${id}`, data),
  deleteProgram: (id: number) => api.delete(`/programs/${id}`),
};

// Message API
export const messageAPI = {
  getRecipients: () => api.get('/messages/recipients'),
  sendMessage: (data: any) => api.post('/messages', data),
  getRecentChats: () => api.get('/messages/chats'),
  getConversation: (otherUserId: number) => api.get(`/messages/conversation/${otherUserId}`),
  markAsRead: (id: number) => api.put(`/messages/${id}/read`),
  getUnreadCount: async () => {
    const response = await api.get('/messages/chats');
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const currentUserId = Number(user.id);

    // Only count messages where current user is the receiver AND message is unread
    return response.data.filter((chat: any) =>
      !chat.read && Number(chat.receiverId) === currentUserId
    ).length;
  }
};

// Event API
export const eventAPI = {
  getAllEvents: () => api.get('/events'),
  getEventsByType: (type: string) => api.get(`/events/type/${type}`),
  createEvent: (data: any) => api.post('/events', data),
  updateEvent: (id: number, data: any) => api.put(`/events/${id}`, data),
  deleteEvent: (id: number) => api.delete(`/events/${id}`),
};

export default api;