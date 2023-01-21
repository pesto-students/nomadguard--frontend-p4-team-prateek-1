import { Navigate, useRoutes } from 'react-router-dom';
import { Routes, Route } from 'react-router-dom';
import { useContext } from 'react';
// layouts
import DashboardLayout from './layouts/dashboard';
import SimpleLayout from './layouts/simple';
// pages
import UserPage from './pages/UserPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import Page404 from './pages/Page404';
import DashboardAppPage from './pages/DashboardAppPage';
import AuthContext from './_store/auth-context';
import LandingPage from './pages/LandingPage';
import NomadInsurancePage from './pages/NomadInsurancePage';
import ForgotPassword from './pages/ForgotPassword';
import Profile from './pages/Profile';
import InsuranceProfile from './pages/InsuranceProfile';
import InsuredUsers from './pages/InsuredUsers';
import InsuranceList from './pages/InsuranceList';

// ----------------------------------------------------------------------

export default function Router() {
  const authCtx = useContext(AuthContext);
  return (
    <Routes>
      {authCtx.isLoggedIn && (
        <>
          <Route path="/dashboard" element={<DashboardLayout />}>
            <Route path="/dashboard/app" element={<DashboardAppPage />} />
            <Route path="/dashboard/user" element={<UserPage />} />
            <Route path="/dashboard/insurance-list" element={<InsuranceList />} />
            <Route path="/dashboard/users-insured" element={<InsuredUsers />} />
          </Route>
        </>
      )}

      <Route path="/" element={<SimpleLayout />}>
        <Route path="/" element={<LandingPage />} />
        <Route path="/nomad-insurance" element={<NomadInsurancePage />} />
        <Route path="/nomad-insurance/profile" element={<InsuranceProfile />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/dashboard/profile" element={<Profile />} />
        <Route path="*" element={<Page404 />} />
      </Route>
      <Route path="*" element={<Page404 />} />

    </Routes>
  )
}
