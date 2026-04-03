import { lazy } from 'react';
import { Route, Routes } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import Header from '../Header/Header';

const HomePage = lazy(() => import('./HomePage'));
const EventPage = lazy(() => import('./EventPages'));
const Karate = lazy(() => import('../Program/Karate'));
const Gymnastics = lazy(() => import('../Program/Gymnastics'));
const Founder = lazy(() => import('../LandingPage/Founder'));
const Event = lazy(() => import('./Event'));
const Contact = lazy(() => import('../LandingPage/contact'));
const SportsDisciplines = lazy(() => import('../LandingPage/SportsDisciplines'));
const AuthPageWrapper = lazy(() => import('./AuthPageWrapper'));
const AboutUs = lazy(() => import('../LandingPage/AboutUs'));
const Footer = lazy(() => import('../Footer/Footer'));
const AdminRouter = lazy(() => import('../Admin/AdminRouter'));
const CoachRouter = lazy(() => import('../Coach/CoachRouter'));
const ParentRouter = lazy(() => import('../Parents/ParentRouter'));
const ManagerRouter = lazy(() => import('../Manager/ManagerRouter'));

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/events" element={<EventPage />} />
      <Route path="/karate" element={<Karate />} />
      <Route path="/Gymnastics" element={<Gymnastics />} />
      <Route path='/founder' element={<Founder />} />
      <Route path="/event" element={<Event />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/auth" element={<AuthPageWrapper />} />
      <Route path="/login" element={<AuthPageWrapper />} />
      <Route path="/register" element={<AuthPageWrapper />} />
      <Route path="/forgot-password" element={<AuthPageWrapper />} />

      <Route path="/SportDiscipline" element={<SportsDisciplines />} />
      <Route path="/Contact" element={<Contact />} />
      <Route path="/AboutUs" element={<><Header /><AboutUs /></>} />
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
  );
}

export default AppRoutes;