import { createBrowserRouter } from "react-router-dom";
import Layout from "../layout/Layout";
import NotFoundPage from "../pages/NotFoundPage";
import HomePage from "../pages/HomePage";
import AboutPage from "../pages/AboutPage";
import ProjectsPage from "../pages/ProjectsPage";
import ServicesPage from "../pages/ServicesPage";
import ReferencesPage from "../pages/ReferancesPage";
import ContactPage from "../pages/ContactPage";
import ProjectDetails from "../pages/ProjectDetails";
import ServiceDetails from "../pages/ServiceDetails";
import AdminLayout from "../layout/AdminLayout";
import AdminPage from "../pages/admin/AdminPage";
import AdminProjects from "../pages/admin/AdminProjects";
import AdminAddProject from "../pages/admin/AdminAddProject";
import AdminUpdateProject from "../pages/admin/AdminUpdateProject";
import ProtectedRoute from "../components/ProtectedRoute";
import Login from "../pages/Login";
import AdminServices from "../pages/admin/AdminServices";
import AdminAddService from "../pages/admin/AdminAddService";
import AdminUpdateService from "../pages/admin/AdminUpdateService";
import AdminReferences from "../pages/admin/AdminReferences";
import AdminAddReference from "../pages/admin/AdminAddReference";
import AdminUpdateReference from "../pages/admin/AdminUpdateReference";
import AdminContact from "../pages/admin/AdminContact";
import AdminAbout from "../pages/admin/AdminAbout";



export const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        errorElement: <NotFoundPage />,
        children: [
            {
                index: true,
                element: <HomePage />
            },
            {
                path: "hakkimizda",
                element: <AboutPage />
            },
            {
                path: "projeler",
                element: <ProjectsPage />
            },
            {
                path: "projeler/:slug",
                element: <ProjectDetails />
            },
            {
                path: "faaliyet-alanlarimiz",
                element: <ServicesPage />
            },
            {
                path: "faaliyet-alanlarimiz/:slug",
                element: <ServiceDetails />
            },
            {
                path: "referanslar",
                element: <ReferencesPage />
            },
            {
                path: "iletisim",
                element: <ContactPage />
            }
        ]
    },
    {
        path: "admin",
        element: (
            <ProtectedRoute>
                <AdminLayout /> 
            </ProtectedRoute>
        ),
        children: [
            {
                index: true,
                element: <AdminPage />
            },
            {
                path: "projeler",
                element: <AdminProjects />
            },
            {
                path: "projeler/ekle",
                element: <AdminAddProject />
            },
            {
                path: "projeler/:slug",
                element: <AdminUpdateProject />
            },
            {
                path: "faaliyet-alanları",
                element: <AdminServices />
            },
            {
                path: "faaliyet-alanları/ekle",
                element: <AdminAddService />
            },
            {
                path: "faaliyet-alanları/:slug",
                element: <AdminUpdateService />
            },
            {
                path: "referanslar",
                element: <AdminReferences />
            },
            {
                path: "referanslar/ekle",
                element: <AdminAddReference />
            },
            {
                path: "referanslar/:id",
                element: <AdminUpdateReference />
            },
            {
                path: "iletişim",
                element: <AdminContact />
            },
            {
                path: "hakkımızda",
                element: <AdminAbout />
            },
        ]
    },
    {
        path: "admin/login",
        element: <Login />
    },
])

