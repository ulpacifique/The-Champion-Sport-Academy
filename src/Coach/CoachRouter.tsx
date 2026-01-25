import { Routes, Route, Navigate } from 'react-router-dom';
import CoachLayout from './CoachLayout';
import CoachDashboard from './CoachDashboard';
import MyAthletes from './MyAthletes';
import CoachSchedule from './CoachSchedule';
import Messages from '../Admin/Messages'; // Re-use message component

const CoachRouter = () => {
    return (
        <Routes>
            <Route element={<CoachLayout />}>
                <Route path="dashboard" element={<CoachDashboard />} />
                <Route path="athletes" element={<MyAthletes />} />
                <Route path="schedule" element={<CoachSchedule />} />
                <Route path="messages" element={<Messages />} />
                <Route path="*" element={<Navigate to="dashboard" replace />} />
            </Route>
        </Routes>
    );
};

export default CoachRouter;
