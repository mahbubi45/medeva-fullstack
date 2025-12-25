import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Setting from "./pages/Setting";
import DashboardLayout from "./components/layout/DashboardLayout";
import KaryawanDashboard from "./pages/KaryawanDashboard";
import EmployeeEditForm from "./forms/EmployeeEditForm";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* LOGIN DI LUAR DASHBOARDLAYOUT */}
        <Route path="/login" element={<Login />} />

        {/* DASHBOARDLAYOUT */}
        <Route element={<DashboardLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/karyawan/edit/:id" element={<EmployeeEditForm />} />
          <Route path="/settings" element={<Setting />} />
          <Route path="/karyawan" element={<KaryawanDashboard />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
