import { Box } from "@mui/material";
import { Routes, Route, Navigate } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Overview from "./pages/Overview";
import Budgets from "./pages/Budgets";
import Goals from "./pages/Goals";
import Transactions from "./pages/Transactions";
import Report from "./pages/Report";
import Settings from "./pages/Settings";
import Help from "./pages/Help";
import Profile from "./pages/Profile";

export default function App() {
  return (
    <Box sx={{ display: "flex", height: "100vh", overflow: "hidden" }}>
      <Sidebar />
      <Box component="main" sx={{ flex: 1, overflow: "auto", p: 3 }}>
        <Routes>
          <Route path="/" element={<Navigate to="/overview" replace />} />
          <Route path="/overview" element={<Overview />} />
          <Route path="/budgets" element={<Budgets />} />
          <Route path="/goals" element={<Goals />} />
          <Route path="/transactions" element={<Transactions />} />
          <Route path="/report" element={<Report />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/help" element={<Help />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="*" element={<Navigate to="/overview" replace />} />
        </Routes>
      </Box>
    </Box>
  );
}