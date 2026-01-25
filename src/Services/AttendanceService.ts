import axios from 'axios';

const API_URL = 'http://localhost:8080/api/attendance';

export interface AttendanceDTO {
    id?: number;
    childId?: number;
    childName?: string;
    coachId?: number;
    coachName?: string;
    programId?: number;
    programName?: string;
    attendanceDate: string;
    present: boolean;
    notes?: string;
}

const getAuthHeader = () => {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    return { headers: { Authorization: `Bearer ${user.token}` } };
};

export const markAttendance = async (attendance: AttendanceDTO) => {
    const response = await axios.post<AttendanceDTO>(API_URL, attendance, getAuthHeader());
    return response.data;
};

export const markBulkAttendance = async (attendances: AttendanceDTO[]) => {
    const response = await axios.post<AttendanceDTO[]>(`${API_URL}/bulk`, attendances, getAuthHeader());
    return response.data;
};

export const getAttendanceByProgram = async (programId: number, date: string) => {
    const response = await axios.get<AttendanceDTO[]>(`${API_URL}/program/${programId}`, {
        ...getAuthHeader(),
        params: { date }
    });
    return response.data;
};

export const getAttendanceByChild = async (childId: number, fromDate?: string, toDate?: string) => {
    const response = await axios.get<AttendanceDTO[]>(`${API_URL}/child/${childId}`, {
        ...getAuthHeader(),
        params: { fromDate, toDate }
    });
    return response.data;
};

export const getAttendanceByCoach = async (coachId: number, fromDate?: string, toDate?: string) => {
    const response = await axios.get<AttendanceDTO[]>(`${API_URL}/coach/${coachId}`, {
        ...getAuthHeader(),
        params: { fromDate, toDate }
    });
    return response.data;
};
