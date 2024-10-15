import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./components/layout";
import CombinedKoiRequestForm from "./pages/request-form";
import Register from "./pages/register";
import Login from "./pages/login";
import PaymentPage from "./pages/booking";
import PaymentDetailsPage from "./pages/tripDetail";
import QuotaDetailsPage from "./pages/tripQuota";
import OnGoingPage from "./pages/onGoing";
import { HomepageComponent } from "./pages/home/homepage";
import KoiPage from "./pages/mykoi";
import KoiDetailPage from "./pages/detailFish";
import KoiPayPage from "./pages/paykoi";
import SaleStaff from "./pages/SaleStaff/SaleStaff";
import CustomerRequest from "./pages/SaleStaff/CustomerRequest";
import ConsultingStaff from "./pages/Consulting-Staff/ConsultingStaff";
import DeliveryStaff from "./pages/Delivery-Staff/Delivery-Staff";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import "../src/styles/App.css";

const queryClient = new QueryClient();

function App() {
    const router = createBrowserRouter([
        {
            path: "",
            element: <Layout />,
            children: [
                { path: "/", element: <HomepageComponent /> },
                { path: "/contact", element: <CombinedKoiRequestForm /> },
                { path: "/register", element: <Register /> },
                { path: "/login", element: <Login /> },
                { path: "/payment", element: <PaymentPage /> },
                { path: "/payment/:id", element: <PaymentDetailsPage /> },
                { path: "/quota/:id", element: <QuotaDetailsPage /> },
                { path: "/onGoing/:id", element: <OnGoingPage /> },
                { path: "/mykoi", element: <KoiPage /> },
                { path: "/mykoi/:id", element: <KoiDetailPage /> },
                { path: "/paykoi", element: <KoiPayPage /> },
            ],
        },
        { path: "/consulting-staff", element: <ConsultingStaff /> },
        { path: "/sale-staff", element: <SaleStaff /> },
        { path: "/delivery-staff", element: <DeliveryStaff /> },
    ]);

    return (
        <QueryClientProvider client={queryClient}>
            <RouterProvider router={router} />
        </QueryClientProvider>
    );
}

export default App;
