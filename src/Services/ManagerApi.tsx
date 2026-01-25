import api from './Api';

const managerAPI = {
    // Children Management
    getChildren: () => api.get('/children'),
    getPendingRegistrations: () => api.get('/children/pending'),
    registerChild: (childData: any) => api.post('/children/register', childData),
    updateChild: (childId: number, childData: any) => api.put(`/children/${childId}`, childData),
    deleteChild: (childId: number) => api.delete(`/children/${childId}`),
    approveRegistration: (registrationId: number) => api.post(`/children/${registrationId}/approve`, {}),
    rejectRegistration: (registrationId: number) => api.post(`/children/${registrationId}/reject`, {}),

    // Coach Management
    getCoaches: () => api.get('/coaches'),
    addCoach: (coachData: any) => api.post('/coaches', coachData),
    updateCoach: (coachId: number, coachData: any) => api.put(`/coaches/${coachId}`, coachData),
    deleteCoach: (coachId: number) => api.delete(`/coaches/${coachId}`),

    // Attendance
    getAttendance: (date: string) => api.get('/attendance', { params: { date } }),
    markAttendance: (attendanceData: any) => api.post('/attendance', attendanceData),
    getAttendanceReport: (month: string) => api.get('/attendance/report', { params: { month } }),

    // Salary Management
    getSalaryData: (month: string) => api.get('/manager/salaries', { params: { month } }),
    updateSalary: (coachId: number, salaryData: any) => api.put(`/manager/salaries/${coachId}`, salaryData),
    processSalary: (coachId: number, month: string) => api.post(`/manager/salaries/${coachId}/process`, { month }),
    addBonus: (coachId: number, bonusData: any) => api.post(`/manager/salaries/${coachId}/bonus`, bonusData),
    addDeduction: (coachId: number, deductionData: any) => api.post(`/manager/salaries/${coachId}/deduction`, deductionData),

    // Messages
    getRecentChats: () => api.get('/messages/chats'),
    getConversation: (otherUserId: number) => api.get(`/messages/conversation/${otherUserId}`),
    getRecipients: () => api.get('/messages/recipients'),
    sendMessage: (messageData: any) => api.post('/messages', messageData),

    // Profile
    updateProfile: (profileData: any) => api.put('/manager/profile', profileData),
    changePassword: (passwordData: any) => api.put('/manager/change-password', passwordData),

    // Dashboard
    getDashboardStats: () => api.get('/manager/dashboard/stats'),
    getUpcomingTasks: () => api.get('/manager/tasks'),
};

export default managerAPI;
