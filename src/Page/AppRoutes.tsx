// AppRoutes.tsx
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from './HomePage';
import AdminRouter from '../Admin/AdminRouter';
import AuthPages from './AuthPages';
import SportsDisciplines from '../LandingPage/SportsDisciplines';
import Contact from '../LandingPage/contact';
import Footer from '../Footer/Footer';
import AuthPageWrapper from './AuthPageWrapper';
import EventPage from './EventPages';
import ProtectedRoute from './ProtectedRoute';
import AboutUs from '../LandingPage/AboutUs';
import CoachRouter from '../Coach/CoachRouter';
import ParentRouter from '../Parents/ParentRouter';
import ManagerRouter from '../Manager/ManagerRouter';
import Karate from '../Program/Karate';
import Gymnastics from '../Program/Gymnastics';

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/events" element={<EventPage />} />
        <Route path="/karate" element={<Karate />} />
        <Route path="/Gymnastics" element={<Gymnastics />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/auth" element={<AuthPageWrapper />} />
        <Route path="/login" element={<AuthPageWrapper />} />
        <Route path="/register" element={<AuthPageWrapper />} />
        <Route path="/forgot-password" element={<AuthPageWrapper />} />

        <Route path="/SportDiscipline" element={<SportsDisciplines />} />
        <Route path="/Contact" element={<Contact />} />
        <Route path="/AboutUs" element={<AboutUs />} />
        <Route path="/Footer" element={<Footer />} />
        <Route
          path="/admin/*"
          element={
            <ProtectedRoute allowedRoles={['ADMIN', 'MANAGER']}>
              <AdminRouter />
            </ProtectedRoute>
          }
        />
        <Route
          path="/coach/*"
          element={
            <ProtectedRoute allowedRoles={['COACH']}>
              <CoachRouter />
            </ProtectedRoute>
          }
        />
        <Route
          path="/parent/*"
          element={
            <ProtectedRoute allowedRoles={['PARENT']}>
              <ParentRouter />
            </ProtectedRoute>
          }
        />
        <Route
          path="/manager/*"
          element={
            <ProtectedRoute allowedRoles={['MANAGER']}>
              <ManagerRouter />
            </ProtectedRoute>
          }
        />
      </Routes>

    </BrowserRouter>
  );
}

export default AppRoutes;