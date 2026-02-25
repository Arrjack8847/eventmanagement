import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { RoleProvider } from "@/contexts/RoleContext";
import { PublicLayout } from "@/layouts/PublicLayout";
import { DashboardLayout } from "@/layouts/DashboardLayout";
import NotFound from "./pages/NotFound";

// Public pages
import Events from "./pages/Events";
import EventDetail from "./pages/EventDetail";
import CalendarPage from "./pages/CalendarPage";
import Login from "./pages/Login";

// Student pages
import StudentDashboard from "./pages/student/Dashboard";
import MyClubs from "./pages/student/MyClubs";
import MyRegistrations from "./pages/student/MyRegistrations";
import MyTickets from "./pages/student/MyTickets";
import ActivityHistory from "./pages/student/History";

// Organizer pages
import OrganizerDashboard from "./pages/organizer/Dashboard";
import OrganizerEvents from "./pages/organizer/EventsList";
import EventForm from "./pages/organizer/EventForm";
import EventRegistrations from "./pages/organizer/EventRegistrations";
import CheckIn from "./pages/organizer/CheckIn";

// Admin pages
import AdminDashboard from "./pages/admin/Dashboard";
import AdminUsers from "./pages/admin/Users";
import AdminClubs from "./pages/admin/Clubs";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <RoleProvider>
        <BrowserRouter>
          <Routes>
            {/* Public routes */}
            <Route element={<PublicLayout />}>
              <Route path="/" element={<Navigate to="/events" replace />} />
              <Route path="/events" element={<Events />} />
              <Route path="/events/:id" element={<EventDetail />} />
              <Route path="/calendar" element={<CalendarPage />} />
              <Route path="/login" element={<Login />} />
            </Route>

            {/* Student portal */}
            <Route path="/app" element={<DashboardLayout />}>
              <Route index element={<StudentDashboard />} />
              <Route path="my-clubs" element={<MyClubs />} />
              <Route path="my-registrations" element={<MyRegistrations />} />
              <Route path="my-tickets" element={<MyTickets />} />
              <Route path="history" element={<ActivityHistory />} />
            </Route>

            {/* Organizer portal */}
            <Route path="/organizer" element={<DashboardLayout />}>
              <Route index element={<OrganizerDashboard />} />
              <Route path="events" element={<OrganizerEvents />} />
              <Route path="events/new" element={<EventForm />} />
              <Route path="events/:id/edit" element={<EventForm />} />
              <Route path="events/:id/registrations" element={<EventRegistrations />} />
              <Route path="events/:id/checkin" element={<CheckIn />} />
            </Route>

            {/* Admin portal */}
            <Route path="/admin" element={<DashboardLayout />}>
              <Route index element={<AdminDashboard />} />
              <Route path="users" element={<AdminUsers />} />
              <Route path="clubs" element={<AdminClubs />} />
            </Route>

            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </RoleProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
