import api from './Api';

const parentAPI = {
    // Children Management
    getChildren: () => api.get('/children/my-children'),
    registerChild: (childData: any) => api.post('/children/register', childData),
    updateChild: (childId: number, childData: any) => api.put(`/children/${childId}`, childData),
    deleteChild: (childId: number) => api.delete(`/children/${childId}`),

    // Progress Tracking
    getChildProgress: (childId: number) => api.get(`/progress/${childId}`),

    // Messages (Assuming these exist or will be implemented)
    getConversations: () => api.get('/messages/chats'),
    getConversation: (userId: number) => api.get('/messages/conversation/' + userId),
    getRecipients: () => api.get('/messages/recipients'),
    sendMessage: (messageData: any) => api.post('/messages', messageData),

    // Profile (Placeholder for now)
    updateProfile: (profileData: any) => api.put('/users/profile', profileData),
};

export default parentAPI;