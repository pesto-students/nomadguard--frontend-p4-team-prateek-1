import { Navigate, useRoutes } from 'react-router-dom';
import { Routes, Route } from 'react-router-dom';
import { useContext } from 'react';
// layouts
import DashboardLayout from './layouts/dashboard';
import SimpleLayout from './layouts/simple';
//
//
import BlogPage from './pages/BlogPage';
import UserPage from './pages/UserPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';

import Page404 from './pages/Page404';
import ProductsPage from './pages/ProductsPage';
import DashboardAppPage from './pages/DashboardAppPage';


import AuthContext from './_store/auth-context';
import LandingPage from './pages/LandingPage';
import NomadInsurancePage from './pages/NomadInsurancePage';
import ForgotPassword from './pages/ForgotPassword';
import Profile from './pages/Profile';
import InsuranceProfile from './pages/InsuranceProfile';




// ----------------------------------------------------------------------

export default function Router() {
  const authCtx = useContext(AuthContext);
  console.log(authCtx.isLoggedIn)
  return (
    <Routes>
      {authCtx.isLoggedIn && (
        <>
          <Route path="/dashboard" element={<DashboardLayout />}>
            <Route path="/dashboard/app" element={<DashboardAppPage />} />
            <Route path="/dashboard/user" element={<UserPage />} />
            <Route path="/dashboard/products" element={<ProductsPage />} />
            <Route path="/dashboard/blog" element={<BlogPage />} />
            <Route path="/dashboard/profile" element={<Profile />} />

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

        <Route path="*" element={<Page404 />} />
      </Route>
      <Route path="*" element={<Page404 />} />

    </Routes>
  )

  // const routes = useRoutes([
  //   {
  //     path: '/dashboard',
  //     element: <DashboardLayout />,
  //     children: [
  //       { element: <Navigate to="/dashboard/app" />, index: true },
  //       { path: 'app', element: <DashboardAppPage /> },
  //       { path: 'user', element: <UserPage /> },
  //       { path: 'products', element: <ProductsPage /> },
  //       { path: 'blog', element: <BlogPage /> },
  //     ],
  //   },
  //   {
  //     path: 'login',
  //     element: <LoginPage />,
  //   },
  //   {
  //     path: 'register',
  //     element: <RegisterPage />,
  //   },
  //   {
  //     element: <SimpleLayout />,
  //     children: [
  //       { element: <Navigate to="/dashboard/app" />, index: true },
  //       { path: '404', element: <Page404 /> },
  //       { path: '*', element: <Navigate to="/404" /> },
  //     ],
  //   },
  //   {
  //     path: '*',
  //     element: <Navigate to="/404" replace />,
  //   },
  // ]);

  // return routes;
}
